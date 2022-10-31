import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const {value, onChange} = props;

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(value);
    let [error, setError] = useState<string | null>(null);


    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    }
    const activateViewMode = () => {
        if (title.trim() !== '') {
            setEditMode(false);
            onChange(title);
        } else {
            setError("Title is required")
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField
            size='small'
            value={title}
            onChange={changeTitle}
            autoFocus
            onBlur={activateViewMode}
            variant="standard"
            error={!!error}
            helperText={error}
        />
        : <span onDoubleClick={activateEditMode}>{value}</span>
}
