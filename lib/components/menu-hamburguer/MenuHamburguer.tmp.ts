import { MenuHamburguerType } from "./MenuHamburguer.type";
import { MenuHamburguerEnum } from "./MenuHamburger.enum";
import { ITemplate } from "lib/shared/interfaces/Template.interface";

export class MenuHamburguerTemplate implements ITemplate<MenuHamburguerType> {
  private _clsNames: MenuHamburguerType;
  private _template: string;
  private _style: string;
  private _propTime: number = 600;

  constructor() {
    this._clsNames = this._getClsNames();
    this._template = this._getTemplate();
    this._style = this._getStyle();
  }
  getClsNames(): MenuHamburguerType {
    return this._clsNames;
  }
  getTemplate(): string {
    return this._template;
  }
  getStyle(): string {
    return this._style;
  }

  private _getClsNames(): MenuHamburguerType {
    return {
      root: MenuHamburguerEnum.tag,
      container: `${MenuHamburguerEnum.tag}__container`,
      menu: `${MenuHamburguerEnum.tag}__menu`,
      line: `${MenuHamburguerEnum.tag}__line`,
      lineUno: `${MenuHamburguerEnum.tag}__line--uno`,
      lineDos: `${MenuHamburguerEnum.tag}__line--dos`,
      lineTres: `${MenuHamburguerEnum.tag}__line--tres`,
      containeChild: `${MenuHamburguerEnum.tag}__containerChild`,
    };
  }

  private _getTemplate(): string {
    return `
      <div class="${this._clsNames.container}">
        <div class="${this._clsNames.menu}">
          <div class="${this._clsNames.line} ${this._clsNames.lineUno}"></div>
          <div class="${this._clsNames.line} ${this._clsNames.lineDos}"></div>
          <div class="${this._clsNames.line} ${this._clsNames.lineTres}"></div>
        </div>
        <div class="${this._clsNames.containeChild}">
        </div>
      </div>
    `;
  }

  private _getStyle(): string {
    return `
      ${this._clsNames.root}, :host{
        display: block;
        font-size: 10px;
        position: relative;
        --color: #438c40;
        --colorActive: #438c40;
        --menuPositionTop: 0;
        --menuPositionLeft: 0;
        --menuBackground: #fff;
        --menuWidth: 100vw;
        --menuHeight: 100vh;
        --menuZIndex: 1000;
      }
      
      .${this._clsNames.menu} {
        cursor: pointer;
        position: relative;
        z-index: calc(var(--menuZIndex) + 1);
      }

      .${this._clsNames.line} {
        height: .4em;
        width: 3em;
        background-color: var(--color);
        margin: .3em 0;
        cursor: pointer;
        transition: transform ${this._propTime}ms ease-in-out, background-color ${
      this._propTime * 1.35
    }ms ease-in-out;
      }

      .${this._clsNames.line}.active {
        background-color: var(--colorActive);
      }

      .${this._clsNames.lineDos} {
        transition: opacity ${this._propTime / 2}ms ${this._propTime / 3}ms ease-in-out;
      }
      .${this._clsNames.lineDos}.active {
        transition: opacity ${this._propTime / 2}ms ease-in-out;
      }

      .${this._clsNames.menu}.active .${this._clsNames.lineUno} {
        transform: rotate(-45deg) translate(-25%, 50%);
      }
      .${this._clsNames.menu}.active .${this._clsNames.lineDos} {
        opacity: 0;
      }
      .${this._clsNames.menu}.active .${this._clsNames.lineTres} {
        transform: rotate(45deg) translate(-25%, -55%);
      }
      .${this._clsNames.menu}.active + .${this._clsNames.containeChild}{
        z-index: var(--menuZIndex);
      }
      .${this._clsNames.containeChild}{
        position: fixed;
        top: var(--menuPositionTop);
        left: var(--menuPositionLeft);
        font-size: 1rem;
        z-index: var(--menuZIndex);
        opacity: 1;
      }
      .${this._clsNames.containeChild} section{
        width: var(--menuWidth);
        height: var(--menuHeight);
        background-color: var(--menuBackground);
      }
    `;
  }
}
