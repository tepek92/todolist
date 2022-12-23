import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

// import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {AddItemForm} from "../components/common/AddItemForm";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            action: 'Button inside form clicked',
            description: 'Button clicked inside form'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

// либо
// export default {
//     title: 'Todolist/AddItemForm',
//     component: AddItemForm,
//     argTypes: { addItem: { description: 'Button inside form clicked' } },
// } as ComponentMeta<typeof AddItemForm>;
// // ......
// AddItemsFormExample.args = {
//     addItem: action('Button inside form clicked')
// };


// Normal
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemsFormExample = Template.bind({});
AddItemsFormExample.args = {}; // можно и не писать, т.к. не передаем аргументов дополнительных


// With error title
const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {
    const {addItem} = args;

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>('Title is required');

    const addNewItem = () => {
        if (title.trim() !== "") {
            addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null);
        if (e.key === 'Enter') {
            addNewItem();
        }
    };

    const styleButton = {maxWidth: '30px', maxHeight: '55px', minWidth: '30px', minHeight: '55px', marginLeft: '5px'};

    return <div>
        <TextField
            size='small'
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
            label="Title"
            variant="outlined"
            error={!!error}
            helperText={error}
        />
        <IconButton style={styleButton} color="primary" onClick={addNewItem}>
            <AddBox />
        </IconButton>
    </div>
};
// создаем копию, которая уже отрисовывается стробуком
export const AddItemsWithErrorFormExample = TemplateWithError.bind({});
