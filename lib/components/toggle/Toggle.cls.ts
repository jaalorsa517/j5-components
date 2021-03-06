import { ToggleTemplate } from "./Toggle.tmpt";
import { Element } from "../../shared/class/Element.cls";
import { getType } from "../../shared/utils";
import { Types } from "../../shared/enums";
import { renderDom } from "lib/shared/utils";

export class Toggle extends Element {
  static get observedAttributes() {
    return ["checked", "label"];
  }
  private _checked: boolean;
  private _eventEmitter: CustomEvent;
  private _templateCls: ToggleTemplate;
  private _labelOptions: string[] = [];
  private _attrs: { [key: string]: (a: string) => void };

  constructor() {
    super();
    this._checked = getType(this.getAttribute("checked") || "false", Types.BOOLEAN, this.shadowDOM);
    this._labelOptions = this._getOptionsLabel();
    this._templateCls = new ToggleTemplate(this._getLabel);
    this._attrs = {
      checked: (newValue: string) => this._changeChecked(getType(newValue, Types.BOOLEAN, this.shadowDOM)),
      label: (newValue: string) => this._attrLabel(newValue),
    };
    this._render();
    this.addEventListener("click", this.onClick, false);
    this._eventEmitter = new CustomEvent("change", { detail: { isChecked: this._checked } });
  }
  private _render() {
    renderDom(this);
  }
  private onClick = () => {
    this._checked = !getType(this.getAttribute("checked") || "false", Types.BOOLEAN, this.shadowDOM);
    this.setAttribute("checked", `${this._checked}`);
    this.setAttribute("label", this._getLabel);
    this._eventEmitter.detail.isChecked = this._checked;
    this.dispatchEvent(this._eventEmitter);
  };
  private _getOptionsLabel(): string[] {
    const _label: string = this.getAttribute("label") || "";
    const labelOptions: string[] = _label.split("/").slice(0, 2);
    if (labelOptions.length === 1) labelOptions.push(_label);
    return labelOptions;
  }
  private _changeChecked(value: boolean) {
    const radio: HTMLInputElement | null = this.shadowDOM.querySelector(
      `.${this._templateCls.clsNames.radio}`
    );
    if (radio) {
      this._checked = value || false;
      radio.checked = value || false;
      this._attrs.label(this._getLabel);
      return;
    }
  }
  private _changeLabel(label: string) {
    const labelEl: HTMLElement | null = this.shadowDOM.querySelector(`.${this._templateCls.clsNames.label}`);
    if (labelEl) {
      labelEl.innerText = label;
    }
  }
  private _attrLabel(newValue: string) {
    const hasElements: boolean = newValue?.split("/").length === 2 || false;
    if (hasElements && (this._labelOptions.length !== 2 || !this._labelOptions.every((value) => value)))
      this._labelOptions = this._getOptionsLabel();
    this._changeLabel(hasElements ? this._getLabel : newValue || "");
  }
  private get _getLabel(): string {
    return this._labelOptions[+this._checked];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) this._attrs[name](newValue);
  }
  connectedCallback() {
    this.setAttribute("checked", `${this._checked}`);
    this.setAttribute("label", this._getLabel);
    this._eventEmitter.detail.isChecked = this._checked;
    this.dispatchEvent(this._eventEmitter);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.onClick);
  }
}
