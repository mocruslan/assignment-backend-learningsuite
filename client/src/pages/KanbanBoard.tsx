import {Box, Stack} from "@mui/material";
import {DragDropContext, Droppable, DropResult, ResponderProvided} from 'react-beautiful-dnd'
import {useCallback} from "react";
import {DraggableKanbanList} from "../components/DraggableKanbanList";
import {useMoveKanbanItem} from "../model/useMoveKanbanItem";
import {useKanbanData} from "../model/useKanbanData";
import {useMoveKanbanColumn} from "../model/useMoveKanbanColumn";

export function KanbanBoard() {
    const {data} = useKanbanData();
    const moveKanbanItem = useMoveKanbanItem();
    const moveKanbanColumn = useMoveKanbanColumn()

    const handleOnDragEnd = useCallback(async (result: DropResult, provided: ResponderProvided) => {
        // TODO: Might be useful: https://tanstack.com/query/v4/docs/react/guides/queries

        if ((!result.destination) ||
            (result.reason === 'CANCEL') ||
            (result.destination.index === result.source.index && result.source.droppableId === result.destination.droppableId)
        ) return;

        console.log("Result")
        console.log(result)
        console.log(provided)

        switch (result.type.toLowerCase()) {
            case 'item':
                await moveKanbanItem.mutateAsync({
                    itemId: result.draggableId,
                    toColumnId: result.destination.droppableId,
                    position: result.destination.index,
                });
                break;
            case 'column':
                if (result.destination.droppableId === 'kanbanBoard') {
                    await moveKanbanColumn.mutateAsync({
                        columnId: result.draggableId,
                        position: result.destination.index,
                    });
                }
                break;
        }
    }, []);

    console.log("Data kanbanBoard")
    console.log(data?.kanbanBoard)

    return (
        <Box sx={{paddingBottom: 4}}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId={'kanbanBoard'} direction={'horizontal'} type={'column'}>
                    {(provided) => (
                        <Stack spacing={2} margin={5} direction="row"
                               ref={provided.innerRef}
                               {...provided.droppableProps}
                        >
                            {
                                data?.kanbanBoard.map((column, index) => (
                                    <DraggableKanbanList key={column.id} id={column.id} title={column.name}
                                                         items={column.items}
                                                         index={index}/>
                                ))
                            }
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
}

export default KanbanBoard;