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
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('APP TODOLIST')
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = '13c5ab84-8367-4364-b726-4d5d53af93ec'

    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = '1fb2f090-9a14-4f72-af53-c90849f0e47b'

    useEffect(() => {
        todolistAPI.updateTodolistTitle(todolistId, 'NAME')
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}




export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = '1fb2f090-9a14-4f72-af53-c90849f0e47b'

    useEffect(() => {
        taskAPI.getTask(todolistId)
            .then((response) => {
                setState(response.data);
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = '1fb2f090-9a14-4f72-af53-c90849f0e47b'

    useEffect(() => {
        taskAPI.createTask(todolistId,'Task testing')
            .then(response => {

                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = '1fb2f090-9a14-4f72-af53-c90849f0e47b'
    const taskId = 'b83f39d4-6e27-4b1b-bbb9-ac5bc02e7056'

    useEffect(() => {
        taskAPI.deleteTask(todolistId, taskId)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = '1fb2f090-9a14-4f72-af53-c90849f0e47b'
    const taskId = 'af8124f6-62e5-43ba-aa88-4adeb11a7d0c'
    const newTask: UpdateTaskType = {
        title: 'TEST TEST',
        description: 'opisanie',
        completed: true,
        status: 1,
        priority: 2,
        startDate: new Date(),
        deadline: new Date(),
    }

    useEffect(() => {
        taskAPI.updateTask(todolistId, taskId, newTask)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

