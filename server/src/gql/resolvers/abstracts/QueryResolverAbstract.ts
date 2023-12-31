import {PrismaClient} from ".prisma/client";
import {IResolver} from "../interfaces/iResolver";

export abstract class QueryResolverAbstract implements IResolver {
    constructor(protected client: PrismaClient) {
    }

    abstract getResolver(args: any): Promise<any>;

    protected async fetchAllColumnsWithItemsAsc() {
        return this.client.column.findMany({
            include: {
                items: {
                    orderBy: {
                        index: 'asc',
                    },
                },
            },
            orderBy: {
                index: 'asc',
            },
        });
    }
}