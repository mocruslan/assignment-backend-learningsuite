import {QueryResolverAbstract} from "../abstracts/QueryResolverAbstract";

export class KanbanBoardQueryResolver extends QueryResolverAbstract {
    async getResolver(args: {}): Promise<any> {
        return this.client.column.findMany({
            include: {
                items: true,
            },
        });
    }
}