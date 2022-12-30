import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import React from 'react';

export const Preloader = () => {
    return <div
        style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
        <CircularProgress/>
    </div>
}