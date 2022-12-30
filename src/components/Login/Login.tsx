import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {loginTC} from "../../state/thunk/auth-thunk";
import {isLoggedInSelector} from "../../state/selectors/auth-selector";
import {Navigate} from "react-router-dom";
import * as Yup from 'yup';

export const Login = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector);

    const formik = useFormik(
        {
            initialValues: {
                email: '',
                password: '',
                rememberMe: false,
            },
            validationSchema: Yup.object({
                password: Yup.string().required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
            }),
            onSubmit: (values) => {
                dispatch(loginTC(values))
                formik.resetForm();
            },
        });

    if (isLoggedIn) return <Navigate to={'/'}/>

    return <>
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a
                                    href={'https://social-network.samuraijs.com/'}
                                    target={'_blank'}
                                    rel="noreferrer"
                                > here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                                error={!!formik.errors.email && formik.touched.email}
                                helperText={formik.errors.email}
                            />
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                                error={!!formik.errors.password && formik.touched.password}
                                helperText={formik.errors.password}
                            />
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        {...formik.getFieldProps('rememberMe')}
                                        checked={formik.values.rememberMe}
                                    />}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    </>
}