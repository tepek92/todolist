import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from '../components/AddItemForm';
import {Header} from "../components/Header";
import {Container, Grid, Paper} from "@mui/material";
import {TaskType} from "../components/TodolistWithRedux";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
};
export type TasksStateType = {
    [key: string]: TaskType[]
};


export function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], {taskId: v1(), title, isDone: false}]})
    };
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.taskId !== taskId)});
    };
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) =>  {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.taskId === taskId ? {...t, isDone} : t)});
    };
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.taskId === taskId ? {...t, title: newTitle} : t)});
    };

    // Функции изменения тудулистов
    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        setTodolists([{id: newTodolistId, title: title, filter: 'all'}, ...todolists]);
        setTasks({...tasks, [newTodolistId]: []});
    };
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
        let newTasks = {...tasks};
        delete newTasks[todolistId];
        setTasks(newTasks);
    };
    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(td => td.id === todolistId ? {...td, filter}: td));
    };
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(td => td.id === todolistId ? {...td, title}: td));
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

