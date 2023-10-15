import {graphql} from "../gql";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";
import {QUERY_KANBAN_BOARD_KEY} from "./useKanbanData";


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
        mutationFn: async (variables: { columnId: string, name?: string }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_UPDATE_COLUMN,
                variables,
            ),
        // onSuccess: (data, variables) => {
        //     client.setQueryData([QUERY_KANBAN_BOARD_KEY], {kanbanBoard: data.updateColumn})
        // },
        onSettled: async () => {
            await client.invalidateQueries([QUERY_KANBAN_BOARD_KEY])
        }
    });
}
