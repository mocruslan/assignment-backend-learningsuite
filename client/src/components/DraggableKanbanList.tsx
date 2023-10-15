import {Draggable, DraggableProvided, Droppable} from "react-beautiful-dnd";
import {KanbanList} from "./KanbanList";
import {Button, Stack} from "@mui/material";
import {DraggableKanbanItem} from "./DraggableKanbanItem";
import {useState} from "react";
import {useCreateKanbanItem} from "../model/useCreateKanbanItem";
import {CustomDialog} from "./CustomDialog";

export function DraggableKanbanList({
                                        index,
                                        title, items, id
                                    }: {
    title: string,
    id: string,
    items: { id: string, name: string, done: boolean }[],
    index: any
}) {

    const createItemMutation = useCreateKanbanItem();

    const [open, setOpen] = useState(false);

    const handleAdd = async (newName: string) => {
        await createItemMutation.mutateAsync({
            columnId: id,
            name: newName
        });
    };

    return (
        <Draggable draggableId={id} index={index}>
            {(provided: DraggableProvided) => (
                <KanbanList
                    title={title}
                    {...provided.draggableProps} {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Droppable droppableId={id}
                               direction={'vertical'} type={'item'}>
                        {(provided) => (
                            <Stack spacing={2} ref={provided.innerRef}
                                   {...provided.droppableProps}
                            >
                                {
                                    items.map((item, index) => (
                                        <DraggableKanbanItem
                                            key={item.id}
                                            item={item}
                                            index={index}
                                        />
                                    ))
                                }
                                {provided.placeholder}
                            </Stack>
                        )}
                    </Droppable>

                    <Button onClick={() => setOpen(true)}>Add item</Button>

                    <CustomDialog
                        textFieldHint={'Item name'}
                        actionButtonText="Add"
                        open={open}
                        onClose={() => setOpen(false)}
                        onSave={handleAdd}
                    />
                </KanbanList>
            )}
        </Draggable>
    );
}