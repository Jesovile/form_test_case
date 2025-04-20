import React from 'react';
import {Box, Toolbar, Typography} from "@mui/material";
import UserMenu from "./UserMenu";
import {useUserInfo} from "../../providers/UserInfoProvider";

const PageHeader = () => {
    const {info} = useUserInfo();

    return (
        <Toolbar sx={{maxWidth: '1200px', margin: '0 auto'}}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box sx={{display: 'flex'}}>
                    <Typography>{`Role: ${info?.role || '<undefined>'}`}</Typography>
                </Box>
                <Box>
                    <UserMenu/>
                </Box>
            </Box>


        </Toolbar>
    );
}

export default PageHeader;
