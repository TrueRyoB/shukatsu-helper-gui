import { useRef, useState } from 'react'
import './App.css'
import './assets/reset.css'
import AskBox from './components/AskBox'
import ChatPane from './components/ChatPane'
import FollowupIcon, {STATUS} from './components/FollowupIcon'

function App() {
  const totalRound:number=5;

  const chatRef = useRef<
  {
    handleAnotherPlayerMessage: (s:string, onFinish?:()=>void)=>void,
    poseQuestion: (onFinish?:()=>void)=>Promise<boolean>,
    endInterview: (onFinish?:(s:string)=>void)=>void,
  }>(null);

  const [round, setRound] = useState(0);
  const [inputEnabled, setInputEnabled] = useState(false);

  //TODO: 本当だったら、poseQuestionからtrueかfalseを受け取るべき
  const handleQuery = (s:string) => {
    setInputEnabled(false);
    const next = round+1;
    chatRef.current?.handleAnotherPlayerMessage(s, () => {
      if(next<=totalRound) {
        if(chatRef.current==null) return;
        chatRef.current!.poseQuestion(()=> setInputEnabled(true)).then(moveOn=> {
          if(moveOn) setRound(next);
        });
      } else {
        setRound(next);
        chatRef.current?.endInterview((s:string)=>{
          console.log("interview is over");
          console.log("log:\n",s);
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
