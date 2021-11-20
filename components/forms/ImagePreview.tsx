import {FC} from "react";
import {Box, Grid, styled} from "@mui/material";

type Props = {
    image: File;
};
const ImagePreview: FC<Props> = ({image}) => {

    return (
        <Wrapper item xs={6}>
            <InnerWrapper>
                <Image src={URL.createObjectURL(image)} alt="" />
            </InnerWrapper>
        </Wrapper>
    );
};
export default ImagePreview;

const Wrapper = styled(Grid)(({theme})=>({
    position: "relative",
    height: 200,
    overflow: "hidden",
    display: "flex",
}));

const InnerWrapper = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 10
}));

const Image = styled("img")(({theme}) => ({
    maxWidth: "100%",
    maxHeight: "100%"
}));