import React, {ChangeEvent, memo, useState} from 'react';
import TextField from "@mui/material/TextField";
import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled?: boolean
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
    // console.log('EditableSpan called')
    const {value, onChange, disabled} = props;

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(value);
    let [error, setError] = useState<string | null>(null);


    const activateEditMode = () => {
        if (!disabled) {
            setEditMode(true);
            setTitle(value);
        }
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

    const spanStyle = disabled ? s.disabled : ''

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
        : <span className={spanStyle} onDoubleClick={activateEditMode}>{value}</span>
})
