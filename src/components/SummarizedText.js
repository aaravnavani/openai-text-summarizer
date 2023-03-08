import TextField from '@mui/material/TextField';
import {useState} from "react"


export function SummarizedText() {
    const [text, setText] = useState("" );
    return (
    <div className = "summarizedText">
        <TextField
        sx={{
        width: { sm: 200, md: 300 },
        "& .MuiInputBase-root": {
            height: 100
        }
      }}
      id="summarized-text"
      name="name"
      label="Summarized Text" 
      type="text"
      value={text}
      onChange={(event) => setText(event.target.value)}
      placeholder="Text"
      />
    </div>
    )
}