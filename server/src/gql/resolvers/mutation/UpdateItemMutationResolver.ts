import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

type UpdateItemMutationResolverArgs = {
    itemId: string;
    name?: string;
    done?: boolean;
}

export class UpdateItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: UpdateItemMutationResolverArgs): Promise<any> {
        const {itemId, name, done} = args;

        try {
            const updatedItem = await this.updateItem(parseInt(itemId), name, done);
            const updatedColumn = await this.fetchColumnWithItemsByIdAsc(updatedItem.columnId);
            if (!updatedItem || !updatedColumn) {
                throw new Error('item or column not found');
            }

            return {
                item: updatedItem,
                column: updatedColumn,
            }
        } catch (e) {
            console.error(e);
            throw new Error('An error occurred while updating the item');
        }
    }

    protected async updateItem(itemId: number, name?: string, done?: boolean) {
        return this.client.item.update({
            where: {id: itemId},
            data: {
                name: name,
                done: done
            }
        });
    }
}