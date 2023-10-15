import {graphql} from "../gql";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";
import {QUERY_KANBAN_BOARD_KEY} from "./useKanbanData";
import {Column, DeleteItemMutation} from "../gql/graphql";


type DeleteItemMutationVariables = {
    itemId: string
}

const MUTATION_DELETE_KANBAN_ITEM = graphql(/* GraphQL */`
    mutation DeleteItem($itemId: ID!) {
        deleteItem(itemId: $itemId) {
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

export function useDeleteKanbanItem() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (variables: DeleteItemMutationVariables) =>
            request(
                GRAPHQL_SERVER,
                MUTATION_DELETE_KANBAN_ITEM,
                variables,
            ),
        onSuccess: async (data: DeleteItemMutation) => {
            const existingData = client.getQueryData<{ kanbanBoard: Column[] }>([QUERY_KANBAN_BOARD_KEY]);

            if (existingData) {
                const updatedKanbanBoard = existingData.kanbanBoard.map(
                    existingColumn => {
                        return existingColumn.id === data.deleteItem.id ? data.deleteItem : existingColumn;
                });

                client.setQueryData([QUERY_KANBAN_BOARD_KEY], {kanbanBoard: updatedKanbanBoard});
            }
        }
    });
}