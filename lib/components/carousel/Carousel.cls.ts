import { CarouselTemplate } from "lib/components/carousel/Carousel.tmp";
import { ElementAttr } from "lib/shared/class/Element.cls";
import { ISwitchObject } from "lib/shared/interfaces";

export class Carousel extends ElementAttr {
  private _templateCls: CarouselTemplate;
  private _widthSlide: number = 0;
  private _countSlides: number;
  protected _attrs: ISwitchObject;
  private _slides: HTMLDivElement | null = null;
  private _setInterval: any = 0;

  static get observedAttributes() {
    return ["count-slides", "*"];
  }

  constructor() {
    super();
    this._templateCls = new CarouselTemplate();
    this._countSlides = parseInt(this.getAttribute("count-slides") || "3");
    this._attrs = this._getLogicAttr();
  }

  private _getLogicAttr(): ISwitchObject {
    return {
      "count-slides": (newValue: string) => {
        this._countSlides = parseInt(newValue) || 3;
        this.setWidthContainer();
      },
    };
  }

  private moveRight() {
    if (this._slides) {
      const finalWidth = this._slides.scrollLeft >= this._slides.scrollWidth - this._slides.clientWidth;
      if (finalWidth) {
        this._slides.scrollLeft = 0;
        return;
      }

      const isJumpCompleted = this._slides.scrollLeft % this._widthSlide === 0;
      if (isJumpCompleted) {
        this._slides.scrollLeft += this._widthSlide;
        return;
      }
      const scrollLeft = Math.round(this._widthSlide - (this._slides.scrollLeft % this._widthSlide));
      this._slides.scrollLeft += scrollLeft;
    }
  }

  private moveLeft() {
    if (this._slides) {
      const startWidth = this._slides.scrollLeft <= 0;
      if (startWidth) {
        this._slides.scrollLeft = this._slides.scrollWidth - this._slides.clientWidth;
        return;
      }

      const isJumpCompleted = this._slides.scrollLeft % this._widthSlide === 0;
      if (isJumpCompleted) {
        this._slides.scrollLeft -= this._widthSlide;
        return;
      }
      const scrollLeft = Math.round(this._widthSlide + (this._slides.scrollLeft % this._widthSlide));
      this._slides.scrollLeft -= scrollLeft;
    }
  }

  private setWidthContainer() {
    const slot = this.getElement(`slot.${this._templateCls.clsNames.slot}`) as unknown as HTMLSlotElement;
    if (slot) {
      const slides = slot.assignedElements();
      if (slides.length) {
        const sumatoriaSize = slides.reduce((acc, current) => {
          const margin =
            parseFloat(getComputedStyle(current).marginRight) +
            parseFloat(getComputedStyle(current).marginLeft);
          const width = parseFloat(getComputedStyle(current).width);
          acc += margin + width;
          return acc;
        }, 0);
        this._widthSlide = Math.round(sumatoriaSize / slides.length);

        const slotParent = slot.parentElement;
        if (slotParent) {
          slotParent.style.width = this._widthSlide * this._countSlides + "px";
        }
      }
    }
  }

  connectedCallback(): void {
    this.render()

    this._slides = this.getElement(`.${this._templateCls.clsNames.slides}`) as unknown as HTMLDivElement;

    const timeWait = parseInt(this.getAttribute("transition-auto") || "0");
    if (timeWait) {
      this._setInterval = setInterval(() => {
        this.moveRight();
      }, timeWait);
    }

    this.setWidthContainer();

    const arrowLeft = this.getElement(`.${this._templateCls.clsNames.arrowLeft}`);
    if (arrowLeft) {
      arrowLeft.addEventListener("click", this.moveLeft.bind(this));
    }

    const arrowRight = this.getElement(`.${this._templateCls.clsNames.arrowRight}`);
    if (arrowRight) {
      arrowRight.addEventListener("click", this.moveRight.bind(this));
    }
  }

  disconnectedCallback(): void {
    if (this._setInterval) clearInterval(this._setInterval);
    const arrowLeft = this.getElement(`.${this._templateCls.clsNames.arrowLeft}`);
    if (arrowLeft) {
      arrowLeft.removeEventListener("click", this.moveLeft);
    }

    const arrowRight = this.getElement(`.${this._templateCls.clsNames.arrowRight}`);
    if (arrowRight) {
      arrowRight.removeEventListener("click", this.moveRight);
    }
  }
}
