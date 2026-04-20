import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post('/api/auth/login', { username, password });
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error && err.message.includes('401') ? 'Invalid credentials' : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-paper flex items-center justify-center px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8 space-y-5"
      >
        <div>
          <h1 className="font-display text-2xl font-semibold">Admin login</h1>
          <p className="text-sm text-white/50 mt-1">Restricted area.</p>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Username</label>
          <input
            autoFocus
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-accent transition-colors"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-paper text-ink font-medium py-3 hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
