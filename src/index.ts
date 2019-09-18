import { Client } from "pg";

import { FunctionEvent, FunctionContext } from "./Types";

export async function handle(event: FunctionEvent, context: FunctionContext) {
  if (event.path.includes("init")) {
    await init();
    context.status(200).succeed({ ok: "created" });
  } else {
    const r = await get();
    context.status(200).succeed(r);
  }
}

async function init() {
  const client = new Client({
    connectionString: process.env.CONNECTION
  });
  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS test (
      id     CHAR(4)    NOT NULL,
      name   TEXT       NOT NULL,
      age    INTEGER,
      PRIMARY KEY (id)
    );
  `);
  await client.query(`INSERT INTO test (id, name, age) VALUES (1, "foo", 23);`)
}

async function get() {
  const client = new Client({
    connectionString: process.env.CONNECTION
  });
  await client.connect();
  return await client.query(`SELECT * FROM test;`)
}
