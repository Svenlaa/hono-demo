import { Hono } from 'hono';

type Bindings = {
    KV_STORE: KVNamespace;
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    let res = null;
    let count = null;
    try {
        res = (await c.env.DB.prepare('UPDATE counts SET count = count + 1 RETURNING counts.count').first()) as {
            count: number;
        } | null;
    } catch {
        await c.env.DB.exec(
            `CREATE TABLE IF NOT EXISTS 'counts' ( id INTEGER PRIMARY KEY AUTOINCREMENT,count INTEGER NOT NULL)`
        );
    }
    if (res === null) {
        const res = await c.env.DB.prepare('SELECT count FROM counts').first();
        if (res === null) {
            count = +((await c.env.KV_STORE.get('count')) ?? '0') + 1;
            await c.env.DB.exec(`INSERT INTO counts (count) VALUES (${count})`);
        }
    }

    count = count ? count : res?.count ?? 1;
    return c.html(
        `<meta name="viewport" content="width=device-width,initial-scale=1.0"><link rel="stylesheet" href="https://svenlaa.com/style.css"><title>hono-demo by Svenlaa</title><h1><a style="--color:var(--stone-950);text-decoration:none" href="https://github.com/Svenlaa/hono-demo">hono-demo</a></h1>a coding exploration by <a href="https://svenlaa.com">Svenlaa</a><p>you are visitor number ${count}.</p>`
    );
});

app.get('/api/count', async (c) => {
    const res = await c.env.DB.prepare('SELECT count FROM counts').first();
    return c.json(res);
});

export default app;
