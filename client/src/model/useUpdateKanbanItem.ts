import {graphql} from "../gql";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";
import {QUERY_KANBAN_BOARD_KEY} from "./useKanbanData";
import {Column, UpdateItemMutation} from "../gql/graphql";


type UpdateItemMutationVariables = {
    itemId: string,
    name?: string,
    done?: boolean
}

const MUTATE_UPDATE_ITEM = graphql(/* GraphQL */`
    mutation UpdateItem($itemId: ID!, $name: String, $done: Boolean) {
        updateItem(itemId: $itemId, name: $name, done: $done) {
            column {
                id
                name
                position
                items {
                    id
                    name
                    done
                    position
                }
            }
        }
    }
`);

export function useUpdateKanbanItem() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (variables: UpdateItemMutationVariables) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_UPDATE_ITEM,
                variables,
            ),
        onSuccess: async (data: UpdateItemMutation) => {
            const existingData = client.getQueryData<{ kanbanBoard: Column[] }>([QUERY_KANBAN_BOARD_KEY]);

            if (existingData) {
                const updatedKanbanBoard = existingData.kanbanBoard.map(
                    existingColumn => {
                        return existingColumn.id === data.updateItem.column.id ? data.updateItem.column : existingColumn;
                    });

                client.setQueryData([QUERY_KANBAN_BOARD_KEY], {kanbanBoard: updatedKanbanBoard});
            }
        }
    });
}
