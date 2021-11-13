import {createTheme} from "@mui/material";
import {blue, grey} from "@mui/material/colors";

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