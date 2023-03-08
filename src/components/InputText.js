import TextField from '@mui/material/TextField';
import {useState} from "react"

export function InputText() {
    const [text, setText] = useState("" );
    
    return <div className = "inputText">
    <TextField
    sx={{
        width: { sm: 200, md: 300 },
        "& .MuiInputBase-root": {
            height: 100
        }
    }}
    id="text-input"
    name="name"
    label="Enter the text you want to summarize"
    type="text"
    value={text}
    onChange={(event) => setText(event.target.value)}
    placeholder="Text"
    />
    </div>
}