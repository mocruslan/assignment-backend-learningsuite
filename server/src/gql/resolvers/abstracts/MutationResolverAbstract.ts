import {IResolver} from "../interfaces/iResolver";
import {PrismaClient} from ".prisma/client";

export abstract class MutationResolverAbstract implements IResolver {
    constructor(protected client: PrismaClient) {
    }

    abstract getResolver(args: any): Promise<any>;

    protected async fetchItemsByColumnId(columnId: number) {
        return this.client.item.findMany({
            where: {columnId},
            orderBy: {position: 'asc'},
        });
    }

    protected async fetchColumnWithItemsByIdAsc(columnId: number) {
        return this.client.column.findUnique({
            where: {id: columnId},
            include: {
                items: {
                    orderBy: {
                        position: 'asc',
                    },
                },
            }
        });
    }

    protected async fetchColumnsByIdsWithItemsAsc(columnIds: number[]) {
        return this.client.column.findMany({
            where: {id: {in: columnIds}},
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

    protected async fetchAllColumnsAsc() {
        return this.client.column.findMany({
            orderBy: {
                position: 'asc',
            },
        });
    }

    protected async fetchAllColumnsWithItemsAsc() {
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
        });
    }
}