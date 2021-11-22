import {FC} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Grid, styled, Typography} from "@mui/material";
import {PhotoResponse} from "../../props/apiResponses";
import Image from "next/image";
import {Delete, ExpandMore} from "@mui/icons-material";
import TextField from "./fields/TextField";
import {FORM_SPACING} from "../../props/theme";
import { LoadingButton } from "@mui/lab";
import RemoveDialog from "../RemoveDialog";
import { useDialog } from "../Dialog";
import useRequest from "../../props/requests";
import { removePhotoRequest, RemovePhotoRequestParams } from "../../services/photoRequest";

type Props = {
    photo: PhotoResponse;
    index: number;
    removePhoto: ()=>void;
};
const ReceiptFormPhoto: FC<Props> = ({photo, index, removePhoto}) => {
    const removeDialog = useDialog();
    const removeRequest = useRequest<"", RemovePhotoRequestParams>(removePhotoRequest);

    const remove = async () => {
        const result: null | "" = await removeRequest.run({id: photo.id});
        if (result!==null) {
            removePhoto();
        } 
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
            >
                <Typography>{!photo.caption || photo.caption==="" ? `Foto ${index+1}` : photo.caption}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={FORM_SPACING}>
                    <Grid item xs={12}>
                        <ImageContent>
                            <Image
                                src={photo.url}
                                layout="fill"
                                objectFit="contain"
                                alt={photo.caption ?? ""}
                            />
                        </ImageContent>
                    </Grid>
                    <Grid item xs={12}>
                       <TextField
                           label="Titulek"
                           name={`photo[${index}].caption`}
                       />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Text z fotky"
                            name={`photo[${index}].text`}
                            multiline
                            rows={6}
                        />
                    </Grid>
                    <Grid item xs={12} textAlign="right">
                        <LoadingButton
                            variant="outlined"
                            startIcon={<Delete />}
                            color="error"
                            onClick={removeDialog.handleOpen}
                        >
                            Smazat
                        </LoadingButton>
                    </Grid>
                </Grid>
                <RemoveDialog 
                    {...removeDialog}
                    removeCallback={remove}
                    loading={removeRequest.loading}
                />
            </AccordionDetails>
        </Accordion>
    );
};
export default ReceiptFormPhoto;

const ImageContent = styled("div")(({theme}) => ({
    height: 300,
    width: "100%",
    position: "relative"
}));
