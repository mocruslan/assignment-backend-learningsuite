import {forwardRef} from "react";
import {Card, CardContent, CardProps, Checkbox, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const KanbanItem = forwardRef(
    function ({
                  title,
                  done,
                  onCheckboxChange,
                  onEditClick,
                  onDeleteClick,
                  ...cardProps
              }: {
        title: string,
        done: boolean,
        onCheckboxChange: () => void
        onEditClick?: () => void
        onDeleteClick?: () => void
    } & CardProps, ref: any) {


        return (
            <Card ref={ref} {...cardProps}>
                <CardContent>
                    <Stack spacing={2} direction="row" alignItems="center" justifyContent={"space-between"}>
                        <Stack spacing={2} direction="row" alignItems="center" justifyContent={"flex-start"}>
                            <Checkbox checked={done} onChange={onCheckboxChange}/>
                            <Typography variant="h6">
                                {title}
                            </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"}>
                            <Tooltip title="Edit">
                                <IconButton onClick={onEditClick}>
                                    <EditIcon fontSize={"small"}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton onClick={onDeleteClick}>
                                    <DeleteForeverIcon color={"error"} fontSize={"small"}/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        );
    }
)