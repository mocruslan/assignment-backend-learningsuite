import React, {forwardRef} from "react";
import {Card, CardContent, CardHeader, CardProps, IconButton, Stack, Tooltip} from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';


export const KanbanList = forwardRef(
    function ({
                  children,
                  title,
                  onRenameClick,
                  ...cardProps
              }: { children: React.ReactNode, title: string, onRenameClick?: () => void } & CardProps, ref: any
    ) {
        return (
            <Card variant="outlined" sx={{bgcolor: 'grey.200', width: 400}} ref={ref} {...cardProps}>
                <Stack direction="row" alignItems="center" justifyContent={"flex-start"}>
                <CardHeader title={title}/>

                    <Tooltip title="Rename">
                        <IconButton onClick={onRenameClick}>
                            <DriveFileRenameOutlineIcon fontSize={"small"}/>
                        </IconButton>
                    </Tooltip>
                </Stack>

                <CardContent>
                    <Stack spacing={2}>{children}</Stack>
                </CardContent>
            </Card>
        );
    })