import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

type UpdateColumnMutationResolverArgs = {
    columnId: string;
    name: string;
}

export class UpdateColumnMutationResolver extends MutationResolverAbstract {
    async getResolver(args: UpdateColumnMutationResolverArgs): Promise<any> {
        const {columnId, name} = args;

        try {
            const updatedColumn = await this.updateColumn(parseInt(columnId), name);
            if (!updatedColumn) {
                throw new Error('column not found');
            }

            return updatedColumn;
        } catch (e) {
            console.error(e);
            return new Promise((_, reject) => reject('An error occurred while updating the column'));
        }
    }

    protected async updateColumn(columnId: number, name: string) {
        return this.client.column.update({
            where: {id: columnId},
            data: {
                name: name.trim()
            },
            include: {
                items: {
                    orderBy: {
                        index: 'asc',
                    }
                },
            },
        });
    }
}