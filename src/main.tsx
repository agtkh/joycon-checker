import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './App' // App.tsxからRootをインポート
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)