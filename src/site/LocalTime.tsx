import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Denver',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/** Live Mountain-time clock, so visitors know when a reply is likely. */
export default function LocalTime({ className = '' }: { className?: string }) {
  const [now, setNow] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setNow(fmt.format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className={className}>
      <time>{now}</time> MT
    </span>
  );
}
