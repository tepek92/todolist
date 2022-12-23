import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {AppRootStateType} from "../state/store";
import {useSelector} from "react-redux";
import {TodolistBllType} from "../state/reducers/todolists-reducer";
import {Todolist} from "../components/Todolists/Todolist/Todolist";


export default {
    title: 'Todolist/Todolist',
    component: Todolist,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Todolist>;


// если в компоненте есть связь со стором (тут useDispatch), то делаем компоненту обертку.
// она сама дисптачит изменния в стор
const TodolistContainer = () => {
    const todolists = useSelector<AppRootStateType, TodolistBllType>(state => state.todolists[0]);
    return <Todolist todolists={todolists}/>;
}

const Template: ComponentStory<typeof TodolistContainer> = (args) => <TodolistContainer />

export const TodolistExample = Template.bind({});
