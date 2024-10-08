import { Attributes, Types } from "lib/shared/enums";
import { typesOption } from "lib/shared/dictionaries";

export function uniqueHash() {
  return Math.round(new Date().getTime() * Math.random());
}

export function getType(value: string, type: Types, DOM: any): any {
  let response: any;
  try {
    response = typesOption[type](value);
  } catch (e: any) {
    DOM.innerHTML = "Attribute " + e.message + " is not valid";
  }
  return response || "";
}

export function renderDom(obj: any): void {
  const _unique: number = uniqueHash();
  const styletmp: HTMLStyleElement = document.createElement("style");
  styletmp.textContent = obj._templateCls.getStyle();
  obj.shadowDOM.appendChild(styletmp);
  const body: HTMLTemplateElement = document.createElement("template");
  body.innerHTML = obj._templateCls.getTemplate();
  obj.shadowDOM.append(body.content);
  obj.setAttribute(Attributes.hash, _unique.toString());
}

export function renderDomOpen(obj: any): void {
  const _unique: number = uniqueHash();
  const styletmp: HTMLStyleElement = document.createElement("style");
  styletmp.textContent = obj._templateCls.getStyle();
  document.head.appendChild(styletmp);
  const body: HTMLTemplateElement = document.createElement("template");
  body.innerHTML = obj._templateCls.getTemplate();
  obj.append(body.content);
  obj.setAttribute(Attributes.hash, _unique.toString());
}
