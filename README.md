# Nintendo Switch Controller Checker

<details>
<summary><strong>English</strong></summary>

## Description

This is a web-based tool for testing the functionality of Nintendo Switch controllers (Joy-Con, Pro Controller) connected to a PC or tablet via Bluetooth. It provides a visual representation of the controller and highlights inputs in real-time, allowing for a comprehensive operational check.

This application is built using only the standard Gamepad API, ensuring broad browser compatibility without the need for more experimental technologies like the WebHID API.

## Live Demo

You can try the application here:  
**https://agtkh.github.io/joycon-checker/**

## Features

- **Real-time Input Visualization**: Instantly visualizes button presses and analog stick movements on the SVG representation of the controller.
- **Multiple Controller Support**: Compatible with Pro Controller, Joy-Con (L) sideways, Joy-Con (R) sideways, and paired Joy-Cons (L+R).
- **Stick Accuracy Test**: Displays guide lines (crosshair and circle) to check if the analog sticks return to the zero point and can draw a perfect circle at maximum input. The guide circle's color changes upon reaching the maximum input range.
- **Button Input History**: Logs pressed buttons in order, allowing you to review the input sequence. The log has a maximum capacity, with older entries being removed as new ones are added.
- **Customizable Colors**: Allows users to manually set the colors for the controller body, buttons, and grips (for Pro Controller) via a settings modal.
- **Connection Guide**: Provides tutorials on how to pair controllers with different operating systems (Windows, iPadOS, macOS).
- **Multilingual Support**: The user interface supports both Japanese and English.

## Technology Stack

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: styled-components
- **State Management**: Zustand
- **Internationalization**: react-i18next
- **Core API**: Gamepad API

## Disclaimer

Nintendo Switch, Joy-Con, and Pro Controller are trademarks of Nintendo. This application is a personal project and is not affiliated with, sponsored, or endorsed by Nintendo.

## Author

- **K.Agata**
- **GitHub**: [https://github.com/agtkh](https://github.com/agtkh)

</details>

<hr>

<details open>
<summary><strong>日本語</strong></summary>

## 概要

本アプリケーションは、PCやタブレットにBluetooth接続されたNintendo Switch用コントローラー（Joy-Con、Proコントローラー）の動作をテストするためのWebツールである。コントローラーの入力をリアルタイムで視覚的に表示し、ボタンやスティックの包括的な動作確認を可能にする。

本アプリケーションは、標準のGamepad APIのみを利用して構築されており、WebHID APIのような実験的な技術を使用せず、幅広いブラウザでの互換性を確保している。

## デモサイト

アプリケーションはこちらで利用可能である:  
**https://agtkh.github.io/joycon-checker/**

## 主な機能

- **リアルタイム入力表示**: 押されたボタンやアナログスティックの動きを、コントローラーのSVG上に即座に反映させる。
- **複数コントローラー対応**: Proコントローラー、Joy-Con(L)単体（横持ち）、Joy-Con(R)単体（横持ち）、両方のJoy-Conをペアリングした状態に対応している。
- **スティック精度チェック**: スティックがゼロ点に戻っているか、また最大まで倒した際に綺麗な円を描けるかを確認するための補助線（十字線とガイドサークル）を表示する。最大入力範囲に到達するとガイドの色が変化する。
- **ボタン入力履歴**: 押されたボタンを順番にログとして表示する。ログは最大保持数を超えると、古いものから削除される。
- **カラー設定機能**: 設定モーダルを通じて、ユーザーが手動でコントローラーの本体、ボタン、グリップ（Proコントローラーのみ）の色を自由に変更できる。
- **接続ガイド**: 各OS（Windows, iPadOS, macOS）でのコントローラーのペアリング方法を案内するチュートリアルを備えている。
- **多言語対応**: UIは日本語と英語の両方に対応している。

## 使用技術

- **フレームワーク**: React (Vite)
- **言語**: TypeScript
- **スタイリング**: styled-components
- **状態管理**: Zustand
- **国際化**: react-i18next
- **コアAPI**: Gamepad API

## 免責事項

Nintendo Switch、Joy-Con、Proコントローラーは任天堂の登録商標である。このアプリケーションは個人が開発したものであり、任天堂株式会社が承認、後援、その他関与するものではない。

## 作者

- **K.Agata**
- **GitHub**: [https://github.com/agtkh](https://github.com/agtkh)

</details>