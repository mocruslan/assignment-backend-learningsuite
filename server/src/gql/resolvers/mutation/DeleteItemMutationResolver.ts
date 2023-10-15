import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

type DeleteItemMutationResolverArgs = {
    itemId: string
}

export class DeleteItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: DeleteItemMutationResolverArgs): Promise<any> {
        const {itemId} = args;

        try {
            const deletedItem = await this.deleteItem(itemId);
            if (deletedItem == null) {
                throw new Error('item not found');
            }

            let itemsToUpdate = await this.fetchItemsByColumnId(deletedItem.columnId);
            if (itemsToUpdate == null) return null;

            await this.updateItemPositions(itemsToUpdate);

            return await this.fetchColumnWithItemsByIdAsc(deletedItem.columnId);
        } catch (e) {
            console.error(e);
            throw new Error('An error occurred while deleting the item');
        }
    }

    protected async deleteItem(itemId: string) {
        return this.client.item.delete({
            where: {id: parseInt(itemId)}
        });
    }

    protected async updateItemPositions(items: any[]) {
        const updatePromises = items.map((item, index) => {
            return this.client.item.update({
                where: {id: item.id},
                data: {index: index}
            });
        });

        await Promise.all(updatePromises);
    }
}