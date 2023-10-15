import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

type CreateItemMutationResolverArgs = {
    name: string;
    columnId: string;
    done: boolean;
}

export class CreateItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: CreateItemMutationResolverArgs): Promise<any> {
        const {name, columnId} = args;

        try {
            const maxPositionItem = await this.getIncrementedPosition(parseInt(columnId));

            const createdItem = await this.createItem(name, columnId, maxPositionItem);
            const updatedColumn = await this.fetchColumnWithItemsByIdAsc(parseInt(columnId));
            if (!createdItem || !updatedColumn) {
                throw new Error('item or column not found');
            }

            return {
                item: createdItem,
                column: updatedColumn,
            }
        } catch (e) {
            console.error(e);
            return new Promise((_, reject) => reject('An error occurred while creating the item'));
        }
    }

    protected async createItem(name: string, columnId: string, maxPositionItem: number): Promise<any> {
        return this.client.item.create({
            data: {
                name: name.trim(),
                index: maxPositionItem,
                column: {
                    connect: {
                        id: parseInt(columnId),
                    },
                },
            },
        });
    }

    protected async getIncrementedPosition(columnId: number): Promise<number> {
        const item = await this.client.item.findFirst({
            select: {index: true},
            where: {columnId: columnId},
            orderBy: {index: 'desc'},
        });

        return item ? item.index + 1 : 0;
    }
}
