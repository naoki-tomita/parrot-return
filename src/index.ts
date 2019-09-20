import { launch } from "puppeteer";

import { FunctionEvent, FunctionContext } from "./Types";

export async function handle(event: FunctionEvent, context: FunctionContext) {
  try {
    const browser = await launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    const binary = await page.screenshot({ fullPage: true, encoding: "binary", type: "png" });
    await browser.close();
    context.status(200).succeed(binary);
  } catch(e) {
    context.status(500).succeed(e);
  }
}
