import {QueryResolverAbstract} from "../abstracts/QueryResolverAbstract";

export class KanbanBoardQueryResolver extends QueryResolverAbstract {
    async getResolver(args: {}): Promise<any> {
        console.log(args);

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
            console.log(e)
        });
    }
}