import React, {FC, ReactElement, useState} from "react";
import {Color, Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled} from "@mui/material";

type Props = {
    open: boolean;
    handleClose: ()=>void;
    title?: string | ReactElement;
    contentText?: string | ReactElement;
    actions?: ReactElement;
    color?: "primary" | "error";
};
export const Dialog: FC<Props> = (
    {
        open,
        handleClose,
        title,
        contentText,
        actions,
        children,
        color
    }
) => {

    return (
        <MuiDialog
            open={open}
            onClose={handleClose}
            scroll="body"
            fullWidth
        >
            {
                title && <StyledDialogTitle color={color ?? "primary"}>{title}</StyledDialogTitle>
            }
            <DialogContent>
                {
                    contentText && <StyledDialogContentText>{contentText}</StyledDialogContentText>
                }
                {children}
            </DialogContent>
            {
                actions && <DialogActions>{actions}</DialogActions>
            }
        </MuiDialog>
    );
};

export interface DialogBasicProps {
    handleOpen: ()=>void;
    handleClose: ()=>void;
    open: boolean;
}

export function useDialog(): DialogBasicProps {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    return {
        handleOpen,
        handleClose,
        open
    };
}

const StyledDialogTitle = styled(DialogTitle)(({theme, color}) => ({
    borderBottom: `2px solid ${color==="error" ? theme.palette.error.main : theme.palette.primary.main}`,
    display: "flex",
    alignItems: "center"
}));

const StyledDialogContentText = styled(DialogContentText)(({theme}) => ({
    marginTop: theme.spacing(1)
}));