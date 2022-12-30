import React, {useCallback, useEffect} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {TodolistBllType} from "../../state/reducers/todolists-reducer";
import {todolistsSelector} from "../../state/selectors";
import {addTodolistsTC, fetchTodolistsTC} from '../../state/thunk/todolist-thunk';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from '../common/AddItemForm/AddItemForm';
import {isLoggedInSelector} from "../../state/selectors";
import {Navigate} from "react-router-dom";


export function Todolists() {
    // console.log("Todolists all")

    const todolists = useAppSelector<TodolistBllType[]>(todolistsSelector);
    const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodolistsTC());
        }
    }, [dispatch, isLoggedIn]);


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

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

return (
    <>
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {todolistElements}
            </Grid>
        </Container>
    </>
);
}

