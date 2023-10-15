import React, {useState} from "react";
import {Button, Dialog, DialogActions, Stack, TextField} from "@mui/material";

type CustomDialogProps = {
    textFieldHint?: string;
    initialValue?: string;
    actionButtonText: string;
    open: boolean;
    onClose: () => void;
    onSave: (newName: string) => void;
};

export const CustomDialog = ({
                                 textFieldHint,
                                 initialValue,
                                 actionButtonText,
                                 open,
                                 onClose,
                                 onSave
                             }: CustomDialogProps) => {
    const [newItemValue, setNewItemValue] = useState(initialValue ? initialValue : '');

    const handleSubmit = () => {
        onSave(newItemValue.trim());
        onClose();
        setNewItemValue(newItemValue.trim());
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Stack p={2}>
                <TextField label={textFieldHint} value={newItemValue}
                           onChange={(e) => setNewItemValue(e.target.value)}/>
            </Stack>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>{actionButtonText}</Button>
            </DialogActions>
        </Dialog>
    );
};
