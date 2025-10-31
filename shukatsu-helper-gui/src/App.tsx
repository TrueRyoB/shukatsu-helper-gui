import { useRef, useState } from 'react'
import './App.css'
import './assets/reset.css'
import AskBox from './components/AskBox'
import ChatPane from './components/ChatPane'

function App() {
  const totalRound:number=10;

  const chatRef = useRef<
  {
    handleAnotherPlayerMessage: (s:string, onFinish?:()=>void)=>void,
    poseQuestion: (onFinish?:()=>void)=>void,
  }>(null);

  const [round, setRound] = useState(0);
  const [inputEnabled, setInputEnabled] = useState(false);

  const handleQuery = (s:string) => {
    setInputEnabled(false);
    setRound(round+1);
    if(round<=totalRound) {
        chatRef.current?.handleAnotherPlayerMessage(s, () => {
        chatRef.current?.poseQuestion(()=>setInputEnabled(true));
      });
    }
  };

  const startInterview = async():Promise<void> => {
    setRound(1);
    chatRef.current?.poseQuestion(()=>setInputEnabled(true));
  };

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
            <span className={`counter ${round<1 ? 'hidden':''}`}>{round}/{totalRound}</span>
            <span onClick={startInterview} className={`${round<1?'center cursor-pointer':''} text-3xl`}>面接練習を始める</span>
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
