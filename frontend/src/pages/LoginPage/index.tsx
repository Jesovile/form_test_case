import {useEffect, useState} from 'react';
import {Box, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import PagesLayout from "../../framework/layouts/PagesLayout.tsx";
import {useApiReq} from "../../framework/utils/useApiReq.ts";
import InputPassword from "../../framework/components/InputPassword";
import {useAuth} from "../../framework/providers/AuthProvider";
import {AuthResponse, LoginFormDataType, LoginRequestBody} from "./types.ts";

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormDataType>({login: '', password: ''});
    // const {validationErrors, clearValidationError, validate} = useValidateLoginForm();
    const {authorize} = useAuth();
    const {isLoading, run, error} = useApiReq<LoginRequestBody, AuthResponse>({
        url: '/api/login',
        requestMethod: 'POST',
        skipDefaultErrorHandling: true,
    });
    useEffect(() => {
        // Don't show any other information by security reasons
        if (error) {
            toast.error("Произошла ошибка.\nПожалуйста проверьте правильность введенных данных", {position: 'bottom-right'});
        }
    }, [error]);

    const onInnerSubmit = () => {
        const hasErrors = false // validate(formData); // todo: fix it
        if (!hasErrors) {
            run({login: formData.login, password: formData.password})
                .then((data: AuthResponse) => {
                    authorize(data.token, data.token);
                    navigate('/app');
                })
        }
    }

    const onInputChange = (key: keyof LoginFormDataType, value: string) => {
        // clearValidationError(key);
        setFormData(prev => ({...prev, [key]: value.trim()}));
    }

    return (
        <PagesLayout title={'Вход'} subtitle={'Введите данные для входа в вашу учетную запись'}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                    <TextField
                        value={formData.login}
                        onChange={(e) => onInputChange('login', e.target.value)}
                        placeholder={'Введите адрес эл. почты'}
                        label={'Адрес эл. почты'}
                        disabled={isLoading}
                        // error={!!validationErrors.login}
                        // helperText={validationErrors.login || ''}
                        inputProps={{
                            maxLength: 50,
                        }}
                    />
                    <Box>
                        <InputPassword
                            value={formData.password}
                            onChange={(newValue: string) => onInputChange('password', newValue)}
                            label="Пароль"
                            placeholder="Пароль"
                            disabled={isLoading}
                            // error={validationErrors.password}
                        />
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                    <LoadingButton
                        variant="contained"
                        size="large"
                        onClick={() => onInnerSubmit()}
                        loading={isLoading}
                        component={'button'}
                        disabled={isLoading}
                    >
                        Войти
                    </LoadingButton>
                </Box>
            </Box>
        </PagesLayout>
    )
}

export default LoginPage;
