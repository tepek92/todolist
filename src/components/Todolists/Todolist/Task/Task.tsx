import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../common/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../../../../api/task-api";
import {removeTasksTC, updateTaskTC} from "../../../../state/thunk/tasks-thunk";
import {useAppDispatch} from "../../../../state/hooks";

type TaskPropsType = {
    todolistId: string
    tasks: TaskType
}

export const Task = memo((props: TaskPropsType) => {
    const {id, title, status} = props.tasks
    const {todolistId} = props;

    const dispatch = useAppDispatch();

    const onClickHandler = useCallback(() => dispatch(removeTasksTC(todolistId, id)), [dispatch, todolistId, id]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(todolistId, id, {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}));
    }, [dispatch, todolistId, id]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(updateTaskTC(todolistId, id, {title: newValue}))
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