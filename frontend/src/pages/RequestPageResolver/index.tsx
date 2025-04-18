import {useUserInfo} from "../../framework/providers/UserInfoProvider";
import {Box, CircularProgress} from "@mui/material";
import {MerchantRequestForm} from "./components/MerchantRequestForm";

const RequestPageResolver = () => {
    const {isLoading, info} = useUserInfo();

    if (isLoading) {
        return (
            <Box sx={{
                maxWidth: '518px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}>
                <CircularProgress/>
            </Box>
        );
    }

    return <MerchantRequestForm role={info?.role}/>
}

export default RequestPageResolver;
