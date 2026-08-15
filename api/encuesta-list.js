import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.query.pass !== process.env.ENCUESTA_ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  const raw = await kv.lrange('encuesta_start_hof', 0, -1);
  const data = raw.map(function (r) { return typeof r === 'string' ? JSON.parse(r) : r; });
  res.status(200).json(data);
}
