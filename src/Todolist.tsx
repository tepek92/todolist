import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);


    // const styleFilter = {maxWidth: '200px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', marginLeft: '5px', paddingRight: '5px'};

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton aria-label="delete" onClick={removeTodolist} size="small">
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""} >
                        <Checkbox onChange={onChangeHandler}  checked={t.isDone}/>

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton aria-label="delete" onClick={onClickHandler} size="small">
                            <DeleteIcon fontSize="inherit"/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button style={{margin: '10px'}} size={"small"} variant={props.filter === 'all' ? "contained" : "outlined"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button style={{margin: '5px'}} size={"small"} color="secondary" variant={props.filter === 'active' ? "contained" : "outlined"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button style={{margin: '5px'}} size={"small"} color="success" variant={props.filter === 'completed' ? "contained" : "outlined"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


