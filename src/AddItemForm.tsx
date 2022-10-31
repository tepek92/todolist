import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const {addItem} = props;

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

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
        setError(null);
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
}
