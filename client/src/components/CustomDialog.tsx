import React, {useState} from "react";
import {Button, Dialog, DialogActions, Stack, TextField} from "@mui/material";

type CustomDialogProps = {
    textFieldHint?: string;
    initialName?: string;
    actionButtonText: string;
    open: boolean;
    onClose: () => void;
    onSave: (newName: string) => void;
};

export const CustomDialog = ({
                                 textFieldHint,
                                 initialName,
                                 actionButtonText,
                                 open,
                                 onClose,
                                 onSave
                             }: CustomDialogProps) => {
    const [newItemName, setNewItemName] = useState(initialName ? initialName : '');

    const handleSave = () => {
        onSave(newItemName);
        onClose();
        setNewItemName('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Stack p={2}>
                <TextField label={textFieldHint} value={newItemName} onChange={(e) => setNewItemName(e.target.value)}/>
            </Stack>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>{actionButtonText}</Button>
            </DialogActions>
        </Dialog>
    );
};
