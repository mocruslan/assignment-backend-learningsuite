import {GQLResolverFactory} from "../gql/GQLResolverFactory";
import {allMutationResolverTypes, allQueryResolverTypes} from "../gql/types/GQLResolverTypes";

export class RootGenerator {
    constructor(protected resolverFactory: GQLResolverFactory) {
    }

    generateRoot(): Record<string, Function> {
        const root: Record<string, Function> = {};

        // Populate Queries
        for (const type of allQueryResolverTypes) {
            const resolverFunctionName = this.convertTypeToCamelCase(type);
            root[resolverFunctionName] = async (args: any) => {
                return await this.resolverFactory.getQueryResolverByType(type).getResolver(args);
            };
        }

        // Populate Mutations
        for (const type of allMutationResolverTypes) {
            const resolverFunctionName = this.convertTypeToCamelCase(type);
            root[resolverFunctionName] = async (args: any) => {
                return await this.resolverFactory.getMutationResolverByType(type).getResolver(args);
            };
        }

        return root;
    }

    protected convertTypeToCamelCase(type: string): string {
        return type.charAt(0).toLowerCase() + type.slice(1);
    }
}
