import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI, UpdateTaskType} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((response) => {
                setState(response.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('');

    const addNewTodolist = () => {
        todolistAPI.createTodolist(title)
            .then(response => {
                setState(response.data);
                setTitle('');
            })
    }

    return (
        <div>
            <input placeholder={'title new todolist'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={addNewTodolist}>ADD</button>
            <br/>
            <div>Response:</div>
            {JSON.stringify(state)}
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');


    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then(response => {
                setState(response.data)
                setTodolistId('');
            })
    }

    return (
        <div>
            <input placeholder={'todolist id'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>DELETE</button>
            <br/>
            <div>Response:</div>
            {JSON.stringify(state)}
        </div>
    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const updateTodolist = () => {
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then(response => {
                setState(response.data)
                setTodolistId('');
                setTitle('');
            })
    }

    return (
        <div>
            <input placeholder={'todolist id'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'new title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolist}>UPDATE</button>
            <br/>
            <div>Response:</div>
            {JSON.stringify(state)}
        </div>
    )
}

// =============================

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');


    const getTasks = () => {
        taskAPI.getTask(todolistId)
            .then((response) => {
                setState(response.data);
                setTodolistId('');
            })

    }

    return (
        <div>
            <input placeholder={'todolist id'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={getTasks}>GET TASKS</button>
            <br/>
            <div>Response:</div>
            {JSON.stringify(state)}
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');


    const addNewTask = () => {
        taskAPI.createTask(todolistId, title)
            .then(response => {
                setState(response.data);
                setTodolistId('');
                setTitle('');
            })
    };

    return (
        <div>
            <input placeholder={'todolist id'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'task title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={addNewTask}>ADD TASK</button>
            <br/>
            <div>Response:</div>
            {JSON.stringify(state)}
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');


    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId)
            .then(response => {
                setState(response.data);
                setTodolistId('');
                setTaskId('');
            })
    }

    return (
        <div>
            <input placeholder={'todolist id'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'task id'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>DELETE TASK</button>
            <br/>
            <div>Response:</div>
            {JSON.stringify(state)}
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [title, setTitle] = useState<string>('');


    const updateTask = () => {
        const newTask: UpdateTaskType = {
            title: title,
            description: 'opisanie',
            completed: true,
            status: 1,
            priority: 2,
            startDate: new Date(),
            deadline: new Date(),
        }

        taskAPI.updateTask(todolistId, taskId, newTask)
            .then(response => {
                setState(response.data)
            })
    }

    return (
        <div>
            <input placeholder={'todolist id'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'task id'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input placeholder={'task title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTask}>UPDATE TASK</button>
            <br/>
            <div>Response:</div>
            {JSON.stringify(state)}
        </div>
    )
}

