import {graphql} from "../gql";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";
import {QUERY_KANBAN_BOARD_KEY} from "./useKanbanData";

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
        mutationFn: async (variables: { itemId: string }) =>
            request(
                GRAPHQL_SERVER,
                MUTATION_DELETE_KANBAN_ITEM,
                variables,
            ),
        onSuccess: async (data) => {
            client.setQueryData([QUERY_KANBAN_BOARD_KEY], {kanbanBoard: data.deleteItem});
        }
    });
}