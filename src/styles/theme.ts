export const theme = {
  colors: {
    // Controller Body Colors
    joyconL: '#00B2FF',
    joyconR: '#FF3C3C',
    proController: {
      body: '#3a3b3b',
      defaultGrip: '#3a3b3b',
    },
    // Button States
    button: {
      default: '#e9e9e9',
      pressed: '#ff4d4d',
      touchedStroke: '#ffd700',
    },
    // Stick Colors
    stick: {
      fill: '#333',
      stroke: '#555',
    },
    // Misc
    sideRail: '#202228',
  },
  // 他にもフォントサイズや余白など、共通のスタイルを定義できます
};

// themeオブジェクトの型定義（TypeScript用）
export type ThemeType = typeof theme;