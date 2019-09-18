export interface FunctionEvent {
  body: any;
  headers: {
    cookie: string;
  },
  method: "GET" | "POST" | "PUT" | "DELETE",
  query: { [key: string]: string },
  path: string
}

export interface FunctionContext {
  value: number;
  status(status: number): FunctionContext;
  succeed(arg: any): void;
  headerValues: { [key: string]: string };
}
