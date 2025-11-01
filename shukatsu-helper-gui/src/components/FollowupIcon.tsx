export const STATUS = {
  Settings: "settings",
  Amend: "amend",
  Import: "import"
} as const;

type Status = typeof STATUS[keyof typeof STATUS];

//settings, revert, import
const FollowupIcon = ({status}:{status:Status}) => {

  const handleOnclick = ():void => {
    switch(status) {
      case STATUS.Settings:
        break;
      case STATUS.Amend:
        //TODO: 引きはがす
        break;
      case STATUS.Import:
        //TODO: 親から要素を呼び出す
        break;
    }
  };


  return (
    <>
      <span onClick={handleOnclick} className={`${status==STATUS.Import?'import-svg':status==STATUS.Settings?'settings-svg':'amend-svg'}`}></span>
    </>
  );
};

export default FollowupIcon

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