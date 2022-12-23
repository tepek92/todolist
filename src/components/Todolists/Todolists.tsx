import React, {useCallback, useEffect} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {TodolistBllType} from "../../state/reducers/todolists-reducer";
import {requestStatusSelector, todolistsSelector} from "../../state/selectors";
import {addTodolistsTC, fetchTodolistsTC} from '../../state/thunk/todolist-thunk';
import {Todolist} from "./Todolist/Todolist";
import {RequestStatusType} from "../../state/reducers/app-reducer";
import { AddItemForm } from '../common/AddItemForm';
import {ErrorSnackbar} from "../common/ErrorSnackbar";


export function Todolists() {
    const todolists = useAppSelector<TodolistBllType[]>(todolistsSelector);
    const requestStatus = useAppSelector<RequestStatusType>(requestStatusSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    },[dispatch] )

    // Функции изменения тудулистов
    const addTodolist = useCallback((title: string) =>
        dispatch(addTodolistsTC(title)), [dispatch]);

    const todolistElements = todolists.map(td => {
        return <Grid item key={td.id}>
            <Paper style={{padding: '10px'}}>
                <Todolist
                    todolists={td}
                />
            </Paper>
        </Grid>
    });

    return (
    <>
        <ErrorSnackbar />
        {requestStatus === 'loading' && <LinearProgress />}
        <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={5}>
                    {todolistElements}
                </Grid>
            </Container>
        </>
    );
}

