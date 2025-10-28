# 就活ヘルパGUI
この[プロジェクト](https://github.com/TrueRyoB/shukatsu-helper)をWebAssemblyで実行します。
音声入力に対応予定。

~~~:model
my-react-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   └── index.js
│   │   └── Header.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html              # Vite entry point
├── package.json
├── vite.config.js          # Vite configuration
└── eslint.config.js        # ESLint configuration
~~~

# TODO
- [ ] Reactで基本的なUIを作る
- [ ] interactiveにする
- [ ] C++を書き直すか、coutを対応させる
- [ ] 音声入力に対応する
- [ ] 返答内容のサマリ出力に対応する
- [ ] オフライン実行に対応する
- [ ] chatgpt連携に対応する