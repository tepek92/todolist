import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {TodolistBllType} from "../../state/reducers/todolists-reducer";
import {todolistsSelector} from "../../state/selectors";
import {addTodolistsTC, fetchTodolistsTC} from '../../state/thunk/todolist-thunk';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "../common/AddItemForm";


export function Todolists() {
    const todolists = useAppSelector<TodolistBllType[]>(todolistsSelector);
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

