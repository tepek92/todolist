import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {Header} from "./Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    // Функции изменения тасок
    const addTask = (todolistId: string, title: string) => {
        dispatch(AddTaskAC(todolistId, title));
    };
    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todolistId, taskId));

    };
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) =>  {
        dispatch(ChangeTaskStatusAC(todolistId, taskId, isDone));
    };
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskId, newTitle));
    };

    // Функции изменения тудулистов
    const addTodolist = (title: string) => {
        dispatch(AddTodolistAC(title));
    };
    const removeTodolist = (todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId));
    };

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, filter));
    };
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, title));
    };
    
    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        if (filter === "active") {
            return tasks.filter(t => !t.isDone);
        } else if (filter === "completed") {
            return tasks.filter(t => t.isDone);
        }
        return tasks;
    };

    const todolistElements = todolists.map(td => {
        return <Grid item key={td.id}>
                <Paper style={{padding: '10px'}}>
                    <Todolist
                        todolistId={td.id}
                        title={td.title}
                        filter={td.filter}
                        tasks={getFilteredTasks(tasks[td.id], td.filter)}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
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

