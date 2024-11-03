import { Hono } from 'hono';

type Bindings = {
    KV_STORE: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
    const oldCount = +((await c.env.KV_STORE.get('count')) ?? '0');
    const count = oldCount + 1;
    await c.env.KV_STORE.put('count', count.toString());

    return c.html(
        `<meta name="viewport" content="width=device-width,initial-scale=1.0"><link rel="stylesheet" href="https://svenlaa.com/style.css"><title>hono-demo by Svenlaa</title><h1><a style="--color:var(--stone-950);text-decoration:none" href="https://github.com/Svenlaa/hono-demo">hono-demo</a></h1>a coding exploration by <a href="https://svenlaa.com">Svenlaa</a><p>you are visitor number ${count}.</p>`
    );
});

app.get('/api/count', async (c) => {
    const count = +((await c.env.KV_STORE.get('count')) ?? '0');
    return c.json({ count });
});

export default app;
