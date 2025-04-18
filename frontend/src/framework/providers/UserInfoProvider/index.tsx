import {createContext, PropsWithChildren, useContext, useEffect, useMemo} from "react";
import {useAuth} from "../AuthProvider";
import {useApiReq} from "../../utils/useApiReq.ts";

export type UserInfoType = {
    id: string;
    name: string;
    role: 'merchant' | 'riskManager',
}

export type UserInfoContextType = {
    isLoading: boolean
    info: UserInfoType | null
}

const defaultUserInfoContext: UserInfoContextType = {
    info: null,
    isLoading: false,
}

const UserInfoContext = createContext<UserInfoContextType>(defaultUserInfoContext);

const UserInfoProvider = (props: PropsWithChildren) => {
    const {children} = props;
    const {isAuthenticated} = useAuth();

    // load user data
    const {
        isLoading: isUserInfoLoading,
        data: userInfoData = null,
        run: runUserInfoReq
    } = useApiReq<never, UserInfoType>({
        url: '/api/user',
        requestMethod: 'GET',
        skipDefaultErrorHandling: true,
    })

    useEffect(() => {
        if (isAuthenticated) {
            runUserInfoReq()
                .catch((e: unknown) => console.log(e));
        }
    }, [isAuthenticated, location.href]);

    const contextInstance: UserInfoContextType = useMemo(() => ({
        info: userInfoData,
        isLoading: isUserInfoLoading,
    }), [
        isUserInfoLoading,
        userInfoData,
    ])

    return (
        <UserInfoContext.Provider value={contextInstance}>
            {children}
        </UserInfoContext.Provider>
    );
}

export default UserInfoProvider;
export const useUserInfo = () => useContext(UserInfoContext);