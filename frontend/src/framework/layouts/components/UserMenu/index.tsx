import React from 'react';
import {IconButton, Menu} from "@mui/material";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import NotLoggedUserMenu from "./components/NotLoggedUserMenu.tsx";
import LoggedUserMenu from "./components/LoggedUserMenu.tsx";
import {useAuth} from "../../../providers/AuthProvider";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const {isAuthenticated} = useAuth();

    return (
        <React.Fragment>
            <IconButton
                size='medium'
                onClick={handleClick}
                sx={{
                    background: open ? 'rgba(0,0,0,0.12)' : 'none',
                    '&:hover': {
                        background: 'rgba(0,0,0,0.12)',
                    },
                }}
            >
                <PersonRoundedIcon fontSize='large'/>
            </IconButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                sx={{marginTop: '4px'}}
            >
                {isAuthenticated ? <LoggedUserMenu onClick={handleClose}/> : <NotLoggedUserMenu onClick={handleClose}/>}
            </Menu>
        </React.Fragment>
    );
}

export default UserMenu;
