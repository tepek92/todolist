import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from '../components/AddItemForm';
import {EditableSpan} from '../components/EditableSpan';
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const {
        todolistId,
        title,
        tasks,
        filter,
        addTask,
        removeTask,
        changeFilter,
        changeTaskStatus,
        changeTaskTitle,
        removeTodolist,
        changeTodolistTitle
    } = props;

    const addTaskHandler = (title: string) => addTask(todolistId, title);
    const removeTodolistHandler = () => removeTodolist(todolistId);
    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(todolistId, title);

    const onAllClickHandler = () => changeFilter(todolistId, "all");
    const onActiveClickHandler = () => changeFilter(todolistId, "active");
    const onCompletedClickHandler = () => changeFilter(todolistId, "completed");

    const taskElements = tasks.map(t => {
        const onClickHandler = () => removeTask(todolistId, t.taskId);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todolistId, t.taskId, e.currentTarget.checked);
        };
        const onTitleChangeHandler = (newValue: string) => {
            changeTaskTitle(todolistId, t.taskId, newValue);
        }

        return (
            <div key={t.taskId} className={t.isDone ? "is-done" : ""}>
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


