import {useMutation, useQueryClient} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";
import {graphql} from "../gql";
import {QUERY_KANBAN_BOARD_KEY} from "./useKanbanData";
import {Column, MoveItemMutation} from "../gql/graphql";


type MoveItemMutationVariables = {
    itemId: string
    toColumnId: string
    toIndex: number
}

const MUTATE_MOVE_ITEM = graphql(/* GraphQL */`
    mutation MoveItem($itemId: ID!, $toColumnId: ID!, $toIndex: Int!) {
        moveItem(itemId: $itemId, toColumnId: $toColumnId, toIndex: $toIndex) {
            id
            name
            items {
                id
                name
                done
            }
        }
    }
`);

export function useMoveKanbanItem() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (variables: MoveItemMutationVariables) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_MOVE_ITEM,
                variables,
            ),
        onSuccess: (data: MoveItemMutation, variables: MoveItemMutationVariables) => {
            const existingData = client.getQueryData<{ kanbanBoard: Column[] }>([QUERY_KANBAN_BOARD_KEY]);

            if (existingData) {
                const updatedKanbanBoard = existingData.kanbanBoard.map(existingColumn => {
                    const updatedColumn = data.moveItem.find(
                        column => column.id === existingColumn.id
                    );
                    return updatedColumn ? updatedColumn : existingColumn;
                });

                client.setQueryData([QUERY_KANBAN_BOARD_KEY], {kanbanBoard: updatedKanbanBoard});
            }
        }
    });
}