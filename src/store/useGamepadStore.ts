import { create } from 'zustand';

// ボタンの状態
interface ButtonState {
  pressed: boolean;
  touched: boolean; // 一度でも押されたか
}

// スティックの状態
interface StickState {
  x: number;
  y: number;
}

// コントローラーの状態
export interface GamepadState {
  id: string; // コントローラーの識別ID
  index: number; // Gamepad APIにおけるインデックス
  buttons: ButtonState[];
  axes: StickState[];
  bodyColor?: string;
  buttonColor?: string;
  leftGripColor?: string;
  rightGripColor?: string;
}

// ログの最大表示数
const MAX_LOG_SIZE = 5;

// ストア全体の型定義
export interface GamepadStore {
  gamepads: Record<number, GamepadState>;
  addGamepad: (gamepad: Gamepad) => void;
  removeGamepad: (index: number) => void;
  updateGamepadState: (gamepad: Gamepad) => void;
  resetTouchedState: (gamepadIndex: number) => void;
  setGamepadColor: (gamepadIndex: number, colors: { bodyColor: string; buttonColor: string; leftGripColor: string; rightGripColor: string }) => void;
  buttonPressLog: { name: string; id: number }[]; // ログの配列
  logButtonPush: (buttonName: string) => void; // ログを追加するアクション
}

// 0.1未満の入力はノイズとして無視（デッドゾーン）
const DEAD_ZONE = 0.1;

// Zustandストアの作成
export const useGamepadStore = create<GamepadStore>((set, get) => ({
  gamepads: {},

  // コントローラーが接続されたとき
  addGamepad: (gamepad) => {
    set((state) => ({
      gamepads: {
        ...state.gamepads,
        [gamepad.index]: {
          id: gamepad.id,
          index: gamepad.index,
          buttons: gamepad.buttons.map(() => ({ pressed: false, touched: false })),
          axes: Array(Math.ceil(gamepad.axes.length / 2)).fill(0).map(() => ({ x: 0, y: 0 })),
        },
      },
    }));
  },

  // コントローラーが切断されたとき
  removeGamepad: (index) => {
    set((state) => {
      const newGamepads = { ...state.gamepads };
      delete newGamepads[index];
      return { gamepads: newGamepads };
    });
  },

  // コントローラーの状態を毎フレーム更新
  updateGamepadState: (gamepad) => {
    const { gamepads } = get();
    const currentGamepad = gamepads[gamepad.index];
    if (!currentGamepad) return;

    // ボタンの状態を更新
    const newButtons = gamepad.buttons.map((button, i) => ({
      pressed: button.pressed,
      touched: currentGamepad.buttons[i].touched || button.pressed,
    }));

    // スティックの状態を更新
    const newAxes = currentGamepad.axes.map((_, i) => {
      const x = gamepad.axes[i * 2] || 0;
      const y = gamepad.axes[i * 2 + 1] || 0;
      return {
        x: Math.abs(x) > DEAD_ZONE ? x : 0,
        y: Math.abs(y) > DEAD_ZONE ? y : 0,
      };
    });

    set((state) => ({
      gamepads: {
        ...state.gamepads,
        [gamepad.index]: {
          ...currentGamepad,
          buttons: newButtons,
          axes: newAxes,
        },
      },
    }));
  },

  // チェック済み状態をリセット
  resetTouchedState: (gamepadIndex) => {
    const { gamepads } = get();
    const currentGamepad = gamepads[gamepadIndex];
    if (!currentGamepad) return;

    const resetButtons = currentGamepad.buttons.map(btn => ({ ...btn, touched: false }));

    set(state => ({
      gamepads: {
        ...state.gamepads,
        [gamepadIndex]: {
          ...currentGamepad,
          buttons: resetButtons,
        }
      }
    }));
  },

  setGamepadColor: (gamepadIndex, colors) => {
    set(state => {
      const gamepad = state.gamepads[gamepadIndex];
      if (!gamepad) return state;
      return {
        gamepads: {
          ...state.gamepads,
          [gamepadIndex]: {
            ...gamepad,
            bodyColor: colors.bodyColor,
            buttonColor: colors.buttonColor,
            leftGripColor: colors.leftGripColor,
            rightGripColor: colors.rightGripColor
          }
        }
      };
    });
  },
  buttonPressLog: [], // 初期値は空の配列
  logButtonPush: (buttonName: string) => {
    set(state => {
      // 新しいログエントリを作成（ユニークなIDを付与）
      const newLogEntry = { name: buttonName, id: Date.now() + Math.random() };
      
      // 新しいログ配列を作成
      const updatedLog = [...state.buttonPressLog, newLogEntry];

      // ログが最大数を超えたら、最も古いものを削除
      if (updatedLog.length > MAX_LOG_SIZE) {
        updatedLog.shift(); // 配列の先頭を削除
      }

      return { buttonPressLog: updatedLog };
    });
  }
}));