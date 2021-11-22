import React, {FC} from "react";
import {alpha, Box, Grid, styled} from "@mui/material";
import IconButton from "../IconButton";
import { Delete } from "@mui/icons-material";
import { MAX_PHOTO_SIZE } from "../../props/params";

type Props = {
    image: File;
    remove: ()=>void;
};
const ImagePreview: FC<Props> = ({image, remove}) => {

    const isTooLarge: boolean = image.size>MAX_PHOTO_SIZE;

    return (
        <Wrapper item xs={6}>
            <InnerWrapper>
                <Image src={URL.createObjectURL(image)} alt="" />
                {
                    isTooLarge &&
                        <TooLarge>
                            Tato fotka je příliš velká, nebude nahrán.
                        </TooLarge>
                }
                <RemoveButton
                    color="error"
                    onClick={remove}
                >
                    <Delete />
                </RemoveButton>
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
    borderRadius: 10,
    position: "relative",
    overflow: "hidden"
}));

const Image = styled("img")(({theme}) => ({
    maxWidth: "100%",
    maxHeight: "100%"
}));

const RemoveButton = styled(IconButton)(({theme})=>({
    position: "absolute",
    top: theme.spacing(0.5),
    right: theme.spacing(0.5)
}));

const TooLarge = styled("div")(({theme}) => ({
    position: "absolute",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: theme.palette.error.main,
    fontWeight: "bold",
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
}));