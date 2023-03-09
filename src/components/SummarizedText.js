import TextField from '@mui/material/TextField';
import {useState} from "react"


export function SummarizedText({summarizedText}) {
    const [text, setText] = useState(summarizedText || "");

    return (
    <div className = "summarizedText">
        <TextField
        sx={{
        width: {md: 500, marginTop: 30 },
        "& .MuiInputBase-root": {
            height: 300
        }
      }}
      multiline
      rows={10}
      id="summarized-text"
      name="name"
      label="Summarized Text" 
      type="text"
      value={summarizedText}
      onChange={(event) => setText(event.target.value)}
      placeholder="Text"
      />
    </div>
    )
}