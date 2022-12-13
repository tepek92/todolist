import React, {useCallback, useEffect} from 'react';
import {AddItemForm, Header, TodolistWithRedux} from './components';
import {Container, Grid, Paper} from "@mui/material";
import {todolistsSelector} from "./state/selectors";
import {TodolistBllType} from "./state/reducers/todolistsReducer";
import {addTodolistsTC, fetchTodolistsTC} from "./state/thunk/todolistThunk";
import {useAppDispatch, useAppSelector} from "./state/hooks";


export function AppWithRedux() {
    // console.log("App is called");
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
                    <TodolistWithRedux
                        todolists={td}
                    />
                </Paper>
            </Grid>
            });

    return (
        <div className="App">
            <Header />
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={5}>
                    {todolistElements}
                </Grid>
            </Container>
        </div>
    );
}

