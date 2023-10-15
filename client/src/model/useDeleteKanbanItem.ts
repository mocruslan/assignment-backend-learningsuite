import {graphql} from "../gql";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";
import {QUERY_KANBAN_BOARD_KEY} from "./useKanbanData";
import {DeleteItemMutation} from "../gql/graphql";


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
            const existingData = client.getQueryData<{ kanbanBoard: any[] }>([QUERY_KANBAN_BOARD_KEY]);

            if (existingData) {
                const updatedKanbanBoard = existingData.kanbanBoard.map(column => {
                    if (column.id === data.deleteItem.id) {
                        return data.deleteItem;
                    }
                    return column;
                });

                client.setQueryData([QUERY_KANBAN_BOARD_KEY], {kanbanBoard: updatedKanbanBoard});
            }
        }
    });
}