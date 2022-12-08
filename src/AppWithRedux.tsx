import React, {useCallback} from 'react';
import {AddItemForm, Header, TodolistWithRedux} from './components';
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {todolistsSelector} from "./state/selectors";
import {AddTodolistAC} from "./state/actions";
import {TodolistBllType} from "./state/reducers/todolistsReducer";


export function AppWithRedux() {
    // console.log("App is called");
    const todolists = useSelector<AppRootStateType, TodolistBllType[]>(todolistsSelector);
    const dispatch = useDispatch();

    // Функции изменения тудулистов
    const addTodolist = useCallback((title: string) =>
        dispatch(AddTodolistAC(title)), [dispatch]);

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

