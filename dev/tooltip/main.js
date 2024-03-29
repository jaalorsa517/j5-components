import { header } from "../header.js";
import {j5Tooltip} from 'lib/main';

j5Tooltip();
header();

const randomMinMax = (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1)) + min;

for (let i = 0; i < 300; i++) {
  const texts = [
    `Este es el ${i} tooltip desde Javascript. Este es un ejemplo aleatorio de un tooltip con texto largo.`,
    `Probando un texto mediano para el tooltip ${i}`,
    `Tooltip ${i}`,
  ]
  const tooltip = document.createElement("j5-tooltip");
  tooltip.innerHTML = `<p>Tooltip ${i}</p>`;
  tooltip.setAttribute("text", `Este es el ${i} tooltip desde Javascript.`);
  let isRandom = randomMinMax();
  if (isRandom) tooltip.setAttribute("startposition", "horizontal");
  isRandom = randomMinMax(0,2);
  if (isRandom)
    tooltip.setAttribute(
      "text",
      texts[isRandom]
    );
  document.querySelector("main").appendChild(tooltip);
}
