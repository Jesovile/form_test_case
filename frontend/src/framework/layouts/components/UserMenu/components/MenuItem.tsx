import React from 'react';
import {MenuItem as MuiMenuItem, Typography} from "@mui/material";

interface UserMenuItemProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

const MenuItem = (props: UserMenuItemProps) => {
    const {icon, label, onClick} = props;
    return (
        <MuiMenuItem onClick={onClick}>
            {icon}
            <Typography sx={{paddingLeft: '12px'}}>
                {label}
            </Typography>
        </MuiMenuItem>
    );
}

export default MenuItem;
