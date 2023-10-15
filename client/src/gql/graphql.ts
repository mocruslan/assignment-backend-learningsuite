/* eslint-disable */
import {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Column = {
  __typename?: 'Column';
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  items: Array<Item>;
  name: Scalars['String']['output'];
};

export type CreateItemMutationPayload = {
  __typename?: 'CreateItemMutationPayload';
  column: Column;
  item: Item;
};

export type Item = {
  __typename?: 'Item';
  columnId: Scalars['ID']['output'];
  done: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: CreateItemMutationPayload;
  deleteItem: Column;
  moveColumn: Array<Column>;
  moveItem: Array<Column>;
  updateColumn: Column;
  updateItem: UpdateItemMutationPayload;
};


export type MutationCreateItemArgs = {
  columnId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationDeleteItemArgs = {
  itemId: Scalars['ID']['input'];
};


export type MutationMoveColumnArgs = {
  columnId: Scalars['ID']['input'];
  toIndex: Scalars['Int']['input'];
};


export type MutationMoveItemArgs = {
  itemId: Scalars['ID']['input'];
  toColumnId: Scalars['ID']['input'];
  toIndex: Scalars['Int']['input'];
};


export type MutationUpdateColumnArgs = {
  columnId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateItemArgs = {
  done?: InputMaybe<Scalars['Boolean']['input']>;
  itemId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  item?: Maybe<Item>;
  kanbanBoard: Array<Column>;
};


export type QueryItemArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateItemMutationPayload = {
  __typename?: 'UpdateItemMutationPayload';
  column: Column;
  item: Item;
};

export type CreateItemMutationVariables = Exact<{
  columnId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'CreateItemMutationPayload', column: { __typename?: 'Column', id: string, name: string, items: Array<{ __typename?: 'Item', id: string, name: string, done: boolean }> } } };

export type DeleteItemMutationVariables = Exact<{
  itemId: Scalars['ID']['input'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: { __typename?: 'Column', id: string, name: string, items: Array<{ __typename?: 'Item', id: string, name: string, done: boolean }> } };

export type KanbanBoardQueryVariables = Exact<{ [key: string]: never; }>;


export type KanbanBoardQuery = { __typename?: 'Query', kanbanBoard: Array<{ __typename?: 'Column', id: string, name: string, items: Array<{ __typename?: 'Item', id: string, name: string, done: boolean }> }> };

export type MoveColumnMutationVariables = Exact<{
  columnId: Scalars['ID']['input'];
  toIndex: Scalars['Int']['input'];
}>;


export type MoveColumnMutation = { __typename?: 'Mutation', moveColumn: Array<{ __typename?: 'Column', id: string, name: string, items: Array<{ __typename?: 'Item', id: string, name: string, done: boolean }> }> };

export type MoveItemMutationVariables = Exact<{
  itemId: Scalars['ID']['input'];
  toColumnId: Scalars['ID']['input'];
  toIndex: Scalars['Int']['input'];
}>;


export type MoveItemMutation = { __typename?: 'Mutation', moveItem: Array<{ __typename?: 'Column', id: string, name: string, items: Array<{ __typename?: 'Item', id: string, name: string, done: boolean }> }> };

export type UpdateColumnMutationVariables = Exact<{
  columnId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateColumnMutation = { __typename?: 'Mutation', updateColumn: { __typename?: 'Column', id: string, name: string, items: Array<{ __typename?: 'Item', id: string, name: string, done: boolean }> } };

export type UpdateItemMutationVariables = Exact<{
  itemId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  done?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'UpdateItemMutationPayload', column: { __typename?: 'Column', id: string, name: string, items: Array<{ __typename?: 'Item', id: string, name: string, done: boolean }> } } };


export const CreateItemDocument = {
  "kind": "Document", "definitions": [{
    "kind": "OperationDefinition", "operation": "mutation", "name": {"kind": "Name", "value": "CreateItem"}, "variableDefinitions": [{"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "columnId"}}, "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "ID"}}}}, {"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "name"}}, "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "String"}}}}], "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "createItem"}, "arguments": [{"kind": "Argument", "name": {"kind": "Name", "value": "columnId"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "columnId"}}}, {"kind": "Argument", "name": {"kind": "Name", "value": "name"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "name"}}}], "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "column"}, "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "items"}, "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "done"}}]}}]}}]}}]}
  }]
} as unknown as DocumentNode<CreateItemMutation, CreateItemMutationVariables>;
export const DeleteItemDocument = {
  "kind": "Document", "definitions": [{
    "kind": "OperationDefinition", "operation": "mutation", "name": {"kind": "Name", "value": "DeleteItem"}, "variableDefinitions": [{"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "itemId"}}, "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "ID"}}}}], "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "deleteItem"}, "arguments": [{"kind": "Argument", "name": {"kind": "Name", "value": "itemId"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "itemId"}}}], "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "items"}, "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "done"}}]}}]}}]}
  }]
} as unknown as DocumentNode<DeleteItemMutation, DeleteItemMutationVariables>;
export const KanbanBoardDocument = {"kind": "Document", "definitions": [{"kind": "OperationDefinition", "operation": "query", "name": {"kind": "Name", "value": "KanbanBoard"}, "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "kanbanBoard"}, "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "items"}, "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "done"}}]}}]}}]}}]} as unknown as DocumentNode<KanbanBoardQuery, KanbanBoardQueryVariables>;
export const MoveColumnDocument = {
  "kind": "Document", "definitions": [{
    "kind": "OperationDefinition", "operation": "mutation", "name": {"kind": "Name", "value": "MoveColumn"}, "variableDefinitions": [{"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "columnId"}}, "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "ID"}}}}, {"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "toIndex"}}, "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "Int"}}}}], "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "moveColumn"}, "arguments": [{"kind": "Argument", "name": {"kind": "Name", "value": "columnId"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "columnId"}}}, {"kind": "Argument", "name": {"kind": "Name", "value": "toIndex"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "toIndex"}}}], "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "items"}, "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "done"}}]}}]}}]}
  }]
} as unknown as DocumentNode<MoveColumnMutation, MoveColumnMutationVariables>;
export const MoveItemDocument = {
  "kind": "Document", "definitions": [{
    "kind": "OperationDefinition", "operation": "mutation", "name": {"kind": "Name", "value": "MoveItem"}, "variableDefinitions": [{"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "itemId"}}, "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "ID"}}}}, {"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "toColumnId"}}, "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "ID"}}}}, {"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "toIndex"}}, "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "Int"}}}}], "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "moveItem"}, "arguments": [{"kind": "Argument", "name": {"kind": "Name", "value": "itemId"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "itemId"}}}, {"kind": "Argument", "name": {"kind": "Name", "value": "toColumnId"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "toColumnId"}}}, {"kind": "Argument", "name": {"kind": "Name", "value": "toIndex"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "toIndex"}}}], "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "items"}, "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "done"}}]}}]}}]}
  }]
} as unknown as DocumentNode<MoveItemMutation, MoveItemMutationVariables>;
export const UpdateColumnDocument = {
  "kind": "Document", "definitions": [{
    "kind": "OperationDefinition", "operation": "mutation", "name": {"kind": "Name", "value": "UpdateColumn"}, "variableDefinitions": [{"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "columnId"}}, "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "ID"}}}}, {"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "name"}}, "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "String"}}}], "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "updateColumn"}, "arguments": [{"kind": "Argument", "name": {"kind": "Name", "value": "columnId"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "columnId"}}}, {"kind": "Argument", "name": {"kind": "Name", "value": "name"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "name"}}}], "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "items"}, "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "done"}}]}}]}}]}
  }]
} as unknown as DocumentNode<UpdateColumnMutation, UpdateColumnMutationVariables>;
export const UpdateItemDocument = {
  "kind": "Document", "definitions": [{
    "kind": "OperationDefinition", "operation": "mutation", "name": {"kind": "Name", "value": "UpdateItem"}, "variableDefinitions": [{"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "itemId"}}, "type": {"kind": "NonNullType", "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "ID"}}}}, {"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "name"}}, "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "String"}}}, {"kind": "VariableDefinition", "variable": {"kind": "Variable", "name": {"kind": "Name", "value": "done"}}, "type": {"kind": "NamedType", "name": {"kind": "Name", "value": "Boolean"}}}], "selectionSet": {
      "kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "updateItem"}, "arguments": [{"kind": "Argument", "name": {"kind": "Name", "value": "itemId"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "itemId"}}}, {"kind": "Argument", "name": {"kind": "Name", "value": "name"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "name"}}}, {"kind": "Argument", "name": {"kind": "Name", "value": "done"}, "value": {"kind": "Variable", "name": {"kind": "Name", "value": "done"}}}], "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "column"}, "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "items"}, "selectionSet": {"kind": "SelectionSet", "selections": [{"kind": "Field", "name": {"kind": "Name", "value": "id"}}, {"kind": "Field", "name": {"kind": "Name", "value": "name"}}, {"kind": "Field", "name": {"kind": "Name", "value": "done"}}]}}]}}]}}]
    }
  }]
} as unknown as DocumentNode<UpdateItemMutation, UpdateItemMutationVariables>;