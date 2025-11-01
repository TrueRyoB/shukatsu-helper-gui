import {useState, useCallback, useImperativeHandle, forwardRef, useEffect, useRef} from 'react'
import {getRandomInt} from '../utils/math'
import {getFileContextAsync, pickRandom} from '../utils/parse'

type Message = {
  isInterviewer:boolean,
  content:string;
};

const ChatPane = forwardRef((_, ref) => {
  const [onlive, setOnlive] = useState<Message[]>([]);
  const onliveRef = useRef<Message[]>([]);

  useEffect(()=> {
    onliveRef.current = onlive;
  }, [onlive]);

  const bpause=40;
  const pauseMap : Record<string, number> = {
    "、": 200,
    ", ": 200,
    "!": 300,
    "?": 300,
    ".": 300,
    "。": 400,
  };

  // type Narrator = Message | {speed: number};
  const playMessage = async (msg: Message, speed: number, onFinish?: ()=>void): Promise<void> => {
    if(speed==0) {
      setOnlive((prev)=>[...prev, msg]);
      onFinish?.(); return;
    }

    setOnlive((prev)=>[...prev, {isInterviewer:msg.isInterviewer, content:""}]);

    const steps = [
      {count: msg.isInterviewer?getRandomInt(3, Math.min(8, msg.content.length-1)):0, char:'.' },
      {count: msg.content.length, char:msg.content }
    ];

    const updateContent = (prev: Message[], i:number, c:string):Message[] => {
      const newArr = [...prev];
      const index = newArr.length-1;
      newArr[index] = {
        ...newArr[index],
        content: newArr[index].content.length<i ? newArr[index].content+c : newArr[index].content.slice(0, i)+c+newArr[index].content.slice(i+1),
      };
      return newArr;
    };

    for(const step of steps) for(let i=0; i<step.count; ++i) {
      const c = step.char.length==1 ? step.char : step.char[i];
      setOnlive(prev=>updateContent(prev, i, c));
      await new Promise(res => setTimeout(res, (pauseMap[c]??bpause)/speed));
    }
    onFinish?.();
  };
  
  const handleAnotherPlayerMessage = useCallback(
    async (s:string, onFinish?: ()=>void) => {
      await playMessage({isInterviewer:false, content:s}, 0, onFinish);
    },
    [onlive.length]
  );

  type Generator = {
    poseQuestion(): Promise<boolean>,
    readonly shouldScroll: boolean,
    endInterview(): Promise<void>;
  }
  //TODO: lastが最後の質問であれば、ありがとうございます。で締めて、ターンを継続する
  const createQuestionGenerator = (): Generator => {
    let cnter:number = 0;
    let nhukabori:number = 0;

    return {
      async poseQuestion(onFinish?:()=>void):Promise<boolean> {
        let text:string="";
        if(cnter==0) {
          nhukabori=getRandomInt(0, 3);
          text = pickRandom(await getFileContextAsync()('/shukatsu-helper-gui/data/questions.txt'));
          ++cnter;
        } else if(cnter<nhukabori) {
          ++cnter;
          text = pickRandom(await getFileContextAsync()('/shukatsu-helper-gui/data/hukabori.txt'));
        } else {
          text = "ありがとうございます。";
        }

        await playMessage({isInterviewer:true, content:text}, 1, onFinish);
        
        if(cnter==nhukabori) {
          cnter=0; return true;
        }
        return false;
      },
      get shouldScroll():boolean {
        return cnter==0;
      },
      async endInterview(onFinish?:(s:string)=>void):Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 0));
        const res:string = onliveRef.current.map((msg:Message)=>(msg.isInterviewer?'Q:':'A:')+msg.content).join('\n');
        await playMessage({isInterviewer:true, content:"これで、本日の面接練習は以上となります。貴重なお時間をいただきまして、ありがとうございました。"}, 1, ()=>{});
        onFinish?.(res);
      }
    };
  };

  const gen = createQuestionGenerator();

  useImperativeHandle(ref, ()=> ({
    handleAnotherPlayerMessage,
    poseQuestion: gen.poseQuestion,
    endInterview: gen.endInterview,
  }));

  return (
    <>
    {
      onlive.map((msg:Message, i:number)=>(
        <div key={i} className={`${msg.isInterviewer?'text-blue-500 text-left':'text-black justify-end text-right'} flex flex-row flex-wrap`}>
          {msg.content}
        </div>
      ))
    }
    </>
  )
});

export default ChatPane

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