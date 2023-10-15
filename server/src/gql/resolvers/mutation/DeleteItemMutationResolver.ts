import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

type DeleteItemMutationResolverArgs = {
    itemId: string;
};

export class DeleteItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: DeleteItemMutationResolverArgs): Promise<any> {
        try {
            const deletedItem = await this.deleteItem(args.itemId);
            this.validateItem(deletedItem);

            const itemsToUpdate = await this.fetchItemsByColumnId(deletedItem.columnId);
            this.validateItems(itemsToUpdate);

            await this.updateItemPositions(itemsToUpdate);

            return this.fetchColumnWithItemsByIdAsc(deletedItem.columnId);
        } catch (e) {
            console.log(e);
            throw new Error('An error occurred while deleting the item');
        }
    }

    protected async deleteItem(itemId: string) {
        return this.client.item.delete({
            where: {id: parseInt(itemId)}
        });
    }

    protected validateItem(item: any) {
        if (!item) {
            throw new Error('Item not found');
        }
    }

    protected validateItems(items: any[]) {
        if (!items || items.length === 0) {
            throw new Error('Items not found');
        }
    }

    protected async updateItemPositions(items: any[]) {
        const updatePromises = items.map((item, index) => {
            return this.client.item.update({
                where: {id: item.id},
                data: {position: index}
            });
        });

        await Promise.all(updatePromises);
    }
}
