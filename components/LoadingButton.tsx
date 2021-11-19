import {FC} from "react";
import {LoadingButton as MuiLoadingButton, LoadingButtonProps} from "@mui/lab";

const LoadingButton: FC<LoadingButtonProps> = (props) => {
    return (
        <MuiLoadingButton
            color="primary"
            variant="contained"

            {...props}
        >
            {props.children}
        </MuiLoadingButton>
    );
};
export default LoadingButton;