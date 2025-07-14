// OSの種別を定義
export type OSType = 'Windows' | 'Mac' | 'iPadOS' | 'iOS' | 'Android' | 'Unknown';

/**
 * ユーザーエージェントからOSを判定する
 * @returns {OSType} OSの種別
 */
export const getOS = (): OSType => {
  const ua = window.navigator.userAgent;
  const platform = window.navigator.platform;

  if (/(iPad|iPhone|iPod)/.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      return 'iPadOS'; // iPadOS 13以降はMacとして認識されるため、タッチポイントも確認
  }
  if (/(iPhone|iPod)/.test(ua)) {
      return 'iOS';
  }
  if (ua.includes('Win')) {
      return 'Windows';
  }
  if (ua.includes('Mac')) {
      return 'Mac';
  }
   if (ua.includes('Android')) {
      return 'Android';
  }
  return 'Unknown';
};