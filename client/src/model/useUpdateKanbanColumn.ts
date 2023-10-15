import {graphql} from "../gql";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";
import {QUERY_KANBAN_BOARD_KEY} from "./useKanbanData";
import {UpdateColumnMutation} from "../gql/graphql";


type DeleteItemMutationVariables = {
    columnId: string
    name?: string
}

const MUTATE_UPDATE_COLUMN = graphql(/* GraphQL */`
    mutation UpdateColumn($columnId: ID!, $name: String) {
        updateColumn(columnId: $columnId, name: $name) {
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

export function useUpdateKanbanColumn() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (variables: DeleteItemMutationVariables) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_UPDATE_COLUMN,
                variables,
            ),
        onSuccess: async (data: UpdateColumnMutation, variables: DeleteItemMutationVariables) => {
            const existingData = client.getQueryData<{ kanbanBoard: any[] }>([QUERY_KANBAN_BOARD_KEY]);

            if (existingData) {
                const updatedKanbanBoard = existingData.kanbanBoard.map(column => {
                    if (column.id === variables.columnId) {
                        return data.updateColumn;
                    }
                    return column;
                });

                client.setQueryData([QUERY_KANBAN_BOARD_KEY], {kanbanBoard: updatedKanbanBoard});
            }
        }
    });
}
