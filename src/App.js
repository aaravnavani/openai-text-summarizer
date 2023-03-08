import './App.css';
import {Configuration, OpenAIApi} from "openai"
import {useState} from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import logo from './logo.svg';
import axios from 'axios';

function App() {
  const [text, setText] = useState("" );
  const [query, setQuery] = useState();
  const [summarizedText, setSummarizedText] = useState("")
  const [loading, setLoading] = useState(false)

  const API_KEY = process.env.REACT_APP_API_KEY;

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });

  const openai = new OpenAIApi(configuration)
  
  const ButtonSubmit = (event) => {
    var data = JSON.stringify({
      "model": "text-davinci-003",
      "prompt": generatePrompt(text),
      "max_tokens": 1024,
      "temperature": 0
    });
    
    var config = {
      method: 'post',
      url: 'https://api.openai.com/v1/completions',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${API_KEY}`, 
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      setSummarizedText(JSON.stringify(response.data.choices[0]?.text));
    })
    .catch(function (error) {
      console.log(error);
    });

  };
  
 function generatePrompt(text) {
    return `Summarize this ${text}`
  }



  return (
    <div className="App">
      <Select value={2} style={{ marginTop: 100, marginLeft: 100 }}>
      <MenuItem value={1}>Jan</MenuItem>
      <MenuItem value={2}>Feb</MenuItem>
      <MenuItem value={3}>March</MenuItem>
      <MenuItem value={4}>April</MenuItem>
      <MenuItem value={5}>May</MenuItem>
    </Select>
<div className = "input-text">
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
      <div className = "summarize-button">
        <Button variant="contained" onClick = {ButtonSubmit}>
          {loading ? "loading...": "Summarize"}
        </Button>
      </div>
      <div className = "summarizedext">
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
    </div>    
  );
}


export default App;


