import { JSDOM } from "jsdom";

type TestGlobals = Window & typeof globalThis;

function assignBrowserGlobal<K extends keyof TestGlobals>(
  key: K,
  value: TestGlobals[K]
): void {
  (globalThis as TestGlobals)[key] = value;
}

const dom = new JSDOM(
  "<!DOCTYPE html><html><body><div id='root'></div></body></html>",
  { url: "http://localhost" }
);

const { window } = dom;

// jsdom's DOMWindow is runtime-compatible with the browser but typed separately.
assignBrowserGlobal(
  "window",
  window as unknown as TestGlobals["window"]
);
assignBrowserGlobal("document", window.document);
assignBrowserGlobal("HTMLElement", window.HTMLElement);
assignBrowserGlobal("Element", window.Element);
assignBrowserGlobal("Node", window.Node);
assignBrowserGlobal("Text", window.Text);
assignBrowserGlobal("DocumentFragment", window.DocumentFragment);
assignBrowserGlobal("Event", window.Event);
assignBrowserGlobal("CustomEvent", window.CustomEvent);
assignBrowserGlobal(
  "getComputedStyle",
  window.getComputedStyle.bind(window) as TestGlobals["getComputedStyle"]
);
