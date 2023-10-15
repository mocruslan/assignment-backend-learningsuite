import {graphql} from "../gql";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";
import {QUERY_KANBAN_BOARD_KEY} from "./useKanbanData";


const MUTATE_UPDATE_ITEM = graphql(/* GraphQL */`
    mutation UpdateItem($itemId: ID!, $name: String, $done: Boolean) {
        updateItem(itemId: $itemId, name: $name, done: $done) {
            id
            name
            done
        }
    }
`);

export function useUpdateKanbanItem() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (variables: { itemId: string, name?: string, done?: boolean }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_UPDATE_ITEM,
                variables,
            ),
        onSettled: async () => {
            await client.invalidateQueries([QUERY_KANBAN_BOARD_KEY])
        }
    });
}
