import { renderIcon } from '../lib/pwa-icon';

// Apple-Touch-Icon (iOS-Homescreen): Wortmarke „GURT“ (FF Unit) auf Weiß, iOS rundet selbst.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return renderIcon(180, false);
}
