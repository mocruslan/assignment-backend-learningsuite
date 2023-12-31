import {useMutation, useQueryClient} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";
import {graphql} from "../gql";
import {QUERY_KANBAN_BOARD_KEY} from "./useKanbanData";
import {MoveColumnMutation} from "../gql/graphql";

const MUTATE_MOVE_COLUMN = graphql(/* GraphQL */`
    mutation MoveColumn($columnId: ID!, $toIndex: Int!) {
        moveColumn(columnId: $columnId, toIndex: $toIndex) {
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

export function useMoveKanbanColumn() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (variables: { columnId: string, toIndex: number }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_MOVE_COLUMN,
                variables,
            ),
        onSuccess: (data: MoveColumnMutation) => {
            client.setQueryData([QUERY_KANBAN_BOARD_KEY], {kanbanBoard: data.moveColumn})
        }
    });
}