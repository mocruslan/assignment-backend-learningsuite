import {expect} from '@jest/globals';
import {GQLResolverFactory} from "./GQLResolverFactory";
import {PrismaClient} from "@prisma/client";
import {GQLMutationResolverTypes, GQLQueryResolverTypes} from "./types/GQLResolverTypes";
import {MoveColumnMutationResolver} from "./resolvers/mutation/MoveColumnMutationResolver";
import {CreateItemMutationResolver} from "./resolvers/mutation/CreateItemMutationResolver";
import {KanbanBoardQueryResolver} from "./resolvers/query/KanbanBoardQueryResolver";
import {ItemQueryResolver} from "./resolvers/query/ItemQueryResolver";

describe('GQLResolverFactory', () => {
    it('should create a mutation resolver by type', () => {
        const factory = new GQLResolverFactory(new PrismaClient());
        const resolverMoveColumn = factory.getMutationResolverByType(
            GQLMutationResolverTypes.MoveColumn
        );
        const resolverCreateItem = factory.getMutationResolverByType(
            GQLMutationResolverTypes.CreateItem
        );

        expect(resolverMoveColumn).toBeInstanceOf(MoveColumnMutationResolver)
        expect(resolverCreateItem).toBeInstanceOf(CreateItemMutationResolver)
    });

    it('should create a query resolver by type', () => {
        const factory = new GQLResolverFactory(new PrismaClient());
        const resolverKanbanBoard = factory.getQueryResolverByType(
            GQLQueryResolverTypes.KanbanBoard
        );
        const resolverItem = factory.getQueryResolverByType(
            GQLQueryResolverTypes.Item
        );

        expect(resolverKanbanBoard).toBeInstanceOf(KanbanBoardQueryResolver)
        expect(resolverItem).toBeInstanceOf(ItemQueryResolver)
    });

    it('should create multiple mutation resolvers from type array', () => {
        const factory = new GQLResolverFactory(new PrismaClient());
        const resolvers = factory.getMutationResolversByTypes([
            GQLMutationResolverTypes.MoveColumn,
            GQLMutationResolverTypes.CreateItem,
        ]);

        expect(resolvers.length).toBe(2);
        expect(resolvers[0]).toBeInstanceOf(MoveColumnMutationResolver);
        expect(resolvers[1]).toBeInstanceOf(CreateItemMutationResolver);
    });

    it('should create multiple query resolvers from type array', () => {
        const factory = new GQLResolverFactory(new PrismaClient());
        const resolvers = factory.getQueryResolversByTypes([
            GQLQueryResolverTypes.KanbanBoard,
            GQLQueryResolverTypes.Item,
        ]);

        expect(resolvers.length).toBe(2);
        expect(resolvers[0]).toBeInstanceOf(KanbanBoardQueryResolver);
        expect(resolvers[1]).toBeInstanceOf(ItemQueryResolver);
    });
});