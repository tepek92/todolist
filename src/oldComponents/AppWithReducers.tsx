import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from '../components';
import {Header} from "../components";
import {Container, Grid, Paper} from "@mui/material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC
} from "../state/actions";
import {tasksReducer, todolistsReducer} from "../state/reducers";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
};
export type TasksStateType = {
    [key: string]: TaskType[]
};


export function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]);

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {taskId: v1(), title: "HTML&CSS", isDone: true},
            {taskId: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {taskId: v1(), title: "Milk", isDone: true},
            {taskId: v1(), title: "React Book", isDone: true}
        ]
    });

    // Функции изменения тасок
    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(AddTaskAC(todolistId, title));
    };
    const removeTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(RemoveTaskAC(todolistId, taskId));

    };
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) =>  {
        dispatchToTasks(ChangeTaskStatusAC(todolistId, taskId, isDone));
    };
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(ChangeTaskTitleAC(todolistId, taskId, newTitle));

    };

    // Функции изменения тудулистов
    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title);
        dispatchToTodolists(action);
        dispatchToTasks(action);
    };
    const removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId);
        dispatchToTodolists(action);
        dispatchToTasks(action);
    };

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatchToTodolists(ChangeTodolistFilterAC(todolistId, filter));
    };
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(ChangeTodolistTitleAC(todolistId, title));
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
        return <Grid item>
                <Paper style={{padding: '10px'}}>
                    <Todolist
                        key={td.id}
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

