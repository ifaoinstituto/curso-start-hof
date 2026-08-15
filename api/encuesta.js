import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { nombre, p1, p2, p3, p4, p5, comentario } = req.body || {};
  if (!nombre || !p1 || !p2 || !p3 || !p4 || !p5) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const entry = {
    nombre: String(nombre).slice(0, 200),
    p1: Number(p1), p2: Number(p2), p3: Number(p3), p4: Number(p4), p5: Number(p5),
    comentario: String(comentario || '').slice(0, 2000),
    fecha: new Date().toISOString()
  };

  await kv.rpush('encuesta_start_hof', JSON.stringify(entry));
  res.status(200).json({ ok: true });
}
