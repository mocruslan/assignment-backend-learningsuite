import {useMutation, useQueryClient} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";
import {graphql} from "../gql";
import {QUERY_KANBAN_BOARD_KEY} from "./useKanbanData";
import {Column, CreateItemMutation} from "../gql/graphql";


type CreateItemMutationVariables = {
    columnId: string,
    name: string
}

const MUTATE_CREATE_ITEM = graphql(/* GraphQL */`
    mutation CreateItem($columnId: ID!, $name: String!) {
        createItem(columnId: $columnId, name: $name){
            column {
                id
                name
                items {
                    id
                    name
                    done
                }
            }
        }
    }
`);

export function useCreateKanbanItem() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (variables: CreateItemMutationVariables) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_CREATE_ITEM,
                variables,
            ),
        onSuccess: async (data: CreateItemMutation, variables: CreateItemMutationVariables) => {
            const existingData = client.getQueryData<{ kanbanBoard: Column[] }>([QUERY_KANBAN_BOARD_KEY]);

            if (existingData) {
                const updatedKanbanBoard = existingData.kanbanBoard.map(column => {
                    if (column.id === variables.columnId) {
                        return data.createItem.column;
                    }
                    return column;
                });

                client.setQueryData([QUERY_KANBAN_BOARD_KEY], {kanbanBoard: updatedKanbanBoard});
            }
        }
    });
}