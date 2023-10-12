import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: '../server/schemas/schema.graphql',
    documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/gql/**/*'],
    generates: {
        './src/gql/': {
            preset: 'client',
            plugins: [],
        }
    },
};

export default config;