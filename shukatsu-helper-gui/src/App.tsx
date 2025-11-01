import { useRef, useState } from 'react'
import './App.css'
import './assets/reset.css'
import AskBox from './components/AskBox'
import ChatPane from './components/ChatPane'
import FollowupIcon, {STATUS} from './components/FollowupIcon'

function App() {
  const totalRound:number=2;

  const chatRef = useRef<
  {
    handleAnotherPlayerMessage: (s:string, onFinish?:()=>void)=>void,
    poseQuestion: (onFinish?:()=>void)=>void,
    endInterview: (onFinish?:(s:string)=>void)=>void,
  }>(null);

  const [round, setRound] = useState(0);
  const [inputEnabled, setInputEnabled] = useState(false);

  const [chatlog, setChatlog] = useState("");

  const handleQuery = (s:string) => {
    setInputEnabled(false);
    const next = round+1;
    chatRef.current?.handleAnotherPlayerMessage(s, () => {
      if(next<=totalRound) {
        setRound(next);
        chatRef.current?.poseQuestion(()=>setInputEnabled(true));
      } else {
        setRound(next);
        chatRef.current?.endInterview((s:string)=>{
          setChatlog(s);
          console.log("interview is over");
        });
      }
    });
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
        <div className="chat-pane flex flex-col justify-center flex-grow">
          <div className="header">
            <span className="title">就活ヘルパGUI</span>
            <FollowupIcon status={round==0?STATUS.Settings:round<=totalRound?STATUS.Amend:STATUS.Import} />
          </div>
          <div className="main w-full max-w-[800px] flex flex-col self-center">
            <span className={`counter ${round<1 ? 'hidden':''}`}>{Math.min(round, totalRound)}/{totalRound}</span>
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
