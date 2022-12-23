import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {AppRootStateType} from "../state/store";
import {useSelector} from "react-redux";
import {Task} from "../components/Todolists/Todolist/Task/Task";
import {TaskBllType} from "../state/reducers/tasks-reducer";


export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
 } as ComponentMeta<typeof Task>;


// если в компоненте есть связь со стором (тут useDispatch), то делаем компоненту обертку.
// она сама дисптачит изменния в стор
const TaskWithRedux = () => {
    const task = useSelector<AppRootStateType, TaskBllType>(state => state.tasks['todolistId1'][0]);
    return <Task todolistId='todolistId1' tasks={task} />;
}

const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskWithRedux />

export const TaskExample = Template.bind({});

