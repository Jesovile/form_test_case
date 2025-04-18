import React from 'react';
import {Box, Toolbar} from "@mui/material";
import UserMenu from "./UserMenu";

interface PageHeaderProps {
    centralSlot?: React.ReactNode,
    rightSlot?: React.ReactNode,
}

const PageHeader = (props: PageHeaderProps) => {
    const {centralSlot} = props;

    return (
        <Toolbar sx={{maxWidth: '1200px', margin: '0 auto'}}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box sx={{display: 'flex'}}>
                    {centralSlot}
                </Box>
                <Box>
                    <UserMenu/>
                </Box>
            </Box>


        </Toolbar>
    );
}

export default PageHeader;
