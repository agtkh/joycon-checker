/**
 * HEXカラーコードをRGBオブジェクトに変換する
 * @param hex - #RRGGBB形式のカラーコード
 * @returns {{r: number, g: number, b: number} | null}
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * 指定されたHEXカラーの補色（反対色）を返す
 * @param hex - #RRGGBB形式のカラーコード
 * @returns {string} 補色のHEXカラーコード
 */
export const getComplementaryColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000000'; // 不正な場合は黒を返す

  const r = (255 - rgb.r).toString(16).padStart(2, '0');
  const g = (255 - rgb.g).toString(16).padStart(2, '0');
  const b = (255 - rgb.b).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
};

/**
 * 指定されたHEXカラーに対して、読みやすい対照色（白または黒）を返す
 * @param hex - #RRGGBB形式のカラーコード
 * @returns {"#000000" | "#FFFFFF"} 黒または白のHEXカラーコード
 */
export const getContrastColor = (hex: string): '#000000' | '#FFFFFF' => {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#FFFFFF';

  // YIQ式を用いて輝度を計算
  const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

  // 輝度が128以上なら暗い色（黒）、未満なら明るい色（白）を返す
  return yiq >= 128 ? '#000000' : '#FFFFFF';
};