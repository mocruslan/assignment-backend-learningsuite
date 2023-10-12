import {IResolver} from "../interfaces/iResolver";
import {PrismaClient} from ".prisma/client";

export abstract class MutationResolverAbstract implements IResolver {
    constructor(protected client: PrismaClient) {
    }

    abstract getResolver(args: any): Promise<any>;
}