export type AuthResponse = {
    isAuth: boolean,
    token: string,
}

export type LoginFormDataType = {
    login: string;
    password: string;
}

export type LoginRequestBody = {
    login: string;
    password: string;
}