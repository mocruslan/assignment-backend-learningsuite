import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

type MoveItemMutationResolverArgs = {
    itemId: string;
    toColumnId: string;
    toIndex: number;
}

export class MoveItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: MoveItemMutationResolverArgs): Promise<any> {
        const {itemId, toColumnId, toIndex} = args;

        try {
            const targetItem = await this.client.item.findUnique({
                where: {id: parseInt(itemId)},
            });
            if (!targetItem) {
                throw new Error('Item not found');
            }

            const hasColumnChanged = targetItem.columnId !== parseInt(toColumnId);
            if (hasColumnChanged) {
                await this.reorderItemsAcrossColumns(targetItem, itemId, toColumnId, toIndex);
            } else {
                await this.reorderItemsWithinColumn(targetItem, itemId, toIndex);
            }

            return await this.fetchAllColumnsWithItemsAsc();
        } catch (e) {
            console.error(e);
            throw new Error('An error occurred while moving item');
        }
    }

    protected async reorderItemsWithinColumn(targetItem: any, itemId: string, newIndex: number) {
        const currentColumnItems = await this.fetchItemsByColumnId(targetItem.columnId);
        const itemIndex = currentColumnItems.findIndex(item => item.id === parseInt(itemId));

        const [movedItem] = currentColumnItems.splice(itemIndex, 1);
        currentColumnItems.splice(newIndex, 0, movedItem);

        await this.updateItemPositions(currentColumnItems);
    }

    protected async reorderItemsAcrossColumns(targetItem: any, itemId: string, newColumnId: string, newPosition: number) {
        const currentColumnItems = await this.fetchItemsByColumnId(targetItem.columnId);
        const newColumnItems = await this.fetchItemsByColumnId(parseInt(newColumnId));

        const itemIndex = currentColumnItems.findIndex(item => item.id === parseInt(itemId));
        currentColumnItems.splice(itemIndex, 1);

        newColumnItems.splice(newPosition, 0, targetItem);

        await Promise.all([
            this.updateItemPositions(currentColumnItems),
            this.updateItemPositions(newColumnItems, parseInt(newColumnId))
        ]);
    }

    protected async updateItemPositions(items: any[], newColumnId?: number) {
        const updatePromises = items.map((item, index) => {
            const data: any = {index: index};
            if (newColumnId !== undefined) {
                data.columnId = newColumnId;
            }
            return this.client.item.update({
                where: {id: item.id},
                data
            });
        });

        await Promise.all(updatePromises);
    }
}
