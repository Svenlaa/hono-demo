import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) =>
    c.html(
        '<style>h1>a{color:initial;text-decoration:none;&:hover{color:forestgreen}}</style><title>hono-demo by Svenlaa</title><h1><a href="https://github.com/Svenlaa/hono-demo">hono-demo</a></h1>a coding exploration by <a href="https://svenlaa.com">Svenlaa</a>'
    )
);

export default app;
