import React, {FC, useContext, useEffect, useState} from "react";
import {Dialog, DialogBasicProps, useDialog} from "./Dialog";
import {AddCircle, Archive, Delete, Edit} from "@mui/icons-material";
import {Icon, styled, SvgIcon, SvgIconProps} from "@mui/material";
import ReceiptForm from "./forms/ReceiptForm";
import {ReceiptResponse} from "../props/apiResponses";
import IconButton from "./IconButton";
import RemoveDialog from "./RemoveDialog";
import useRequest from "../props/requests";
import { ReceiptRemoveRequestParams, ReceiptRequestParams, removeReceiptRequest, saveReceiptRequest } from "../services/receiptRequest";
import { ReceiptsListContext } from "./ReceiptsList";
import Button from "./Button";
import { isAfterEndOfWarranty } from "../props/helpers";
import { useSnackbar } from "notistack";
import { BasicMessages } from "../props/messages";

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
    const [currReceipt, setCurrReceipt] = useState<ReceiptResponse | undefined>(receipt);
    const removeRequest = useRequest<"", ReceiptRemoveRequestParams>(removeReceiptRequest);
    const updateRequest = useRequest<ReceiptResponse, ReceiptRequestParams>(saveReceiptRequest);
    const removeDialog = useDialog();
    const receiptsList = useContext(ReceiptsListContext);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(()=>{
        if (!dialogBasicProps.open && !receipt) {
            setCurrReceipt(undefined);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogBasicProps.open]);

    const remove = async () => {
        if (!currReceipt) return;
        
        const result: null | "" = await removeRequest.run({id: currReceipt.id});
        if (result!==null) {
            removeDialog.handleClose();
            dialogBasicProps.handleClose();
            receiptsList.updateRequests();
        }
    };

    const archive = async () => {
        if (!currReceipt) return;

        const result: ReceiptResponse | null = await updateRequest.run({id: currReceipt.id, receiptRequest: {...currReceipt, archive: true}});
        if (result && result.archive) {
            enqueueSnackbar(BasicMessages.ARCHIVED, {variant: "success"});
            dialogBasicProps.handleClose();
            receiptsList.updateRequests();
        }
    };

    return (
        <Dialog
            open={dialogBasicProps.open}
            handleClose={dialogBasicProps.handleClose}
            title={
                <StyledTitle>
                    {
                        !!currReceipt
                            ?   <>
                                    <span><SvgIcon component={Edit} /> Upravení účtenky</span>
                                    <span>
                                        {
                                            (!currReceipt.archive && isAfterEndOfWarranty(currReceipt)) &&
                                                <IconButton
                                                    color="primary"
                                                    onClick={archive}
                                                >
                                                    <Archive />
                                                </IconButton>
                                        }
                                        <IconButton 
                                            color="error"
                                            onClick={removeDialog.handleOpen}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </span>
                                </>
                            : <span><SvgIcon component={AddCircle} /> Přidání účtenky</span>
                    }
                </StyledTitle>
            }
        >
            <RemoveDialog 
                {...removeDialog}
                removeCallback={remove}
                loading={removeRequest.loading}
            />
            <ReceiptForm
                afterSave={setCurrReceipt}
                receipt={currReceipt}
                closeDialog={dialogBasicProps.handleClose}
            />
        </Dialog>
    );
};
export default ReceiptDialog;

const StyledTitle = styled("span")(({theme})=>({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    "& span": {
        display: "flex",
        alignItems: "center",
        "& > svg": {
            marginRight: theme.spacing(1)
        }
    }
}));

