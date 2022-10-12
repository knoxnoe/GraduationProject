import { MysqlClient } from "../dep.ts";

const SQLClient = await new MysqlClient();

SQLClient.connect({
  hostname: '127.0.0.1',
  username: 'root',
  password: 'root',
  db: 'cloud2020'
})

export { SQLClient };
