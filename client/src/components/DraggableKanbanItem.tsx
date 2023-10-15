import {Draggable} from "react-beautiful-dnd";
import {KanbanItem} from "./KanbanItem";
import {useUpdateKanbanItem} from "../model/useUpdateKanbanItem";
import {useState} from "react";
import {CustomDialog} from "./CustomDialog";
import {useDeleteKanbanItem} from "../model/useDeleteKanbanItem";

export function DraggableKanbanItem({index, item: {id, name, done}}: {
    item: { id: string; name: string; done: boolean },
    index: number
}) {
    const updateItemMutation = useUpdateKanbanItem();
    const deleteItemMutation = useDeleteKanbanItem();

    const [open, setOpen] = useState(false);

    async function handleCheckboxChange() {
        await updateItemMutation.mutateAsync({
            itemId: id,
            name: name,
            done: !done,
        });
    }

    async function handleEdit(newName: string) {
        await updateItemMutation.mutateAsync({
            itemId: id,
            name: newName
        });
    }

    async function handleDelete() {
        await deleteItemMutation.mutateAsync({
            itemId: id
        })
    }

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <>
                    <KanbanItem {...provided.draggableProps} {...provided.dragHandleProps}
                                title={name}
                                done={done}
                                onCheckboxChange={handleCheckboxChange}
                                onEditClick={() => setOpen(true)}
                                onDeleteClick={handleDelete}
                                ref={provided.innerRef}
                    />

                    <CustomDialog
                        textFieldHint={'New name'}
                        initialValue={name}
                        actionButtonText="Save"
                        open={open}
                        onClose={() => setOpen(false)}
                        onSave={handleEdit}
                    />
                </>
            )}
        </Draggable>
    );
}