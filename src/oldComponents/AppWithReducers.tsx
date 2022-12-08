import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
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
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";
import {FilterValuesType} from "../state/reducers/todolistsReducer";


export function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]);

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

