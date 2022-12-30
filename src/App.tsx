import React, {useEffect} from 'react';
import {Todolists} from "./components/Todolists/Todolists";
import {Header} from "./components/Header/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {useAppDispatch, useAppSelector} from "./state/hooks";
import {Preloader} from "./components/common/Preloader/Preloader";
import {isInitializedAppSelector, requestStatusSelector} from "./state/selectors/app-selector";
import {initializeAppTC} from "./state/thunk/app-thunk";
import {ErrorSnackbar} from "./components/common/ErrorSnackbar/ErrorSnackbar";
import LinearProgress from "@mui/material/LinearProgress";
import {RequestStatusType} from "./state/reducers/app-reducer";

export function App() {
    // console.log("APP called")

    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(isInitializedAppSelector);
    const requestStatus = useAppSelector<RequestStatusType>(requestStatusSelector);


    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch]);

    if(!isInitialized) return <Preloader />

    return (
        <div className="App">
            <Header/>
            <ErrorSnackbar/>
            {requestStatus === 'loading' && <LinearProgress/>}
            <Routes>
                <Route path="/" element={<Todolists />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="*" element={<Navigate to={"/404"} />}/>
                <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
            </Routes>
        </div>
    );
}

