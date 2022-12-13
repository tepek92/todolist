import React, {memo, useCallback, useEffect} from 'react';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {ChangeTodolistFilterAC} from "../state/actions";
import {AddItemForm, Task} from "./";
import {FilterValuesType, TodolistBllType} from "../state/reducers/todolistsReducer";
import {useAppDispatch, useAppSelector} from "../state/hooks";
import {addTaskTC, fetchTasksTC} from "../state/thunk/tasksThunk";
import {TaskStatuses, TaskType} from "../api/task-api";
import {removeTodolistsTC, updateTodolistsTitleTC} from "../state/thunk/todolistThunk";


type PropsType = {
    todolists: TodolistBllType;
}

export const TodolistWithRedux =  memo((props: PropsType) => {
        // console.log("Todolist called", props.todolists.title)
        const {id, title, filter} = props.todolists;

        // при добавлениее нового тудулиста будут отрисоываваться все
        // так как тут мы зависим от объекта тасок(всех),а он меняется т.к. добавлись новый массив(пустой)
        // const tasks = useSelector<AppRootStateType, TasksStateType>(tasksSelector)[id];

        // а тут мы зависим от конкретного массива тасок, кокретного тудулиста
        const tasks = useAppSelector<TaskType[]>(state => state.tasks[id]);
        const dispatch = useAppDispatch();

        useEffect(() => {
            dispatch(fetchTasksTC(id));
        }, [dispatch, id]);

        const addTaskHandler = useCallback((title: string) => dispatch(addTaskTC(id, title)), [dispatch, id]);

        const removeTodolistHandler = useCallback(() => dispatch(removeTodolistsTC(id)), [dispatch, id]);

        const changeTodolistTitleHandler = useCallback((title: string) =>
            dispatch(updateTodolistsTitleTC(id, title)), [dispatch, id]);

        const onAllClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(id, "all")), [dispatch, id]);
        const onActiveClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(id, "active")), [dispatch, id]);
        const onCompletedClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(id, "completed")), [dispatch, id]);

        const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
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
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                    <IconButton aria-label="delete" onClick={removeTodolistHandler} size="small">
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </h3>

                <AddItemForm addItem={addTaskHandler}/>
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