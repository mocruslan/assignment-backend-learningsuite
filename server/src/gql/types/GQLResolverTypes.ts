export enum GQLMutationResolverTypes {
    CreateItem = 'CreateItem',
    UpdateItem = 'UpdateItem',
    MoveItem = 'MoveItem',

    UpdateColumn = 'UpdateColumn',
    MoveColumn = 'MoveColumn',
}

export enum GQLQueryResolverTypes {
    KanbanBoard = 'KanbanBoard',
    Item = 'Item',
}

export const allMutationResolverTypes = [
    GQLMutationResolverTypes.CreateItem,
    GQLMutationResolverTypes.UpdateItem,
    GQLMutationResolverTypes.MoveItem,
    GQLMutationResolverTypes.UpdateColumn,
    GQLMutationResolverTypes.MoveColumn,
] as const;

export const allQueryResolverTypes = [
    GQLQueryResolverTypes.KanbanBoard,
    GQLQueryResolverTypes.Item,
] as const;