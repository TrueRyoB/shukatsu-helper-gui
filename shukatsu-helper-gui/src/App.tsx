// import { useState } from 'react'
import './App.css'
import './assets/reset.css'
import React from 'react';

function App() {
  // const [count, setCount] = useState(0)
  // const appname:string = '就活ヘルパGUI';
  const round:number= 1;
  const totalround:number=10;

  const placeholder:string="Answer Anything";

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.shiftKey && event.key === 'Enter') {
      console.log('Message delivered');
      //TODO:
      return;
    }

    if(event.key === 'Escape') event.preventDefault();
  }

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
            <div className="chatbox">
              <input onKeyDown={handleKeyPress} type="text" className="user-input" placeholder={placeholder} />
              <span className="mic-svg"></span>
              {/* input内文字が一以上の時、送信ボタンに切り替える */}
              {/* hover時にうっすら白くする */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
