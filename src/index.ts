import { Client } from "pg";

interface Request {

}

interface Context {

}

interface FunctionEvent {
  body: any;
  headers: {
    cookie: string;
  },
  method: "GET" | "POST" | "PUT" | "DELETE",
  query: { [key: string]: string },
  path: string
}

interface FunctionContext {
  value: number;
  cb(...args: any[]): void;
  headerValues: { [key: string]: string };
}

export async function handle(event: FunctionEvent, context: FunctionContext) {
  context.cb({ xxxx: "hello world" });
}
