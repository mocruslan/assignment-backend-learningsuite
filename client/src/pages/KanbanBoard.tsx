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
        if ((!result.destination) ||
            (result.reason === 'CANCEL') ||
            (result.destination.index === result.source.index && result.source.droppableId === result.destination.droppableId)
        ) return;

        switch (result.type.toLowerCase()) {
            case 'item':
                await moveKanbanItem.mutateAsync({
                    itemId: result.draggableId,
                    toColumnId: result.destination.droppableId,
                    toIndex: result.destination.index,
                });
                break;
            case 'column':
                if (result.destination.droppableId === 'kanbanBoard') {
                    await moveKanbanColumn.mutateAsync({
                        columnId: result.draggableId,
                        toIndex: result.destination.index,
                    });
                }
                break;
        }
    }, []);

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