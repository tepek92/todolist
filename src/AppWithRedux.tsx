import React, {useCallback} from 'react';
import {AddItemForm} from './components';
import {Header} from "./components";
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./components";
import {todolistsSelector} from "./state/selectors";
import {TaskType} from "./components/TodolistWithRedux";
import {AddTodolistAC} from "./state/actions";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
};
export type TasksStateType = {
    [key: string]: TaskType[]
};


export function AppWithRedux() {
    console.log("App is called");
    const todolists = useSelector<AppRootStateType, TodolistType[]>(todolistsSelector);
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

