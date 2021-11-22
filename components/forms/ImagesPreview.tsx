import {FC} from "react";
import {Grid, styled} from "@mui/material";
import ImagePreview from "./ImagePreview";

type Props = {
    files: File[];
    removeFile: (index: number)=>void;
};
const ImagesPreview: FC<Props> = ({files, removeFile}) => {
    return (
        <Wrapper container spacing={1}>
            {
                files.map((file, i: number)=><ImagePreview
                    key={i}
                    image={file}
                    remove={()=>removeFile(i)}
                />)
            }
        </Wrapper>
    );
};
export default ImagesPreview;

const Wrapper = styled(Grid)(({theme})=>({
    marginTop: theme.spacing(0.25)
}));