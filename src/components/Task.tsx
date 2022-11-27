import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../state/actions";
import {TaskType} from "./TodolistWithRedux";

type TaskPropsType = {
    todolistId: string
    tasks: TaskType
}

export const Task = memo((props: TaskPropsType) => {
    // console.log('Task is called')
    const {taskId, title, isDone} = props.tasks
    const {todolistId} = props;

    const dispatch = useDispatch();

    const onClickHandler = useCallback(() => dispatch(RemoveTaskAC(todolistId, taskId)), [dispatch, todolistId, taskId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ChangeTaskStatusAC(todolistId, taskId, e.currentTarget.checked));
    }, [dispatch, todolistId, taskId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskId, newValue))
    }, [dispatch, todolistId, taskId]);


    return (
        <div className={isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeHandler} checked={isDone}/>
            <EditableSpan value={title} onChange={onTitleChangeHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler} size="small">
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    )
})