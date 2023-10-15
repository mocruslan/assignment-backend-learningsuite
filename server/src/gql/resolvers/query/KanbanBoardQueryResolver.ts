import {QueryResolverAbstract} from "../abstracts/QueryResolverAbstract";

export class KanbanBoardQueryResolver extends QueryResolverAbstract {
    async getResolver(args: {}): Promise<any> {
        try {
            return await this.fetchAllColumnsWithItemsAsc();
        } catch (e) {
            console.error(e);
            throw new Error('An error occurred while fetching the kanban board');
        }

    }
}