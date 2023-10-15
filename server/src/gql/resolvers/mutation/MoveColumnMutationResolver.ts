import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export type MoveColumnMutationResolverArgs = {
    columnId: string;
    position: number;
}

export class MoveColumnMutationResolver extends MutationResolverAbstract {
    async getResolver(args: MoveColumnMutationResolverArgs): Promise<any> {
        const {columnId, position} = args;

        try {
            const currentColumn = await this.client.column.findUnique({
                where: {id: parseInt(columnId)},
            });
            if (!currentColumn) return null;

            const columnsToUpdate = await this.client.column.findMany({
                orderBy: {position: 'asc'},
            });

            if (columnsToUpdate) {
                const indexToRemove = columnsToUpdate.findIndex(column => column.id === parseInt(columnId));
                const [removed] = columnsToUpdate.splice(indexToRemove, 1);
                columnsToUpdate.splice(position, 0, removed);

                for (let i = 0; i < columnsToUpdate.length; i++) {
                    columnsToUpdate[i].position = i;
                }

                const updatePromises = columnsToUpdate.map((item) => {
                    return this.client.column.update({
                        where: {id: item.id},
                        data: {position: item.position}
                    });
                });

                await Promise.all(updatePromises);
            } else {
                await this.client.column.update({
                    where: {id: parseInt(columnId)},
                    data: {
                        position: position,
                    },
                });
            }

            return this.client.column.findMany({
                include: {
                    items: {
                        orderBy: {
                            position: 'asc',
                        }
                    },
                },
                orderBy: {
                    position: 'asc',
                }
            }).catch(e => {
                console.log(e);
            });
        } catch (e) {
            console.log(e);
        }

        return null;
    }
}