import React from "react";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import {useNavigate} from "react-router-dom";
import {UserMenuOptionsProps} from "../types.ts";
import MenuItem from "./MenuItem.tsx";

const NotLoggedUserMenu: React.FC<UserMenuOptionsProps> = (props) => {
    const {onClick} = props;
    const navigate = useNavigate();
    return (
        <MenuItem
            icon={<ExitToAppRoundedIcon/>}
            label={"Войти"}
            onClick={() => {
                onClick()
                navigate('/login')
            }}
        />
    );
}

export default NotLoggedUserMenu;
