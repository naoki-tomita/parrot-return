import { Client } from "pg";

import { FunctionEvent, FunctionContext } from "./Types";

export async function handle(event: FunctionEvent, context: FunctionContext) {
  try {
    if (event.path.includes("init")) {
      await init();
      context.status(200).succeed({ ok: "created" });
    } else {
      const r = await get();
      context.status(200).succeed(r);
    }
  } catch(e) {
    context.status(200).succeed(e);
  }
}

const options = {
  host: "parrot-a3286f12b1-postgresql",
  user: "postgres",
  password: process.env.PASSWORD,
  database: "postgres"
}

async function init() {
  const client = new Client(options);
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
  const client = new Client(options);
  await client.connect();
  return await client.query(`SELECT * FROM test;`)
}
