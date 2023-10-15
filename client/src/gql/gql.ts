/* eslint-disable */
import * as types from './graphql';
import {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation CreateItem($columnId: ID!, $name: String!) {\n        createItem(columnId: $columnId, name: $name){\n            column {\n                id\n                name\n                position\n                items {\n                    id\n                    name\n                    done\n                    position\n                }\n            }\n        }\n    }\n": types.CreateItemDocument,
    "\n    mutation DeleteItem($itemId: ID!) {\n        deleteItem(itemId: $itemId) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n": types.DeleteItemDocument,
    "\n    query KanbanBoard {\n        kanbanBoard {\n            id\n            name\n\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n": types.KanbanBoardDocument,
    "\n    mutation MoveColumn($columnId: ID!, $position: Int!) {\n        moveColumn(columnId: $columnId, position: $position) {\n            id\n            name\n            position\n            items {\n                id\n                name\n                done\n                position\n            }\n        }\n    }\n": types.MoveColumnDocument,
    "\n    mutation MoveItem($itemId: ID!, $toColumnId: ID!, $position: Int!) {\n        moveItem(itemId: $itemId, toColumnId: $toColumnId, position: $position) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n": types.MoveItemDocument,
    "\n    mutation UpdateColumn($columnId: ID!, $name: String) {\n        updateColumn(columnId: $columnId, name: $name) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n": types.UpdateColumnDocument,
    "\n    mutation UpdateItem($itemId: ID!, $name: String, $done: Boolean) {\n        updateItem(itemId: $itemId, name: $name, done: $done) {\n            column {\n                id\n                name\n                position\n                items {\n                    id\n                    name\n                    done\n                    position\n                }\n            }\n        }\n    }\n": types.UpdateItemDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateItem($columnId: ID!, $name: String!) {\n        createItem(columnId: $columnId, name: $name){\n            column {\n                id\n                name\n                position\n                items {\n                    id\n                    name\n                    done\n                    position\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation CreateItem($columnId: ID!, $name: String!) {\n        createItem(columnId: $columnId, name: $name){\n            column {\n                id\n                name\n                position\n                items {\n                    id\n                    name\n                    done\n                    position\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteItem($itemId: ID!) {\n        deleteItem(itemId: $itemId) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteItem($itemId: ID!) {\n        deleteItem(itemId: $itemId) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query KanbanBoard {\n        kanbanBoard {\n            id\n            name\n\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"): (typeof documents)["\n    query KanbanBoard {\n        kanbanBoard {\n            id\n            name\n\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation MoveColumn($columnId: ID!, $position: Int!) {\n        moveColumn(columnId: $columnId, position: $position) {\n            id\n            name\n            position\n            items {\n                id\n                name\n                done\n                position\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation MoveColumn($columnId: ID!, $position: Int!) {\n        moveColumn(columnId: $columnId, position: $position) {\n            id\n            name\n            position\n            items {\n                id\n                name\n                done\n                position\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation MoveItem($itemId: ID!, $toColumnId: ID!, $position: Int!) {\n        moveItem(itemId: $itemId, toColumnId: $toColumnId, position: $position) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation MoveItem($itemId: ID!, $toColumnId: ID!, $position: Int!) {\n        moveItem(itemId: $itemId, toColumnId: $toColumnId, position: $position) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateColumn($columnId: ID!, $name: String) {\n        updateColumn(columnId: $columnId, name: $name) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateColumn($columnId: ID!, $name: String) {\n        updateColumn(columnId: $columnId, name: $name) {\n            id\n            name\n            items {\n                id\n                name\n                done\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateItem($itemId: ID!, $name: String, $done: Boolean) {\n        updateItem(itemId: $itemId, name: $name, done: $done) {\n            column {\n                id\n                name\n                position\n                items {\n                    id\n                    name\n                    done\n                    position\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateItem($itemId: ID!, $name: String, $done: Boolean) {\n        updateItem(itemId: $itemId, name: $name, done: $done) {\n            column {\n                id\n                name\n                position\n                items {\n                    id\n                    name\n                    done\n                    position\n                }\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;