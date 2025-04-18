import {PropsWithChildren} from "react";
import {Box, CardHeader, Typography, useTheme} from "@mui/material";

interface AuthPagesLayoutProps extends PropsWithChildren{
    title: string;
    subtitle?: string;
}

const PagesLayout = (props: AuthPagesLayoutProps) => {
    const {children, title, subtitle} = props;
    const theme = useTheme();
    const formHeaderPadding = "64px 0 32px 0";

    return (
        <Box sx={{
            maxWidth: '518px',
            margin: '0 auto'
        }}>
            <CardHeader
                sx={{padding: formHeaderPadding }}
                title={
                    <Typography
                        // @ts-ignore
                        variant={'h4'}
                    >
                        {title}
                    </Typography>
                }
                subheader={subtitle ?
                    <Typography variant='body2' color={theme.palette.text.secondary}>
                        {subtitle}
                    </Typography>
                    :
                    undefined
                }
            />
            {children}
        </Box>
    );
}

export default PagesLayout;
