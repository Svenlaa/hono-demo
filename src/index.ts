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
        `<style>h1>a{color:initial;text-decoration:none;&:hover{color:forestgreen}}</style><title>hono-demo by Svenlaa</title><h1><a href="https://github.com/Svenlaa/hono-demo">hono-demo</a></h1>a coding exploration by <a href="https://svenlaa.com">Svenlaa</a><span style="padding-top:1em;display:block">you are visitor number ${count}.</span>`
    );
});

app.get('/api/count', async (c) => {
    const count = +((await c.env.KV_STORE.get('count')) ?? '0');
    return c.json({ count });
});

export default app;
