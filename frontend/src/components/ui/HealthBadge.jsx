import { useHealth } from '@/hooks/useApi';
import clsx from 'clsx';

export default function HealthBadge() {
  const { data, isLoading, isError } = useHealth();

  const status = isLoading
    ? 'Checking...'
    : isError
      ? 'API offline'
      : data?.status === 'ok'
        ? 'API online'
        : 'Unknown';

  const color = isLoading
    ? 'bg-slate-400'
    : isError
      ? 'bg-red-500'
      : 'bg-green-500';

  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs">
      <span
        className={clsx('h-2 w-2 rounded-full', color)}
        aria-hidden="true"
      />
      <span className="text-slate-700">{status}</span>
    </div>
  );
}
