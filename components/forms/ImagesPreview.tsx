import {FC} from "react";
import {Grid, styled} from "@mui/material";
import ImagePreview from "./ImagePreview";

type Props = {
    files: File[];
};
const ImagesPreview: FC<Props> = ({files}) => {
    return (
        <Wrapper container spacing={1}>
            {
                files.map((file, i)=><ImagePreview
                    key={i}
                    image={file}
                />)
            }
        </Wrapper>
    );
};
export default ImagesPreview;

const Wrapper = styled(Grid)(({theme})=>({
    marginTop: theme.spacing(0.25)
}));