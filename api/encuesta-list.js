import { getRedis } from './_redis.js';

export default async function handler(req, res) {
  if (req.query.pass !== process.env.ENCUESTA_ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  const redis = await getRedis();
  const raw = await redis.lRange('encuesta_start_hof', 0, -1);
  const data = raw.map(function (r) { return JSON.parse(r); });
  res.status(200).json(data);
}
