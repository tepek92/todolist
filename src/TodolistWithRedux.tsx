import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType, TodolistType} from "./AppWithRedux";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolists: TodolistType;
}

export function TodolistWithRedux(props: PropsType) {
    const {id, title, filter} = props.todolists;

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id]);
    const dispatch = useDispatch();

    const addTaskHandler = (title: string) => dispatch(AddTaskAC(id, title));
    const removeTodolistHandler = () => dispatch(RemoveTodolistAC(id));
    const changeTodolistTitleHandler = (title: string) =>
        dispatch(ChangeTodolistTitleAC(id, title));

    const onAllClickHandler = () => dispatch(ChangeTodolistFilterAC(id, "all"));
    const onActiveClickHandler = () => dispatch(ChangeTodolistFilterAC(id, "active"));
    const onCompletedClickHandler = () => dispatch(ChangeTodolistFilterAC(id, "completed"));

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        if (filter === "active") {
            return tasks.filter(t => !t.isDone);
        } else if (filter === "completed") {
            return tasks.filter(t => t.isDone);
        }
        return tasks;
    };

    const taskElements = getFilteredTasks(tasks, filter).map(t => {
        const onClickHandler = () => dispatch(RemoveTaskAC(id, t.id));
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(ChangeTaskStatusAC(id, t.id, e.currentTarget.checked));
        };
        const onTitleChangeHandler = (newValue: string) => {
            dispatch(ChangeTaskTitleAC(id, t.id, newValue))
        }

        return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                <IconButton aria-label="delete" onClick={onClickHandler} size="small">
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </div>
        )});

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler} size="small">
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTaskHandler}/>
            <div>{taskElements}</div>

            <div>
                <Button style={{margin: '10px'}} size={"small"}
                        variant={filter === 'all' ? "contained" : "outlined"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button style={{margin: '5px'}} size={"small"} color="secondary"
                        variant={filter === 'active' ? "contained" : "outlined"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button style={{margin: '5px'}} size={"small"} color="success"
                        variant={filter === 'completed' ? "contained" : "outlined"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )}


