import {graphql} from "../gql";
import {useQuery} from "@tanstack/react-query";
import request from "graphql-request";
import {GRAPHQL_SERVER} from "../config";

const QUERY_KANBAN_BOARD = graphql(/* GraphQL */`
    query KanbanBoard {
        kanbanBoard {
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
`);

export const QUERY_KANBAN_BOARD_KEY = 'kanbanBoard';

export function useKanbanData() {
    return useQuery({
        queryKey: [QUERY_KANBAN_BOARD_KEY],
        queryFn: async () =>
            request(
                GRAPHQL_SERVER,
                QUERY_KANBAN_BOARD,
            ),
    });
}