import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddBox from "@mui/icons-material/AddBox";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    // console.log('AddItemForm called')
    const {addItem, disabled} = props;

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
        error && setError(null);
        if (e.key === 'Enter') {
            addNewItem();
        }
    };
    const styleButton = {width: '40px', height: '40px', marginLeft: '5px'};
    const styleTextField = {marginBottom: '10px'}

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
            disabled={disabled}
            style={styleTextField}
        />
        <IconButton style={styleButton} color="primary" onClick={addNewItem} disabled={disabled}>
            <AddBox />
        </IconButton>
    </div>
})