import {createContext, FC, useContext, useState} from "react";
import {List, styled} from "@mui/material";
import ReceiptListItem from "./ReceiptListItem";
import {ReceiptResponse} from "../props/apiResponses";
import useRequest from "../props/requests";
import {getReceiptsRequest} from "../services/receiptRequest";

type Props = {
    receipts: ReceiptResponse[];
    updateRequests: ()=>void;
    loading: boolean;
};


const ReceiptsList: FC = () => {
    const receiptList = useContext(ReceiptsListContext);

    return (
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
    );
};
export default ReceiptsList;

export function useReceiptsList(receiptsInit: ReceiptResponse[]): Props {
    const request = useRequest<ReceiptResponse[], undefined>(getReceiptsRequest);
    const [receipts, setReceipts] = useState<ReceiptResponse[]>(receiptsInit);

    const updateRequests = async () => {
        const result = await request.run(undefined);
        if (result) {
            setReceipts(result);
        }
    };

    return {
        receipts, updateRequests,
        loading: request.loading
    };
}

export const ReceiptsListContext = createContext<Props>({
    receipts: [],
    updateRequests: ()=>{},
    loading: false
});

const StyledList = styled(List)(({theme})=>({
    width: "100%"
}));