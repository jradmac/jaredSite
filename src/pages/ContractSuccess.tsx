import { Link } from 'react-router-dom';

export default function ContractSuccess() {
  return (
    <div className="min-h-screen bg-ink text-paper grid place-items-center px-5">
      <div className="max-w-md text-center">
        <div className="text-5xl mb-4">✓</div>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">You're all set.</h1>
        <p className="text-white/70 leading-relaxed mb-8">
          Payment successful and the contract is now active. A receipt was emailed to you, and your card
          is saved for automatic monthly billing.
        </p>
        <Link
          to="/"
          className="inline-block rounded-full bg-paper text-ink font-medium px-6 py-3 hover:scale-105 transition-transform"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
