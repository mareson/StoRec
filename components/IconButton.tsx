import {FC} from "react";
import MuiIconButton, {IconButtonProps} from '@mui/material/IconButton';

const IconButton: FC<IconButtonProps> = (props) => {
    return (
        <MuiIconButton
            color="primary"

            {...props}
        >
            {props.children}
        </MuiIconButton>
    );
};
export default IconButton;