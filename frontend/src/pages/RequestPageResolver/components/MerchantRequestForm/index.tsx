import {useApiReq} from "../../../../framework/utils/useApiReq.ts";
import {useEffect, useState} from "react";
import {Box, Button, CircularProgress, TextField, Typography} from "@mui/material";
import PagesLayout from "../../../../framework/layouts/PagesLayout.tsx";

type MerchantRequestFormProps = {
    role?: 'merchant' | 'riskManager'
}

type MerchantRequestType = {
    id: string;
    companyName: string;
    companyId: string;
    requestedLimit: number;
    CEOName: string;
    riskManagerResolution?: string;
    status: 'pending' | 'approved' | 'rejected'
}

export function MerchantRequestForm({role}: MerchantRequestFormProps) {
    const [formData, setFormData] = useState<Partial<MerchantRequestType>>({});

    const {
        isLoading: isRequestLoading,
        run: getRequestRun,
        error: getRequestError,
        data: requestData,
    } = useApiReq<any, MerchantRequestType>({
        url: '/api/request',
        requestMethod: 'GET',
    });

    const {
        isLoading: isRequestListLoading,
        run: getRequestListRun,
        error: getRequestListsError,
    } = useApiReq<never, MerchantRequestType[]>({
        url: '/api/requests',
        requestMethod: 'GET',
    });

    const {
        isLoading: isRequestCreateLoading,
        run: postRequestRun,
    } = useApiReq<Partial<MerchantRequestType>,never>({
        url: '/api/request',
        requestMethod: 'POST',
    });

    useEffect(() => {
        getRequestRun()
            .then(data => setFormData(data || {}));
    }, []);

    const onInputChange = (key: keyof MerchantRequestType, value: string) => {
        setFormData(prev => ({...prev, [key]: value}));
    }


    if (isRequestLoading || isRequestListLoading) {
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

    if (getRequestError || getRequestListsError) {
        return (
            <PagesLayout title={'Ошибка'}>
                <Typography
                    sx={{paddingBottom: '32px'}}
                    variant={'body2'}
                >
                    Что-то пошло не так в системе.
                    Наша команда уже работает над решением. Попробуйте обновить страницу или вернуться позже.
                    Если проблема сохраняется, свяжитесь с нами - мы рядом.
                </Typography>
            </PagesLayout>
        );
    }

    return (
        <PagesLayout title={'Форма запроса'}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}>
                {requestData?.status && (
                    <Typography>
                        {`Статус: ${requestData?.status}`}
                    </Typography>
                )}
                <TextField
                    value={formData.companyName}
                    onChange={(e) => onInputChange('companyName', e.target.value)}
                    placeholder={'Введите название компании'}
                    label={'Название компании'}
                    disabled={role === 'riskManager' || requestData?.status === 'approved' || requestData?.status === 'rejected'}
                    inputProps={{
                        maxLength: 50,
                    }}
                />
                <TextField
                    value={formData.companyId}
                    onChange={(e) => onInputChange('companyId', e.target.value)}
                    placeholder={'Введите ID компании'}
                    label={'ID компании'}
                    disabled={role === 'riskManager' || requestData?.status === 'approved' || requestData?.status === 'rejected'}
                    inputProps={{
                        maxLength: 50,
                    }}
                />
                <TextField
                    value={formData.requestedLimit}
                    onChange={(e) => onInputChange('requestedLimit', e.target.value)}
                    placeholder={'Введите запрашиваемый лимит'}
                    label={'Запрашиваемый лимит'}
                    disabled={role === 'riskManager' || requestData?.status === 'approved' || requestData?.status === 'rejected'}
                    inputProps={{
                        maxLength: 50,
                    }}
                />
                <TextField
                    value={formData.CEOName}
                    onChange={(e) => onInputChange('CEOName', e.target.value)}
                    placeholder={'Введите имя директора'}
                    label={'Имя директора'}
                    disabled={role === 'riskManager' || requestData?.status === 'approved' || requestData?.status === 'rejected'}
                    inputProps={{
                        maxLength: 50,
                    }}
                />
                {role === 'riskManager' && (
                    <TextField
                        value={formData.riskManagerResolution}
                        onChange={(e) => onInputChange('riskManagerResolution', e.target.value)}
                        placeholder={'Введите решение'}
                        label={'Резолюция'}
                        disabled={requestData?.status === 'approved' || requestData?.status === 'rejected'}
                        inputProps={{
                            maxLength: 50,
                        }}
                    />
                )}

                {role === 'merchant' && !requestData?.id && (
                    <Button
                        variant={'contained'}
                        onClick={() => {
                            postRequestRun(formData)
                                .then(() => getRequestRun())
                                .catch(e => console.error(e))
                        }}
                        loading={isRequestCreateLoading}
                    >
                        Отправить
                    </Button>
                )}

                {role === 'riskManager' && requestData?.status !== 'approved' && requestData?.status !== 'rejected' && (
                    <Box sx={{
                        display: 'flex',
                        gap: '8px',
                    }}>
                        <Button variant={'contained'}>
                            Подтвердить
                        </Button>
                        <Button variant={'contained'}>
                            Отклонить
                        </Button>
                    </Box>
                )}
            </Box>
        </PagesLayout>
    )
}