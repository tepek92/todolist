import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {TodolistWithRedux} from '../components';
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {AppRootStateType} from "../state/store";
import {useSelector} from "react-redux";
import {TodolistBllType} from "../state/reducers/todolistsReducer";


export default {
    title: 'Todolist/Todolist',
    component: TodolistWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TodolistWithRedux>;


// если в компоненте есть связь со стором (тут useDispatch), то делаем компоненту обертку.
// она сама дисптачит изменния в стор
const TodolistContainer = () => {
    const todolists = useSelector<AppRootStateType, TodolistBllType>(state => state.todolists[0]);
    return <TodolistWithRedux todolists={todolists}/>;
}

const Template: ComponentStory<typeof TodolistContainer> = (args) => <TodolistContainer />

export const TodolistExample = Template.bind({});
