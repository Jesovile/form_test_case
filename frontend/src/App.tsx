import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import AppRouter from "./core/AppRouter.tsx";
import {ToastContainer} from "react-toastify";
import AuthProvider from "./framework/providers/AuthProvider";
import UserInfoProvider from "./framework/providers/UserInfoProvider";

function App() {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AuthProvider>
                <UserInfoProvider>
                    <AppRouter/>
                </UserInfoProvider>
            </AuthProvider>
            <ToastContainer/>
        </ThemeProvider>
    )
}

export default App
