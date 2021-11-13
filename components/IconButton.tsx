import {FC} from "react";
import MuiIconButton, {IconButtonProps} from '@mui/material/IconButton';

type Props = {
    props?: IconButtonProps;
};
const IconButton: FC<Props> = ({props, children}) => {
    return (
        <MuiIconButton
            color="primary"

            {...props}
        >
            {children}
        </MuiIconButton>
    );
};
export default IconButton;