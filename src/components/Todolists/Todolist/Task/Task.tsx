import React, {ChangeEvent, memo, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "../../../common/EditableSpan";
import {TaskStatuses} from "../../../../api/task-api";
import {removeTasksTC, updateTaskTC} from "../../../../state/thunk/tasks-thunk";
import {useAppDispatch} from "../../../../state/hooks";
import {TaskBllType} from "../../../../state/reducers/tasks-reducer";

type TaskPropsType = {
    todolistId: string
    tasks: TaskBllType
}

export const Task = memo((props: TaskPropsType) => {
    const {id, title, status, entityStatus} = props.tasks
    const {todolistId} = props;

    const dispatch = useAppDispatch();

    const onClickHandler = useCallback(() => dispatch(removeTasksTC(todolistId, id)), [dispatch, todolistId, id]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(todolistId, id, {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}));
    }, [dispatch, todolistId, id]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(updateTaskTC(todolistId, id, {title: newValue}))
    }, [dispatch, todolistId, id]);

    const disabledEditableSpan = entityStatus === 'loading' || status === TaskStatuses.Completed;


    return (
        <div>
            <Checkbox
                onChange={onChangeHandler}
                checked={status === TaskStatuses.Completed}
                disabled={entityStatus === 'loading'}
            />
            <EditableSpan
                disabled={disabledEditableSpan}
                value={title}
                onChange={onTitleChangeHandler}
            />
            <IconButton
                aria-label="delete"
                onClick={onClickHandler}
                size="small"
                disabled={entityStatus === 'loading'}
            >
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    )
})