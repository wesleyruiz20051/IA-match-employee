import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dbPath = join(root, 'sqlite.db');
const db = new DatabaseSync(dbPath);
db.exec('PRAGMA journal_mode = DELETE');
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    payload TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    payload TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS saved (
    job_id TEXT PRIMARY KEY
  );
`);

function rows(table) {
  return db.prepare(`SELECT payload FROM ${table} ORDER BY id`).all().map(row => JSON.parse(row.payload));
}

function seed() {
  const students = db.prepare('SELECT COUNT(*) AS n FROM students').get().n;
  const jobs = db.prepare('SELECT COUNT(*) AS n FROM jobs').get().n;
  if (students && jobs) return;
  const applicants = JSON.parse(readFileSync(join(root, 'src/data/applicants.json'), 'utf8'));
  const openings = JSON.parse(readFileSync(join(root, 'src/data/jobs.json'), 'utf8'));
  const insertStudent = db.prepare('INSERT OR REPLACE INTO students (id, payload) VALUES (?, ?)');
  const insertJob = db.prepare('INSERT OR REPLACE INTO jobs (id, payload) VALUES (?, ?)');
  db.exec('BEGIN');
  try {
    for (const student of applicants) insertStudent.run(student.id, JSON.stringify(student));
    for (const job of openings) insertJob.run(job.id, JSON.stringify(job));
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

function savedIds() {
  return db.prepare('SELECT job_id FROM saved ORDER BY job_id').all().map(row => row.job_id);
}

function toggleSaved(jobId) {
  const existing = db.prepare('SELECT job_id FROM saved WHERE job_id = ?').get(jobId);
  if (existing) db.prepare('DELETE FROM saved WHERE job_id = ?').run(jobId);
  else db.prepare('INSERT INTO saved (job_id) VALUES (?)').run(jobId);
  return savedIds();
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString() || '{}';
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

function send(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

seed();

const port = Number(process.env.PORT) || 8787;
const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  try {
    if (req.method === 'GET' && url.pathname === '/api/state') {
      send(res, 200, { students: rows('students'), jobs: rows('jobs'), savedIds: savedIds() });
      return;
    }
    if (req.method === 'POST' && url.pathname === '/api/saved') {
      const body = await readBody(req);
      const job = db.prepare('SELECT id FROM jobs WHERE id = ?').get(body.jobId);
      if (!job) {
        send(res, 404, { error: 'Oportunidad no encontrada.' });
        return;
      }
      send(res, 200, { savedIds: toggleSaved(body.jobId) });
      return;
    }
    send(res, 404, { error: 'No encontrado.' });
  } catch (error) {
    send(res, 500, { error: 'No se pudo leer sqlite.db.' });
    console.error(error);
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`API en http://127.0.0.1:${port} · ${dbPath}`);
});
