import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

type DeleteItemMutationResolverArgs = {
    itemId: string
}

export class DeleteItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: DeleteItemMutationResolverArgs): Promise<any> {
        const {itemId} = args;
        console.log('DeleteItemMutationResolver')
        console.log(args)

        try {
            const deletedItem = await this.client.item.delete({
                where: {id: parseInt(itemId)}
            });
            if (deletedItem == null) return null;

            let itemsToUpdate = await this.client.item.findMany({
                where: {columnId: deletedItem.columnId},
                orderBy: {position: 'asc'},
            });
            if (itemsToUpdate == null) return null;

            await this.updateItemPositions(itemsToUpdate);

            return this.fetchUpdatedColumns();
        } catch (e) {
            console.log(e);
            return null;
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