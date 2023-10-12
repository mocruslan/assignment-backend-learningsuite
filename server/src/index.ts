import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import {buildSchema, GraphQLSchema} from 'graphql'
import {readFileSync} from 'fs'
import cors from 'cors'

import {PrismaClient} from '@prisma/client'
import {GQLResolverFactory} from "./gql/GQLResolverFactory";
import {RootGenerator} from "./generator/RootGenerator";


class App {
    protected readonly prisma: PrismaClient;
    protected readonly resolverFactory: GQLResolverFactory;
    protected rootGenerator: RootGenerator;

    constructor() {
        this.prisma = new PrismaClient();
        this.resolverFactory = new GQLResolverFactory(this.prisma);
        this.rootGenerator = new RootGenerator(this.resolverFactory);
    }

    // TODO: Add default columns

    protected getGraphQLSchema(): GraphQLSchema {
        return buildSchema(readFileSync('./schemas/schema.graphql', 'utf-8'));
    }

    protected getRoot() {
        return this.rootGenerator.generateRoot();
    }

    start() {
        const app = express();
        app.use(cors());
        app.use(
            "/graphql",
            graphqlHTTP({
                schema: this.getGraphQLSchema(),
                rootValue: this.getRoot(),
                graphiql: true,
            })
        );

        app.listen(4000, () => console.log('Server Started 🔥\nBrowse http://localhost:4000/graphql'));
    }
}

const server = new App();
server.start()
