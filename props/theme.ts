import {createTheme} from "@mui/material";
import {blue, grey} from "@mui/material/colors";

export const FORM_SPACING = 2; // multiplication ratio

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {

                },
                html: {
                    minHeight: "100%"
                }
            }
        }
    },
    palette: {
        primary: {
            main: blue[500]
        },
        secondary: {
            main: grey[300]
        }
    }
});

export default theme;