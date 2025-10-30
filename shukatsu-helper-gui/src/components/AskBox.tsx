import React from 'react'
import { useState } from 'react'

interface AskBoxProps  {
  submitQuery: (s:string)=>void,
  inputEnabled: boolean;
};

const AskBox = (props:AskBoxProps) => {
  const { submitQuery, inputEnabled } = props;

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
    if(event.shiftKey || event.key!='Enter') return;
    
    if(isTyping) {
      submitQuery(query);
      setQuery("");
    } else {
      //TODO: activate a mouse listening
    }
    //TODO: なんとかcomponent同士を連携させる
  };

  return (
    <div className={`${inputEnabled?'':'cursor-not-allowed'} flex flex-row justify-between bg-black w-full px-[1.5rem] py-[1rem] rounded-[16px] max-w-[660px]`}>
      <input className={`${inputEnabled?'':'pointer-events-none'} placeholder-white text-white flex-grow`} value={inputEnabled?query:'waiting......'} onChange={handleChange} onKeyDown={shootOnEnter} type="text" placeholder={PLACEHOLDER}/>
      <span className={`${isTyping?'send-svg':'mic-svg'} text-white rounded-[999px] bg-black hover:bg-white`}></span>
      {/* 自身の高さを自動調整 */}
    </div>
  );
}

export default AskBox

/*
今朝も上司から叱咤激励
SAN値上々の漠然とした異常
叫びたいほど味のない定食屋のランチ
楽屋裏にはちょっと残念な天才達が屯する踊り場
金もないのにまた無理して買った缶コーヒー
 
夢を見るには程遠い 最果ての愛の飢え
枯れ葉の上でまた寝転んでいる
 
散り際こそ生き様 でもまだ寂しい
溢れ出したら止まらない この涙上品すぎて勿体無いぜ
飾り合ってもきっと晒してる私
例えれば思考焦げ付いた伽藍堂だ
 
懲りずに今日も一蓮托生
有金全部叩いたって即退場
呆れてしまいそうな博打だわアイムソーリー
いかれちゃったわ性と衝動
幼稚な世界からデイドリーム
綺麗事並べて脳内ベンチレーション
 
祈る様に踊っている天竺は雲の上
まともな私は一人で泣いている
 
美しい花に生まれ損なったの
実る程に無様なこの人生 冗談ならば良かったわ
飾り合ってもきっと晒してる私
このままじゃ記憶拗らせるわ螺旋状に
 
散り際こそ生き様 でもまだ寂しい
溢れ出したら止まらない
この涙 上品すぎて勿体無いぜ
飾り合ってもきっと晒してる私
例えれば思考焦げ付いた伽藍堂だ
*/