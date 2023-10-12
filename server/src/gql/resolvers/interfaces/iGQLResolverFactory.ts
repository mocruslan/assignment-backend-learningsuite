import {IResolver} from "./iResolver";

export interface IGQLResolverFactory {
    getQueryResolversByTypes(types: string[]): IResolver[];

    getMutationResolversByTypes(types: string[]): IResolver[];

    getQueryResolverByType(type: string): IResolver;

    getMutationResolverByType(type: string): IResolver;
}