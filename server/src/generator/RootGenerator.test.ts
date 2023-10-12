import {GQLResolverFactory} from "../gql/GQLResolverFactory";
import {RootGenerator} from "./RootGenerator";
import {PrismaClient} from "@prisma/client";
import {allMutationResolverTypes, allQueryResolverTypes} from "../gql/types/GQLResolverTypes";

describe('RootGenerator', () => {
    let mockGetQueryResolverByType: jest.Mock;
    let mockGetMutationResolverByType: jest.Mock;
    let rootGenerator: RootGenerator;

    beforeEach(() => {
        // Mock the factory methods
        mockGetQueryResolverByType = jest.fn();
        mockGetMutationResolverByType = jest.fn();

        (GQLResolverFactory.prototype.getQueryResolverByType as jest.Mock) = mockGetQueryResolverByType;
        (GQLResolverFactory.prototype.getMutationResolverByType as jest.Mock) = mockGetMutationResolverByType;

        const resolverFactory = new GQLResolverFactory(new PrismaClient());
        rootGenerator = new RootGenerator(resolverFactory);
    });

    it('should dynamically map all query resolver types', () => {
        const root = rootGenerator.generateRoot();

        for (const type of allQueryResolverTypes) {
            const functionName = type.charAt(0).toLowerCase() + type.slice(1);
            expect(root[functionName]).toBeDefined();
        }
    });

    it('should dynamically map all mutation resolver types', () => {
        const root = rootGenerator.generateRoot();

        allMutationResolverTypes.forEach(type => {
            const functionName = type.charAt(0).toLowerCase() + type.slice(1);
            expect(root[functionName]).toBeDefined();
        });
    });
});
