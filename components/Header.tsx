import {FC} from "react";
import {Avatar, Paper, styled, Typography} from "@mui/material";
import {Receipt, ReceiptLongRounded} from '@mui/icons-material';

type Props = {};
const Header: FC<Props> = () => {
    return (
        <Wrapper>
            <Logo>
                <Receipt />
            </Logo>
            <Typography variant="h3" component="h1" color="primary">
                StoRec
            </Typography>
        </Wrapper>
    );
};
export default Header;

const Wrapper = styled("div")(({theme})=>({
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    display: "flex",
    alignItems: "center"
}));

const Logo = styled(Avatar)(({theme}) => ({
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(1)
}));