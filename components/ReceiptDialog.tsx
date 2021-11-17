import React, {FC} from "react";
import {Dialog, DialogBasicProps, useDialog} from "./Dialog";
import {AddCircle} from "@mui/icons-material";
import {styled} from "@mui/material";
import ReceiptForm from "./forms/ReceiptForm";

type Props = {
    dialogBasicProps: DialogBasicProps
};

const ReceiptDialog: FC<Props> = (
    {
        dialogBasicProps
    }
) => {

    return (
        <Dialog
            open={dialogBasicProps.open}
            handleClose={dialogBasicProps.handleClose}
            title={<><StyledAddCircle /> Přidání účtenky</>}
        >
            <ReceiptForm />
        </Dialog>
    );
};
export default ReceiptDialog;

const StyledAddCircle = styled(AddCircle)(({theme})=>({
    marginRight: theme.spacing(1)
}));