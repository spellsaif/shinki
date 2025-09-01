import express from 'express';
import { notImplemented } from '@shinki/http';

const app = express();
app.use(express.json());

app.post('/api/auth/register', notImplemented());
app.post('/api/auth/login', notImplemented());
app.get('/api/auth/oauth/github', notImplemented());
app.get('/api/auth/oauth/github/callback', notImplemented());
app.get('/me', (_req, res) => res.json({ ok: true }));

app.listen(3000, () => console.log('Shinki example on http://localhost:3000'));
