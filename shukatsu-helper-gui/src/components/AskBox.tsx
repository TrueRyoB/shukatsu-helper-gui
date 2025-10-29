import React from 'react'
import { useState } from 'react'

const AskBox = () => {
  const PLACEHOLDER:string = "自信を持って！";

  const [query, setQuery] = useState("");
  const isTyping:boolean = query.length>0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const shootOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key=='Escape') {
      event.preventDefault(); return;
    }
    // TODO: input内の入力文字を読み取るように仕向ける
    if(!event.shiftKey || event.key!='Enter') return;
    
    if(isTyping) {
      handleSubmit();
    } else {
      //TODO: activate a mouse listening
    }
    //TODO: なんとかcomponent同士を連携させる
  };

  const handleSubmit = () => {
    //TODO: do something
  }

  return (
    <div className="askbox flex flex-row justify-between bg-black w-full px-[1.5rem] py-[1rem] rounded-[16px]">
      <input className="text-white placeholder-white flex-grow" value={query} onChange={handleChange} onKeyDown={shootOnEnter} type="text" placeholder={PLACEHOLDER}/>
      <span className={(isTyping?'send-svg':'mic-svg') + " text-white"}></span>
      {/* input内文字が一以上の時、送信ボタンに切り替える */}
      {/* hover時にうっすら白くする */}
      {/* 自身の高さを自動調整 */}
    </div>
  );
}

export default AskBox