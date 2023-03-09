import TextField from '@mui/material/TextField';
import {useState} from "react"

export function InputText({label}) {
    const [text, setText] = useState("" );
    
    return <div className = "inputText">
    <TextField
    sx={{
        width: { md: 500, marginBottom:50},
        "& .MuiInputBase-root": {
            height: 300
        }
    }}
    multiline
    rows={10}
    id="text-input"
    name="name"
    label={label}
    type="text"
    value={text}
    onChange={(event) => setText(event.target.value)}
    placeholder="Text"
    />
    </div>
}