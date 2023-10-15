import {Draggable, DraggableProvided, Droppable} from "react-beautiful-dnd";
import {KanbanList} from "./KanbanList";
import {Button, Stack} from "@mui/material";
import {DraggableKanbanItem} from "./DraggableKanbanItem";
import {useState} from "react";
import {useCreateKanbanItem} from "../model/useCreateKanbanItem";
import {CustomDialog} from "./CustomDialog";
import {useUpdateKanbanColumn} from "../model/useUpdateKanbanColumn";

type DraggableKanbanListProps = {
    title: string,
    id: string,
    items: { id: string, name: string, done: boolean }[],
    index: any
}

export function DraggableKanbanList(
    {
        title,
        id,
        index,
        items
    }: DraggableKanbanListProps) {
    const createItemMutation = useCreateKanbanItem();
    const updateColumnMutation = useUpdateKanbanColumn();

    const [openItemAdd, setOpenItemAdd] = useState(false);
    const [openRename, setOpenRename] = useState(false);

    async function handleRenameColumn(newColumnName: string) {
        await updateColumnMutation.mutateAsync({
            columnId: id,
            name: newColumnName
        });
    }

    async function handleAddItem(newItemName: string) {
        await createItemMutation.mutateAsync({
            columnId: id,
            name: newItemName
        });
    }

    return (
        <Draggable draggableId={id} index={index}>
            {(provided: DraggableProvided) => (
                <>
                    <KanbanList
                        title={title}
                        {...provided.draggableProps} {...provided.dragHandleProps}
                        onRenameClick={() => setOpenRename(true)}
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

                        <Button onClick={() => setOpenRename(true)}>Add item</Button>

                        <CustomDialog
                            textFieldHint={'Item name'}
                            actionButtonText="Add"
                            open={openItemAdd}
                            onClose={() => setOpenItemAdd(false)}
                            onSave={handleAddItem}
                        />
                    </KanbanList>

                    <CustomDialog
                        textFieldHint={'New name'}
                        initialValue={title}
                        actionButtonText="Rename"
                        open={openRename}
                        onClose={() => setOpenRename(false)}
                        onSave={handleRenameColumn}
                    />
                </>
            )}
        </Draggable>
    );
}