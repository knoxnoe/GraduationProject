import { Application, green, yellow } from "./dep.ts";
import logger from './middlewares/logger.ts';
import notFound from './middlewares/notFound.ts';
import todoRouter from "./routes/todo.ts";

const app = new Application();
const port = 4399;


app.use(logger.logger);
app.use(logger.responseTime);

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

// 404
app.use(notFound);


app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  
  console.log(`${yellow("Listening on:")} ${green(url)}`);
});

await app.listen({ port });
