import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <p className="text-sm font-medium text-sky-600">404</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Page not found
        </h2>
        <p className="mt-2 text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
