import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm, Header} from '../components';
import {Container, Grid, Paper} from "@mui/material";
import {TasksStateType} from "../state/reducers/tasksReducer";
import {FilterValuesType, TodolistBllType} from "../state/reducers/todolistsReducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

export function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistBllType>>([
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", todoListId: todolistId1, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: ''},
            {id: v1(), title: "JS", todoListId: todolistId1, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: ''}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", todoListId: todolistId2, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: ''},
            {id: v1(), title: "React Book", todoListId: todolistId2, status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', order: 0, addedDate: '', startDate: '', deadline: ''}
        ]
    });

    // Функции изменения тасок
    const addTask = (todolistId: string, title: string) => {
        const newTask =
            {
                id: v1(),
                todoListId: todolistId,
                title: title,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                description: '',
                order: 0,
                addedDate: '',
                startDate: '',
                deadline: '',
            }

        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    };
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
    };
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) =>  {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ?
                {...t, status: isDone ? TaskStatuses.Completed : TaskStatuses.New} : t)});
    };
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)});
    };

    // Функции изменения тудулистов
    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        setTodolists([{id: newTodolistId, title: title, filter: 'all', addedDate: '', order: 0}, ...todolists]);
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
            return tasks.filter(t => t.status === TaskStatuses.New);
        } else if (filter === "completed") {
            return tasks.filter(t => t.status === TaskStatuses.Completed);
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

