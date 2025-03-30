import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import AppTheme from '../shared-theme/AppTheme';
import Logo12G from '../common/Logo12G';
import ColorModeSelect from "../shared-theme/ColorModeSelect";

import {useAuth} from "../authentication/AuthContext";
import VerificationCheck from "./VerificationCheck";


const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Box)(({theme}) => ({
    height: '100vh',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignIn(props) {
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [verOpen, setVerOpen] = React.useState(false);
    const formRef = React.useRef(null);

    const auth = useAuth()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleVerClose = () => {
        setVerOpen(false);
    };

    const getLoginDetails = () => {
        const form = formRef.current;
        const data = new FormData(form);
        return {
            email: data.get('email'),
            password: data.get('password'),
            deviceId: navigator.userAgent + navigator.platform,
        };
    };

    const validateInputs = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        let errors = {
            email: '',
            password: '',
        };

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Пожалуйста, введите корректный адрес электронной почты.';
        }

        if (!password || password.length < 6) {
            errors.password = 'Пароль должен содержать не менее 6 символов.';
        }

        setEmailErrorMessage(errors.email);
        setPasswordErrorMessage(errors.password);

        return !errors.email && !errors.password;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValid = validateInputs();
        if (!isValid) return;

        const loginDetails = getLoginDetails();
        const result = await auth.loginAction(loginDetails);

        if (!result) {
            setPasswordErrorMessage('Неверный адрес электронной почты или пароль.');
            return;
        }

        if (result.requires2FA) {
            setVerOpen(true);
            await auth.handle2FA(loginDetails.email);
        }
    };

    const handleVerificationCode = async (code) => {
        console.log("Received verification code:", code);
        const loginDetails = getLoginDetails();
        await auth.verify2FA(code, loginDetails.email, loginDetails.deviceId);
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme/>
            <SignInContainer>
                <ColorModeSelect sx={{position: 'fixed', top: '1rem', right: '1rem'}}/>
                <Card variant="outlined">
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Logo12G height={60} width={60}/>
                    </Box>
                    <Typography component="h1" variant="h4"
                                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}>
                        Войти
                    </Typography>
                    <Box
                        component="form"
                        ref={formRef}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                error={!!emailErrorMessage}
                                helperText={emailErrorMessage}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailErrorMessage ? "error" : "primary"}
                                sx={{ariaLabel: 'email'}}
                            />
                        </FormControl>
                        <FormControl>
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <FormLabel htmlFor="password">Пароль</FormLabel>
                                <Link
                                    component="button"
                                    type="button"
                                    onClick={handleClickOpen}
                                    variant="body2"
                                    sx={{alignSelf: 'baseline'}}
                                >
                                    Забыли пароль?
                                </Link>
                            </Box>
                            <TextField
                                error={!!passwordErrorMessage}
                                helperText={passwordErrorMessage}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordErrorMessage ? "error" : "primary"}
                            />
                        </FormControl>
                        <FormControlLabel control={<Checkbox value="remember" color="primary"/>}
                                          label="Запомнить меня"/>
                        <ForgotPassword open={open} handleClose={handleClose}/>
                        <VerificationCheck
                            handleClose={handleVerClose}
                            open={verOpen}
                            onVerify={handleVerificationCode}/>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            onClick={async (event) => {
                                if (validateInputs()) {
                                    await handleSubmit(event);
                                }
                            }
                            }
                        >
                            Войти
                        </Button>
                        <Typography sx={{textAlign: 'center'}}>
                            Ещё нет аккаунта?{' '}
                            <span>
                <Link href="/signup" variant="body2" sx={{alignSelf: 'center'}}>
                  Зарегистрироваться
                </Link>
              </span>
                        </Typography>
                    </Box>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}
