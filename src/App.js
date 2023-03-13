import './App.css';
import {Configuration, OpenAIApi} from "openai"
import {useState} from "react"
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import axios from 'axios';
import {InputText} from "./components/InputText.js"
import {SummarizedText} from "./components/SummarizedText.js"

function App() {
  const [text, setText] = useState("" );
  const [query, setQuery] = useState();
  const [summarizedText, setSummarizedText] = useState("")
  const [questionAnswerText, setQuestionAnswerText] = useState("")
  const [question, setQuestion] = useState("")
  const [passage, setPassage] = useState("")

  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState("");


  const API_KEY = process.env.REACT_APP_API_KEY;
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });

  const openai = new OpenAIApi(configuration)
  
  const handleSummarizeButtonSubmit = (event) => {
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
      setSummarizedText(JSON.stringify(response.data.choices[0]?.text).replace(/\\n/g, ''))
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false); 
    });
};
const handleQuestionAnswerSubmit = (event) => {
  setLoading(true);
    var data = JSON.stringify({
      "model": "text-davinci-003",
      "prompt": generateQuestionAnswerPrompt(question, passage),
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
      setQuestionAnswerText(JSON.stringify(response.data.choices[0]?.text).replace(/\\n/g, ''));
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false); 
    }); 
  }
  function generateSummarizePrompt(text) {
    return `Summarize this: ${text}`
  }
  function generateQuestionAnswerPrompt(question, passage) {
    return `Answer this question: "${question}" from this passage: "${passage}"`
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }; 
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  }
  const handlePassageChange = (event) => {
    setPassage(event.target.value);
  }

  return (
  <div className="App">
    <h1>OpenAI Text Summarizer & Question/Answer</h1>
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
            <InputText label="Enter text to summarize: " onChange={handleTextChange} value={text}/>
            <Button variant="contained" onClick = {handleSummarizeButtonSubmit} disabled={loading}>
              {loading ? "loading...": "Summarize"}
            </Button>
            <SummarizedText summarizedText = {summarizedText}/>
            
          </>
        )}
          {selectedOption === "question-answer" && (
          <>
            <InputText label="Enter question: " onChange={handleQuestionChange} value={question}/>
            <InputText label="Enter passage: " onChange= {handlePassageChange} value={passage}/>
            <Button variant="contained" onClick={handleQuestionAnswerSubmit} disabled={loading}>
              {loading ? "loading...": "Answer"}
            </Button>
            <SummarizedText summarizedText={questionAnswerText} />
            
        </>)}
        </div>
    
    
    </div>  
  );
}


export default App;