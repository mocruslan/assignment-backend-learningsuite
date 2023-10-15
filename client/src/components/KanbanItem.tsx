import {forwardRef} from "react";
import {Card, CardContent, CardProps, Checkbox, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export const KanbanItem = forwardRef(
    function ({
                  title,
                  done,
                  onCheckboxChange,
                  onEditClick,
                  ...cardProps
              }: {
        title: string,
        done: boolean,
        onCheckboxChange: () => void
        onEditClick?: () => void
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

                        <Tooltip title="Edit">
                            <IconButton onClick={onEditClick}>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </CardContent>
            </Card>
        );
    }
)