import React, {memo, useCallback, useEffect} from 'react';
import {EditableSpan} from '../../common/EditableSpan/EditableSpan';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistFilterAC} from "../../../state/actions";
import {FilterValuesType, TodolistBllType} from "../../../state/reducers/todolists-reducer";
import {useAppDispatch, useAppSelector} from "../../../state/hooks";
import {addTaskTC, fetchTasksTC} from "../../../state/thunk/tasks-thunk";
import {TaskStatuses} from "../../../api/task-api";
import {removeTodolistsTC, updateTodolistsTitleTC} from "../../../state/thunk/todolist-thunk";
import {AddItemForm} from "../../common/AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {TaskBllType} from "../../../state/reducers/tasks-reducer";


type PropsType = {
    todolists: TodolistBllType;
}

export const Todolist =  memo((props: PropsType) => {
        // console.log("Todolist called", props.Todolists.title)
        const {id, title, filter, entityStatus} = props.todolists;

        const tasks = useAppSelector<TaskBllType[]>(state => state.tasks[id]);
        const dispatch = useAppDispatch();

        useEffect(() => {
            dispatch(fetchTasksTC(id));
        }, [dispatch, id]);

        const addTaskHandler = useCallback((title: string) => dispatch(addTaskTC(id, title)), [dispatch, id]);

        const removeTodolistHandler = useCallback(() => dispatch(removeTodolistsTC(id)), [dispatch, id]);

        const changeTodolistTitleHandler = useCallback((title: string) =>
            dispatch(updateTodolistsTitleTC(id, title)), [dispatch, id]);

        const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, "all")), [dispatch, id]);
        const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, "active")), [dispatch, id]);
        const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, "completed")), [dispatch, id]);

        const getFilteredTasks = (tasks: TaskBllType[], filter: FilterValuesType): TaskBllType[] => {
            if (filter === "active") {
                return tasks.filter(t => t.status === TaskStatuses.New);
            } else if (filter === "completed") {
                return tasks.filter(t => t.status === TaskStatuses.Completed);
            }
            return tasks;
        };


        const taskElements = getFilteredTasks(tasks, filter).map(t => {
            return <Task
                key={t.id}
                todolistId={id}
                tasks={t}
            />
        });


        return (
            <div>
                <h3>
                    <EditableSpan
                        value={title}
                        onChange={changeTodolistTitleHandler}
                        disabled={entityStatus === 'loading'}
                    />
                    <IconButton
                        aria-label="delete"
                        onClick={removeTodolistHandler}
                        size="small"
                        disabled={entityStatus === 'loading'}
                    >
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </h3>

                <AddItemForm addItem={addTaskHandler} disabled={entityStatus === 'loading'}/>
                <div>{taskElements}</div>

                <div>
                    <ButtonWithMemo
                        color="primary"
                        variant={filter === 'all' ? "contained" : "outlined"}
                        onClickHandler={onAllClickHandler}
                        title={"All"}
                    />

                    <ButtonWithMemo
                        color="secondary"
                        variant={filter === 'active' ? "contained" : "outlined"}
                        onClickHandler={onActiveClickHandler}
                        title={"Active"}
                    />
                    <ButtonWithMemo
                        color="success"
                        variant={filter === 'completed' ? "contained" : "outlined"}
                        onClickHandler={onCompletedClickHandler}
                        title={"Completed"}
                    />
                </div>
            </div>
        )
    });

type ButtonWithMemoType = {
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: 'text' | 'outlined' | 'contained'
    onClickHandler: () => void
    title: string
}

const ButtonWithMemo = memo((props: ButtonWithMemoType) => {
    return (
        <Button style={{margin: '5px'}} size={"small"} color={props.color}
                variant={props.variant}
                onClick={props.onClickHandler}>{props.title}
        </Button>
    )
});