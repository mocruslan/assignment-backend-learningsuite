import {useMutation, useQueryClient} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";
import {graphql} from "../gql";
import {QUERY_KANBAN_BOARD_KEY} from "./useKanbanData";

const MUTATE_MOVE_ITEM = graphql(/* GraphQL */`
    mutation MoveItem($itemId: ID!, $toColumnId: ID!, $position: Int!) {
        moveItem(itemId: $itemId, toColumnId: $toColumnId, position: $position) {
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
        mutationFn: async (variables: { itemId: string, toColumnId: string, position: number }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_MOVE_ITEM,
                variables,
            ),
        onSuccess: async (data) => {
            client.setQueryData([QUERY_KANBAN_BOARD_KEY], {kanbanBoard: data.moveItem});
        }
    });
}