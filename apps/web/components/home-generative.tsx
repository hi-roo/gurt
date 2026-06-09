'use client';

import { useEffect, useState } from 'react';
import { FlowHero } from './flow-hero';

/**
 * Startseiten-Signatur: das datengetriebene FlowHero-Feld (neue Designsprache), theme-aware.
 * Liest den aktuellen `--paper`-Wert und re-mountet bei Hell/Dunkel-Wechsel, sodass der Grund
 * exakt zur Seite passt (löst den „weißer Streifen im Dark-Mode"-Befund). Rein dekorativ.
 */
const SERIES = [1.16, 1.18, 1.23, 1.33, 1.49, 1.43, 1.61, 2.0];

export function HomeGenerative() {
  const [theme, setTheme] = useState<{ dark: boolean; bg: string }>({ dark: false, bg: '#ece9e0' });

  useEffect(() => {
    const read = () => {
      const dark = document.documentElement.classList.contains('dark');
      const bg =
        getComputedStyle(document.documentElement).getPropertyValue('--paper').trim() ||
        (dark ? '#0c111d' : '#ece9e0');
      setTheme({ dark, bg });
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return (
    <div aria-hidden="true" className="w-full border-b border-line">
      <FlowHero
        key={theme.dark ? 'dark' : 'light'}
        values={SERIES}
        seed="gurt"
        tone={theme.dark ? 'ink' : 'paper'}
        bgColor={theme.bg}
        motion="always"
        className="h-20 w-full md:h-28"
      />
    </div>
  );
}
