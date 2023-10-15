import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export type UpdateColumnMutationResolverArgs = {
    columnId: string;
    name: string;
}

export class UpdateColumnMutationResolver extends MutationResolverAbstract {
    async getResolver(args: UpdateColumnMutationResolverArgs): Promise<any> {
        const {columnId, name} = args;
        console.log(args);

        try {
            const updatedColumn = await this.updateColumn(parseInt(columnId), name);
            if (!updatedColumn) {
                throw new Error('column not found');
            }

            return updatedColumn;
        } catch (e) {
            console.log(e);
            throw new Error('An error occurred while updating the column');
        }
    }

    protected async updateColumn(columnId: number, name: string) {
        return this.client.column.update({
            where: {id: columnId},
            data: {
                name: name
            },
            include: {
                items: {
                    orderBy: {
                        position: 'asc',
                    }
                },
            },
        });
    }
}