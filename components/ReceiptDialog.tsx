import React, {FC} from "react";
import {Dialog, DialogBasicProps, useDialog} from "./Dialog";
import {AddCircle, Edit} from "@mui/icons-material";
import {Icon, styled, SvgIcon, SvgIconProps} from "@mui/material";
import ReceiptForm from "./forms/ReceiptForm";
import {ReceiptResponse} from "../props/apiResponses";

type Props = {
    dialogBasicProps: DialogBasicProps;
    receipt?: ReceiptResponse;
};

const ReceiptDialog: FC<Props> = (
    {
        dialogBasicProps,
        receipt
    }
) => {

    return (
        <Dialog
            open={dialogBasicProps.open}
            handleClose={dialogBasicProps.handleClose}
            title={
                <StyledTitle>
                    {
                        !!receipt
                            ? <><SvgIcon component={Edit} /> Upravení účtenky</>
                            : <><SvgIcon component={AddCircle} /> Přidání účtenky</>
                    }
                </StyledTitle>
            }
        >
            <ReceiptForm
                afterSave={!receipt ? dialogBasicProps.handleClose : undefined}
                receipt={receipt}
            />
        </Dialog>
    );
};
export default ReceiptDialog;

const StyledTitle = styled("span")(({theme})=>({
    display: "flex",
    alignItems: "center",
    "& svg": {
        marginRight: theme.spacing(1)
    }
}));

