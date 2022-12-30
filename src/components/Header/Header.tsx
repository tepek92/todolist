import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {memo} from 'react';
import {Link} from 'react-router-dom';
import s from './Header.module.css';
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {logoutTC} from "../../state/thunk/auth-thunk";
import {isLoggedInSelector} from "../../state/selectors/auth-selector";

export const Header = memo(() => {

    const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector);
    const dispatch = useAppDispatch();


    const logoutHandler = () => {
        dispatch(logoutTC());
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className={s.link}>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/">Todolist</Link>
                    </Typography>
                    {isLoggedIn ? <Button color="inherit" onClick={logoutHandler}>Logout</Button> : <span>LOGIN</span>}
                </Toolbar>
            </AppBar>
        </Box>
    );
});
