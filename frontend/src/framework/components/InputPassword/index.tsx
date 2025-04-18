import React, {useState} from 'react';
import {
    FormControl, FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, useTheme,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface InputPasswordProps {
    value: string;
    label: string;
    placeholder: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    error?: string;
}

const InputPassword = (props: InputPasswordProps) => {
    const theme = useTheme();
    const {value, label, placeholder, onChange, disabled, error} = props;
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(String(e.target.value).trim() || '');
    }

    return (
        <FormControl sx={{width: '100%' }} variant="outlined" error={!!error}>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
                value={value}
                onChange={handleChangePassword}
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                inputProps={{
                    maxLength: 50
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{
                                color:theme.palette.grey[400]
                            }}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
                disabled={disabled}
            />
            {!!error && (
                <FormHelperText error>
                    {error}
                </FormHelperText>
            )}
        </FormControl>
    )
}

export default InputPassword
