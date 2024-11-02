import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.html('an exploration by <a href="https://svenlaa.com">Svenlaa</a>'));

export default app;
