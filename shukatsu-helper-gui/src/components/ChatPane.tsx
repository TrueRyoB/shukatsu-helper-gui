import {useState, useCallback, useImperativeHandle, forwardRef} from 'react'

type Message = {
  isInterviewer:boolean,
  content:string;
};

const ChatPane = forwardRef((_, ref) => {
  const [onlive, setOnlive] = useState<Message[]>([]);
  
  const insertNewPlayerMessage = useCallback(
    async (s:string, onFinish?: ()=>void) => {
      setOnlive((prev)=>[...prev, {isInterviewer: false, content: ""}]);
      const index = onlive.length;
      
      for(let i=0; i<s.length; ++i) {
        setOnlive((prev)=> {
          const newArr = [...prev];
          newArr[index]= {
            ...newArr[index],
            content: newArr[index].content+s[i],
          };
          return newArr;
        })
        await new Promise((res)=>setTimeout(res, 30));
      }

      onFinish?.();
    },
    [onlive.length]
  );

  useImperativeHandle(ref, ()=> ({
    insertNewPlayerMessage,
  }));

  return (
    <>
    {
      onlive.map((msg:Message, i:number)=>(
        <div key={i} className={`${msg.isInterviewer?'text-blue-500':''} flex flex-row flex-wrap`}>
          {msg.content}
        </div>
      ))
    }
    </>
  )
});

export default ChatPane