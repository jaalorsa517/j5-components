import { JsonTransformType } from "lib/components/json-transform/JsonTransform.type";
import { JsonTransformEnum } from "lib/components/json-transform/JsonTransform.enum";
import { ITemplate } from "lib/shared/interfaces/Template.interface";

export class JsonTransformTemplate implements ITemplate<JsonTransformType> {
  private _clsNames: JsonTransformType;
  private _template: string;
  private _style: string;

  constructor() {
    this._clsNames = this._getClsNames();
    this._template = this._getTemplate();
    this._style = this._getStyle();
  }
  getClsNames(): JsonTransformType {
    return this._clsNames;
  }
  getTemplate(): string {
    return this._template;
  }
  getStyle(): string {
    return this._style;
  }

  private _getClsNames(): JsonTransformType {
    return {
      root: JsonTransformEnum.tag,
      container: `${JsonTransformEnum.tag}__container`,
      textArea: `${JsonTransformEnum.tag}__textArea`,
      textAreaError: `${JsonTransformEnum.tag}__textArea--error`,
      btnContainer: `${JsonTransformEnum.tag}__btnContainer`,
      btn: `${JsonTransformEnum.tag}__btn`,
      btnCopy: `${JsonTransformEnum.tag}__btn--copy`,
      btnClear: `${JsonTransformEnum.tag}__btn--clear`,
      btnFormat: `${JsonTransformEnum.tag}__btn--format`,
      popup: `${JsonTransformEnum.tag}__popup`,
      textAreaContainer: `${JsonTransformEnum.tag}__textAreaContainer`,
      errorInput: `${JsonTransformEnum.tag}__error`,
    };
  }

  private _getTemplate(): string {
    return `
      <div class="${this._clsNames.container}">
        <div class="${this._clsNames.textAreaContainer}">
          <textarea class="${this._clsNames.textArea}" tabindex="-1"></textarea>
        </div>
        <div class="${this._clsNames.btnContainer}">
          <button class="${this._clsNames.btn} ${this._clsNames.btnFormat}">Formatear</button>
          <button class="${this._clsNames.btn} ${this._clsNames.btnCopy} button">Copiar</button>
          <button class="${this._clsNames.btn} ${this._clsNames.btnClear}">Limpiar</button>
        </div>
      </div>
    `;
  }

  private _getStyle(): string {
    return `
      ${this._clsNames.root}, :host{
        display: block;
        width: 500px;
        height: 500px;
        --color_primary: #438C40;
        --color_font: #112e09;
        --color_font_light: #f9f9f9;
        --color_popup: var(--color_font);
        --color_popup_font: var(--color_font_light);
        --font-size: 1em;
        --font-family: "Roboto", sans-serif;
        --line-height: 1.5;
        --color_error: #bb0000;
      }
      .${this._clsNames.container}{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      .${this._clsNames.textArea} {
        width: 90%;
        height: 95%;
        padding: 0.5em;
        color: var(--color_font);
        font-size: var(--font-size);
        font-family: var(--font-family);
        line-height: var(--line-height);
        border: 2px solid var(--color_primary);
        border-radius: 0.5em;
        overflow: auto;
        white-space: pre-wrap;
        scrollbar-width: thin;
      }
      .${this._clsNames.textAreaError} {
        border-color: var(--color_error);
      }
      .${this._clsNames.textArea}:focus-visible {
        outline: 1px solid var(--color_primary);
      }
      .${this._clsNames.textAreaError}:focus-visible {
        outline: none;
      }
      .${this._clsNames.textArea}::-webkit-scrollbar {
        width: 1px;
      }
      .${this._clsNames.errorInput}{
        font-size: 0.9em;
        text-align: end;
        color: var(--color_error);
        width: 90%;
        padding: 0 0.5em;
      }
      .${this._clsNames.textAreaContainer} {
        flex: 10;
        flex-direction: column;
      }
      .${this._clsNames.btnContainer}{
        flex: 1;
        flex-direction: column;
      }
      .${this._clsNames.btnContainer},
      .${this._clsNames.textAreaContainer} {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      .${this._clsNames.btn} {
        padding: .1875em .3125em;
        margin: 0.3em 0;
        width: 90%;
        min-width: 100px;
        font-size: .9375em;
        position: relative;
        color: var(--color_font_light);
        outline: none;
        background-color: var(--color_primary);
        border: 1px solid var(--color_primary);
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
      }
      .${this._clsNames.btn}:hover {
        opacity: 0.8
      }
      .${this._clsNames.btn}:active {
        transform: scale(0.95);
      }
      .${this._clsNames.popup}{
        padding: 0.3em;
        position: absolute;
        left: 50%;
        border-radius: 3px;
        color: var(--color_popup_font);
        background-color: var(--color_popup);
        transform: translate(-50%, -50%);
        animation: entry 1.2s linear forwards;
      }
      @media screen and (min-width: 768px) {
        .${this._clsNames.btnContainer}{
          flex-direction: row;
        }
        .${this._clsNames.btn} {
          margin: 1em;
          width: auto;
        }
      }
      @keyframes entry{
        0%{
          opacity:0;
          top: 200%;
        }
        30%{
        }
        50%{
          top: 50%;
          opacity: 1;
        }
        100%{
          opacity:0;
          top: -100%;
        }
      }
    `;
  }
}
