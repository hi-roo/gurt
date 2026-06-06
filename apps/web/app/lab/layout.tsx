import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Discovery-Bereich: bewusst aus Suchmaschinen und Navigation herausgehalten.
export const metadata: Metadata = {
  title: 'Lab — Discovery',
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="bg-accent px-4 py-1.5 text-center font-mono text-xs uppercase tracking-widest text-paper">
        Discovery · nicht live · Konzept-Exploration
      </div>
      {children}
    </>
  );
}
