import { useRef } from 'react'
import './App.css'
import './assets/reset.css'
import AskBox from './components/AskBox'
import ChatPane from './components/ChatPane'

function App() {
  const round:number= 1;
  const totalround:number=10;

  const chatRef = useRef<{handleAnotherPlayerMessage: (s:string, onFinish?:()=>void)=>void}>(null);

  const handleQuery = (s:string) => {
    chatRef.current?.handleAnotherPlayerMessage(s, () => {
      console.log("text inserted");
    });
  };

  const inputEnabled:boolean=true;

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
            {/* <span className="invite-message center">面接練習を始める</span> */}
            <ChatPane ref={chatRef} />
          </div>
          <div className="footer">
            <AskBox submitQuery={handleQuery} inputEnabled={inputEnabled} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
