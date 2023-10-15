import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export class MoveItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: any): Promise<any> {
        const {itemId, toColumnId, position} = args;
        console.log(args); // TODO: Add as debug

        try {
            const targetItem = await this.client.item.findUnique({
                where: {id: parseInt(itemId)},
            });
            if (!targetItem) {
                throw new Error('item not found');
            }

            const hasColumnChanged = targetItem.columnId !== parseInt(toColumnId);
            if (hasColumnChanged) {
                await this.reorderItemsAcrossColumns(targetItem, itemId, toColumnId, position);

                const result = await this.fetchColumnsByIdsWithItemsAsc([targetItem.columnId, parseInt(toColumnId)])
                console.log(result);
                return result;
            } else {
                await this.reorderItemsWithinColumn(targetItem, itemId, position);
                return await this.fetchColumnWithItemsByIdAsc(targetItem.columnId);
            }
        } catch (e) {
            console.log(e);
            throw new Error('An error occurred while moving the item');
        }
    }

    protected async reorderItemsWithinColumn(targetItem: any, itemId: string, newPosition: number) {
        const currentColumnItems = await this.fetchItemsByColumnId(targetItem.columnId);
        const itemIndex = currentColumnItems.findIndex(item => item.id === parseInt(itemId));

        const [movedItem] = currentColumnItems.splice(itemIndex, 1);
        currentColumnItems.splice(newPosition, 0, movedItem);

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
            const data: any = {position: index};
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
