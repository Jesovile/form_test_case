import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import AppRouter from "./core/AppRouter.tsx";
import {ToastContainer} from "react-toastify";
import AuthProvider from "./framework/providers/AuthProvider";

function App() {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AuthProvider>
                <AppRouter/>
            </AuthProvider>
            <ToastContainer/>
        </ThemeProvider>
    )
}

export default App
