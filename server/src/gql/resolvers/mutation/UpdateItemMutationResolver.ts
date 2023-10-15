import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export type UpdateItemMutationResolverArgs = {
    itemId: string;
    name?: string;
    done?: boolean;
}

export class UpdateItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: UpdateItemMutationResolverArgs): Promise<any> {
        const {itemId, name, done} = args;
        console.log(args); // TODO: Add as debug

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
            console.log(e);
            throw new Error('An error occurred while updating the item');
        }
    }

    protected async updateItem(itemId: number, name?: string, done?: boolean): Promise<any> {
        return this.client.item.update({
            where: {id: itemId},
            data: {
                name: name,
                done: done
            }
        });
    }
}