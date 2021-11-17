import React, {FC, ReactElement, useState} from "react";
import {Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled} from "@mui/material";

type Props = {
    open: boolean;
    handleClose: ()=>void;
    title?: string | ReactElement;
    contentText?: string | ReactElement;
    actions?: ReactElement;
};
export const Dialog: FC<Props> = (
    {
        open,
        handleClose,
        title,
        contentText,
        actions,
        children
    }
) => {
    return (
        <MuiDialog
            open={open}
            onClose={handleClose}
            fullWidth
        >
            {
                title && <StyledDialogTitle color="primary">{title}</StyledDialogTitle>
            }
            <DialogContent>
                {
                    contentText && <DialogContentText>{contentText}</DialogContentText>
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

const StyledDialogTitle = styled(DialogTitle)(({theme}) => ({
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    display: "flex",
    alignItems: "center"
}));