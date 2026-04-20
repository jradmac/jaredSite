import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authRouter } from './routes/auth.js';
import { contractsRouter } from './routes/contracts.js';
import { publicRouter } from './routes/public.js';
import { webhooksRouter } from './routes/webhooks.js';

const app = express();

const origins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: origins,
    credentials: true,
  }),
);
app.use(cookieParser());

// Webhook needs the raw body — mount BEFORE express.json()
app.use('/api/webhooks', webhooksRouter);

app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/contracts', contractsRouter);
app.use('/api/public', publicRouter);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`[server] listening on :${port}`);
});
