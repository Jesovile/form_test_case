import {PropsWithChildren} from "react";
import {AppBar, Box, Container, Paper} from "@mui/material";
import React from "react";

const AppLayout: React.FC<PropsWithChildren> = (props) => {
    const {children} = props;

    return (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <AppBar position={'static'} sx={{zIndex: 100}}>
                <Paper
                    variant='elevation'
                    elevation={4}
                    square={true}
                >
                    <h1>Header</h1>
                </Paper>
            </AppBar>
            <Container
                sx={{
                    flexGrow: 1,
                    minWidth: `360px`,
                    overflowY: 'auto',
                }}
            >
                {children}
            </Container>
        </Box>
    )
}

export default AppLayout;
