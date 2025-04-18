import React from 'react';
import OutputRoundedIcon from "@mui/icons-material/OutputRounded";
import {UserMenuOptionsProps} from "../types.ts";
import MenuItem from "./MenuItem.tsx";
import {useAuth} from "../../../../providers/AuthProvider";

const LoggedUserMenu: React.FC<UserMenuOptionsProps> = (props) => {
    const {onClick} = props;
    const { logout } = useAuth();

    return (
            <MenuItem
                icon={<OutputRoundedIcon/>}
                label={"Выйти из аккаунта"}
                onClick={() => {
                    onClick()
                    logout()
                }}
            />
    );
}

export default LoggedUserMenu;
