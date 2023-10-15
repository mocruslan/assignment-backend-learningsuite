import {useMutation, useQueryClient} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";
import {graphql} from "../gql";
import {QUERY_KANBAN_BOARD_KEY} from "./useKanbanData";

const MUTATE_CREATE_ITEM = graphql(/* GraphQL */`
    mutation CreateItem($columnId: ID!, $name: String!) {
        createItem(columnId: $columnId, name: $name){
            id
            name
            done
            columnId
            position
        }
    }
`);

export function useCreateKanbanItem() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async (variables: { columnId: string, name: string }) =>
            request(
                GRAPHQL_SERVER,
                MUTATE_CREATE_ITEM,
                variables,
            ),
        onSettled: async () => {
            await client.invalidateQueries([QUERY_KANBAN_BOARD_KEY])
        }
    });
}