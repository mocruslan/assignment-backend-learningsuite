import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export class MoveItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: any): Promise<any> {
        const {itemId, toColumnId, position} = args;

        try {
            const targetItem = await this.client.item.findUnique({
                where: {id: parseInt(itemId)},
            });
            if (!targetItem) return null;

            const hasColumnChanged = targetItem.columnId !== parseInt(toColumnId);

            if (hasColumnChanged) {
                await this.reorderItemsAcrossColumns(targetItem, itemId, toColumnId, position);
            } else {
                await this.reorderItemsWithinColumn(targetItem, itemId, position);
            }

            return await this.fetchUpdatedColumns();
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    protected async reorderItemsWithinColumn(targetItem: any, itemId: string, newPosition: number) {
        const currentColumnItems = await this.fetchItemsByColumn(targetItem.columnId);
        const itemIndex = currentColumnItems.findIndex(item => item.id === parseInt(itemId));

        const [movedItem] = currentColumnItems.splice(itemIndex, 1);
        currentColumnItems.splice(newPosition, 0, movedItem);

        await this.updateItemPositions(currentColumnItems);
    }

    protected async reorderItemsAcrossColumns(targetItem: any, itemId: string, newColumnId: string, newPosition: number) {
        const currentColumnItems = await this.fetchItemsByColumn(targetItem.columnId);
        const newColumnItems = await this.fetchItemsByColumn(parseInt(newColumnId));

        const itemIndex = currentColumnItems.findIndex(item => item.id === parseInt(itemId));
        currentColumnItems.splice(itemIndex, 1);

        newColumnItems.splice(newPosition, 0, targetItem);

        await Promise.all([
            this.updateItemPositions(currentColumnItems),
            this.updateItemPositions(newColumnItems, parseInt(newColumnId))
        ]);
    }

    protected async fetchItemsByColumn(columnId: number) {
        return this.client.item.findMany({
            where: {columnId},
            orderBy: {position: 'asc'},
        });
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

    protected async fetchUpdatedColumns() {
        return this.client.column.findMany({
            include: {
                items: {
                    orderBy: {
                        position: 'asc',
                    },
                },
            },
            orderBy: {
                position: 'asc',
            },
        }).catch(e => {
            console.log(e);
        });
    }
}
