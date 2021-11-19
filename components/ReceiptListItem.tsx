import {FC, useContext} from "react";
import {alpha, Avatar, Box, Grid, ListItem, ListItemAvatar, ListItemText, Skeleton, styled} from "@mui/material";
import {AlarmOff, Receipt, ReceiptLong} from "@mui/icons-material";
import {ReceiptResponse} from "../props/apiResponses";
import {printDate} from "../props/helpers";
import {useDialog} from "./Dialog";
import ReceiptDialog from "./ReceiptDialog";
import clsx from "clsx";
import {ReceiptsListContext} from "./ReceiptsList";

type Props = {
    receipt: ReceiptResponse;
};
const ReceiptListItem: FC<Props> = ({receipt}) => {

    const editDialog = useDialog();
    const receiptList = useContext(ReceiptsListContext);

    return (
        <>
            <ReceiptDialog dialogBasicProps={editDialog} receipt={receipt} />
            <StyledListItem
                onClick={!!receipt ? editDialog.handleOpen : undefined}
                className={clsx(!receipt && "skeleton")}
            >
                {
                    !receiptList.loading
                        ?
                            <>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Receipt />
                                    </Avatar>
                                </ListItemAvatar>
                                <StyledListItemText
                                    primary={<ItemTitle>{receipt.title}</ItemTitle>}
                                    secondary={
                                        <>
                                            <span>{printDate(receipt.purchaseDate)}</span>
                                            <span>
                                                <EndOFWarranty>
                                                    <AlarmOff /> {printDate(receipt.endOfWarranty)}
                                                </EndOFWarranty>
                                             </span>
                                        </>
                                    }
                                />
                            </>
                        :
                            <>
                                <ListItemAvatar>
                                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Skeleton width={100} animation="wave" />}
                                    secondary={<Skeleton animation="wave" />}
                                />
                            </>
                }
            </StyledListItem>
        </>
    );
};
export default ReceiptListItem;

const StyledListItem = styled(ListItem)(({theme}) => ({
    borderRadius: 5,
    marginTop: theme.spacing(1),
    border: `1px solid ${theme.palette.secondary.main}`,
    "&.skeleton": {
        backgroundColor: "transparent",
        boxSizing: "border-box"
    },
    "&:not(.skeleton)": {
        cursor: "pointer",
        transition: "background-color 250ms ease",
        "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.1)
        }
    }
}));

const ItemTitle = styled("div")(({theme}) => ({
    color: theme.palette.primary.main
}));

const StyledListItemText = styled(ListItemText)(({theme}) => ({
    "& .MuiListItemText-secondary": {
        display: "flex",
        justifyContent: "space-between"
    }
}));

const EndOFWarranty = styled("span")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    "& svg": {
        fontSize: "1em",
        marginRight: theme.spacing(0.5)
    }
}));