// import { useState } from 'react'
import './App.css'
import './assets/reset.css'
import AskBox from './components/AskBox/AskBox'

function App() {
  // const [count, setCount] = useState(0)
  // const appname:string = '就活ヘルパGUI';
  const round:number= 1;
  const totalround:number=10;

  return (
    <>
      <div className="body">
        <span className="toggleBtn"></span>
        <div className="left-pane">
          <span>test</span>
        </div>
        <div className="chat-pane">
          <div className="header">
            <span className="title">就活ヘルパGUI</span>
            <span className="import-svg"></span>
          </div>
          <div className="main">
            <span className="counter">{round}/{totalround}</span>
            <span className="invite-message center">面接練習を始める</span>
          </div>
          <div className="footer">
            <AskBox />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
