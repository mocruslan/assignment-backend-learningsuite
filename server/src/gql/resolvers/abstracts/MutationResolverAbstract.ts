import {IResolver} from "../interfaces/iResolver";
import {PrismaClient} from ".prisma/client";

export abstract class MutationResolverAbstract implements IResolver {
    constructor(protected client: PrismaClient) {
    }

    abstract getResolver(args: any): Promise<any>;

    protected async fetchColumnWithItemsByIdAsc(columnId: number): Promise<any> {
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
}