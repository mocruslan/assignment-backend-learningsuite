import {IResolver} from "./resolvers/interfaces/iResolver";
import {ResolverFactoryAbstract} from "./resolvers/abstracts/ResolverFactoryAbstract";
import {MoveColumnMutationResolver} from "./resolvers/mutation/MoveColumnMutationResolver";
import {GQLMutationResolverTypes, GQLQueryResolverTypes} from "./types/GQLResolverTypes";
import {CreateItemMutationResolver} from "./resolvers/mutation/CreateItemMutationResolver";
import {UpdateItemMutationResolver} from "./resolvers/mutation/UpdateItemMutationResolver";
import {MoveItemMutationResolver} from "./resolvers/mutation/MoveItemMutationResolver";
import {UpdateColumnMutationResolver} from "./resolvers/mutation/UpdateColumnMutationResolver";
import {KanbanBoardQueryResolver} from "./resolvers/query/KanbanBoardQueryResolver";
import {ItemQueryResolver} from "./resolvers/query/ItemQueryResolver";

export class GQLResolverFactory extends ResolverFactoryAbstract {
    getMutationResolverByType(type: GQLMutationResolverTypes): IResolver {
        switch (type) {
            case GQLMutationResolverTypes.CreateItem:
                return new CreateItemMutationResolver(this.client);
            case GQLMutationResolverTypes.UpdateItem:
                return new UpdateItemMutationResolver(this.client);
            case GQLMutationResolverTypes.MoveItem:
                return new MoveItemMutationResolver(this.client);
            case GQLMutationResolverTypes.UpdateColumn:
                return new UpdateColumnMutationResolver(this.client);
            case GQLMutationResolverTypes.MoveColumn:
                return new MoveColumnMutationResolver(this.client);
        }
    }

    getMutationResolversByTypes(types: GQLMutationResolverTypes[]): IResolver[] {
        let resolvers: IResolver[] = [];

        for (const type of types) {
            const resolver = this.getMutationResolverByType(type);
            if (resolver !== null) {
                resolvers.push(resolver);
            }
        }
        return resolvers;
    }

    getQueryResolverByType(type: GQLQueryResolverTypes): IResolver {
        switch (type) {
            case GQLQueryResolverTypes.KanbanBoard:
                return new KanbanBoardQueryResolver(this.client);
            case GQLQueryResolverTypes.Item:
                return new ItemQueryResolver(this.client);
        }
    }

    getQueryResolversByTypes(types: GQLQueryResolverTypes[]): IResolver[] {
        let resolvers: IResolver[] = [];

        for (const type of types) {
            const resolver = this.getQueryResolverByType(type);
            if (resolver !== null) {
                resolvers.push(resolver);
            }
        }
        return resolvers;
    }
}