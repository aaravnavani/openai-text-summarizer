import './App.css';
import {Configuration, OpenAIApi} from "openai"
import {useState} from "react"
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { FormHelperText } from '@mui/material';
import axios from 'axios';
import {InputText} from "./components/InputText.js"
import {SummarizedText} from "./components/SummarizedText.js"



function App() {
  const [text, setText] = useState("" );
  const [query, setQuery] = useState();
  const [summarizedText, setSummarizedText] = useState("")
  const [questionAnswerText, setQuestionAnswerText] = useState("")

  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState('');
  const [selectedOption, setSelectedOption] = useState("");

  const [InputTextVisible, setInputTextVisible] = useState(false)
  const [SummarizeTextVisible, setSummarizeTextVisible] = useState(false)
  const [QuestionAnswerTextVisible, setQuestionAnswerTextVisible] = useState(false)

  const API_KEY = process.env.REACT_APP_API_KEY;
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });

  const openai = new OpenAIApi(configuration)
  
  const SummarizeButtonSubmit = (event) => {
    setLoading(true);
    var data = JSON.stringify({
      "model": "text-davinci-003",
      "prompt": generateSummarizePrompt(text),
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
      setSummarizedText(JSON.stringify(response.data.choices[0]?.text).replace(/\\n/, ''));
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false); 
    });
  
  
};
const QuestionAnswerSubmit = (event) => {
  setLoading(true);
    var data = JSON.stringify({
      "model": "text-davinci-003",
      "prompt": generateQuestionAnswerPrompt(text),
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
      setQuestionAnswerText(JSON.stringify(response.data.choices[0]?.text).replace(/\\n/, ''));
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false); 
    }); 
}
  
 function generateSummarizePrompt(text) {
    return `Summarize this ${text}`
  }
  function generateQuestionAnswerPrompt(question, passage) {
    return `Answer this question: ${question} from this passage: ${passage}`
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }; 

  return (
  <div className="App">
    <div>
      <Select style={{ marginTop: 50, marginBottom: 50, width:175 }}
      value={selectedOption}
      onChange={handleOptionChange}
      >
        <MenuItem value="summarize-text">Summarize Text</MenuItem>
        <MenuItem value="question-answer">Question and Answer</MenuItem>
        </Select>
          {selectedOption === "summarize-text" && (
          <>
            <InputText label="Enter text to summarize: "/>
            <SummarizedText summarizedText = {summarizedText}/>
            <Button variant="contained" onClick = {SummarizeButtonSubmit} disabled={loading}>
              {loading ? "loading...": "Summarize"}
            </Button>
          </>
        )}
          {selectedOption === "question-answer" && (
          <>
            <InputText label="Enter question: " />
            <InputText label="Enter passage: " />
            <SummarizedText summarizedText={questionAnswerText} />
            <Button variant="contained" onClick = {QuestionAnswerSubmit} disabled={loading}>
              {loading ? "loading...": "Answer"}
            </Button>
        </>)}
        </div>
    
    
    </div>  
  );
}


export default App;