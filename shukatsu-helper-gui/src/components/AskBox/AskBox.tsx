import './AskBox.css'
import React from 'react'

const AskBox = () => {

  const ph:string = "Answer Anything";

  const shootOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key=='Escape') {
      event.preventDefault(); return;
    }
    if(!event.shiftKey || event.key!='Enter') return;
    //TODO: なんとかcomponent同士を連携させる
  };

  return (
    <div className="askbox flex flex-row justify-between bg-black w-full px-[1.5rem] py-[1rem] rounded-[16px]">
      <input className="text-white placeholder-white flex-grow" onKeyDown={shootOnEnter} type="text" placeholder={ph}/>
      <span className="mic-svg text-white"></span>
      {/* input内文字が一以上の時、送信ボタンに切り替える */}
      {/* hover時にうっすら白くする */}
      {/* 自身の高さを自動調整 */}
    </div>
  );
}

export default AskBox