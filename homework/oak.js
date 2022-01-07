import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { table99 } from "./html/oak9999.js"

const app = new Application();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
    console.log('path=', ctx.request.url.pathname)
    await send(ctx, ctx.request.url.pathname, {
      // root: `${Deno.cwd()}/public/`,
      root: Deno.cwd()+'/html/',
      index: "oak.css",
    });
  });

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });