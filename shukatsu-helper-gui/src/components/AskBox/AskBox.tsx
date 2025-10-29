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
    <div className="askbox flex flex-row justify-between bg-black w-full px-[8px] py-1 text-white">
      <input onKeyDown={shootOnEnter} type="text" placeholder={ph}/>
      <span className="mic-svg"></span>
      {/* input内文字が一以上の時、送信ボタンに切り替える */}
      {/* hover時にうっすら白くする */}
      {/* 自身の高さを自動調整 */}
    </div>
  );
}

export default AskBox