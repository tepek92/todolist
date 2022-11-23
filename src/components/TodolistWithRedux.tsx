import React, {memo, useCallback} from 'react';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, AddTaskAC} from "../state/actions";
import {FilterValuesType, TasksStateType, TodolistType} from "../AppWithRedux";
import {tasksSelector} from "../state/selectors";
import {AddItemForm, Task} from "./";

export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolists: TodolistType;
}

export const TodolistWithRedux
    = memo((props: PropsType) => {
        console.log("Todolist called", props.todolists.title)
        const {id, title, filter} = props.todolists;

        // const tasks = useSelector<AppRootStateType, TasksStateType>(tasksSelector)[id];
        const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id]);
        const dispatch = useDispatch();

        const addTaskHandler = useCallback((title: string) => dispatch(AddTaskAC(id, title)), [dispatch, id]);
        const removeTodolistHandler = useCallback(() => dispatch(RemoveTodolistAC(id)), [dispatch, id]);
        const changeTodolistTitleHandler = useCallback((title: string) =>
            dispatch(ChangeTodolistTitleAC(id, title)), [dispatch, id]);

        const onAllClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(id, "all")), [dispatch, id]);
        const onActiveClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(id, "active")), [dispatch, id]);
        const onCompletedClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(id, "completed")), [dispatch, id]);

        const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
            if (filter === "active") {
                return tasks.filter(t => !t.isDone);
            } else if (filter === "completed") {
                return tasks.filter(t => t.isDone);
            }
            return tasks;
        };

        const taskElements = getFilteredTasks(tasks, filter).map(t => {
            return <Task
                key={t.taskId}
                todolistId={id}
                tasks={t}
            />
        });

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
        )
    }
);