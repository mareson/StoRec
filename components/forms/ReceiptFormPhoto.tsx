import {FC} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Grid, styled, Typography} from "@mui/material";
import {PhotoResponse} from "../../props/apiResponses";
import Image from "next/image";
import {ExpandMore} from "@mui/icons-material";
import TextField from "./fields/TextField";
import {FORM_SPACING} from "../../props/theme";

type Props = {
    photo: PhotoResponse;
    index: number;
};
const ReceiptFormPhoto: FC<Props> = ({photo, index}) => {
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
                </Grid>
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
