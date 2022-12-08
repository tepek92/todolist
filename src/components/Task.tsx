import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../state/actions";
import {TaskStatuses, TaskType} from "../api/todolist-api";

type TaskPropsType = {
    todolistId: string
    tasks: TaskType
}

export const Task = memo((props: TaskPropsType) => {
    // console.log('Task is called')
    const {id, title, status} = props.tasks
    const {todolistId} = props;

    const dispatch = useDispatch();

    const onClickHandler = useCallback(() => dispatch(RemoveTaskAC(todolistId, id)), [dispatch, todolistId, id]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ChangeTaskStatusAC(todolistId, id, e.currentTarget.checked));
    }, [dispatch, todolistId, id]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, id, newValue))
    }, [dispatch, todolistId, id]);


    return (
        <div>
            <Checkbox onChange={onChangeHandler} checked={status === TaskStatuses.Completed}/>
            <EditableSpan value={title} onChange={onTitleChangeHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler} size="small">
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    )
})