import {IGQLResolverFactory} from "../interfaces/iGQLResolverFactory";
import {IResolver} from "../interfaces/iResolver";
import {PrismaClient} from "@prisma/client";
import {GQLMutationResolverTypes, GQLQueryResolverTypes} from "../../types/GQLResolverTypes";

export abstract class ResolverFactoryAbstract implements IGQLResolverFactory {
    constructor(protected client: PrismaClient) {
    }

    abstract getMutationResolverByType(type: GQLMutationResolverTypes): IResolver;

    abstract getMutationResolversByTypes(types: GQLMutationResolverTypes[]): IResolver[];

    abstract getQueryResolverByType(type: GQLQueryResolverTypes): IResolver;

    abstract getQueryResolversByTypes(types: GQLQueryResolverTypes[]): IResolver[];

}