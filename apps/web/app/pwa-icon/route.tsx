import { renderIcon } from '../../lib/pwa-icon';

/**
 * Manifest-Icons in stabilen URLs: `/pwa-icon?size=192`, `…?size=512`,
 * `…?size=512&maskable=1`. Generiert dieselbe Marke wie Favicon/Apple-Icon (next/og).
 */
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const size = Math.min(1024, Math.max(48, Number(searchParams.get('size')) || 512));
  const maskable = searchParams.get('maskable') === '1';
  return renderIcon(size, maskable);
}
