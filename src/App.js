import './App.css';
import {Configuration, OpenAIApi} from "openai"
import {useState} from "react"
import logo from './logo.svg';
import axios from 'axios';

function App() {
  const [text, setText] = useState("" );
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
      <div className="App-header">
        <h1 className="header_text">
          Text <span className="text_active">Summarizer</span>
          </h1>
        <h2 className="header_summary">
          Summarize your text. 
        </h2>
      </div>
      <div className = "container">
        <div className = "text_form">
          <form>
            <label>Enter your text</label>
            <textarea
              rows={14}
              cols={80}
              placeholder = "Enter your text"
              value = {text}
              onChange={(event) => setText(event.target.value)}
            />
          </form>
        </div>
        <div>
          <button type = "button" onClick = {ButtonSubmit}>
            {loading ? "loading...": "Summarize"}
          </button>
        </div>
        <div className = "summarized_text">
          <label>Summarized Text</label>
          <textarea
            placeholder="Summarized Text"
            cols={80}
            rows={14}
            value={summarizedText}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}


export default App;


