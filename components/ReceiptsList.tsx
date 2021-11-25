import React, {createContext, FC, useContext, useEffect, useRef, useState} from "react";
import {List, styled} from "@mui/material";
import ReceiptListItem from "./ReceiptListItem";
import {ListResponse, ReceiptResponse} from "../props/apiResponses";
import useRequest from "../props/requests";
import {getReceiptsRequest, GetReceiptsRequestParams} from "../services/receiptRequest";
import Button from "./Button";
import { MoreHoriz } from "@mui/icons-material";
import { LIST_DEFAULT_SIZE } from "../props/params";
import { LoadingButton } from "@mui/lab";
import axios, { CancelTokenSource, CancelTokenStatic } from "axios";
import { BasicMessages } from "../props/messages";

type Props = {
    receipts: ReceiptResponse[];
    updateRequests: ()=>void;
    loading: boolean;
    search: (params: GetReceiptsRequestParams)=>void;
    showMore: boolean;
    handleShowMore: ()=>void;
    showMoreLoading: boolean;
};


const ReceiptsList: FC = () => {
    const receiptList = useContext(ReceiptsListContext);

    return (
        <>
            <StyledList>
                {
                    receiptList.receipts.map((receipt)=>
                        <ReceiptListItem
                            key={receipt.id}
                            receipt={receipt}
                        />
                    )
                }
            </StyledList>
            {
                receiptList.showMore &&
                    <ShowMoreWrapper>
                        <LoadingButton 
                            variant="contained"
                            onClick={receiptList.handleShowMore}
                            loading={receiptList.loading || receiptList.showMoreLoading}
                        >
                            Zobrazit další
                        </LoadingButton>
                    </ShowMoreWrapper>
            }
        </>
    );
};
export default ReceiptsList;

export function useReceiptsList(receiptsInit: ReceiptResponse[]): Props {
    const request = useRequest<ListResponse<ReceiptResponse>, GetReceiptsRequestParams>(getReceiptsRequest, undefined, true);
    const [receipts, setReceipts] = useState<ReceiptResponse[]>(receiptsInit);
    const [params, setParams] = useState<GetReceiptsRequestParams>({});
    const [showMore, setShowMore] = useState<boolean>(receiptsInit.length === LIST_DEFAULT_SIZE);
    const loadMoreRequest = useRef<boolean>(false);
    const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);
    const cancelTokenSource = useRef<CancelTokenSource>();

    const updateRequests = async () => {
        if (!loadMoreRequest.current) {
            request.startLoading();
        } else {
            loadMoreRequest.current = false;
            setShowMoreLoading(true);
        }

        if (cancelTokenSource.current) cancelTokenSource.current.cancel(BasicMessages.CANCELLED);
        cancelTokenSource.current = axios.CancelToken.source();

        const result = await request.run({...params, cancelToken: cancelTokenSource.current.token});

        if (result) {
            setReceipts(result.data);
            setShowMore(result.pagination.size>=(params.size ?? LIST_DEFAULT_SIZE));
            request.stopLoading();
            setShowMoreLoading(false);
        }
    };

    const search = (params: GetReceiptsRequestParams) => {
        setParams({...params, size: LIST_DEFAULT_SIZE});
    };

    const handleShowMore = () => {
        loadMoreRequest.current = true;
        setParams({...params, size: (params.size ?? LIST_DEFAULT_SIZE)+LIST_DEFAULT_SIZE});
    };

    const initRender = useRef<boolean>(true);
    useEffect(()=>{
        if (initRender.current) {
            initRender.current = false;
            return;
        }

        updateRequests();
    }, [params]);

    return {
        receipts, 
        updateRequests,
        loading: request.loading,
        search,
        showMore,
        handleShowMore,
        showMoreLoading
    };
}

export const ReceiptsListContext = createContext<Props>({
    receipts: [],
    updateRequests: ()=>{},
    loading: false,
    search: ()=>{},
    showMore: false,
    handleShowMore: ()=>{},
    showMoreLoading: false
});

const StyledList = styled(List)(({theme})=>({
    width: "100%"
}));

const ShowMoreWrapper = styled("div")(({theme}) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}));