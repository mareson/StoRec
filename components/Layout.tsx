import {FC} from "react";
import {Container, styled} from "@mui/material";

type Props = {};
const Layout: FC<Props> = ({children}) => {
    return (
        <StyledContainer maxWidth="sm">
            {children}
        </StyledContainer>
    );
};
export default Layout;

const StyledContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
}));