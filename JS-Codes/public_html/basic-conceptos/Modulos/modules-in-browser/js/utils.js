/* 
 Created on : 30 abr. 2020, 18:13:18
 Author     : RVS
 */

/**
 * Funcion 'export' addTextToBody
 * 1º Crea un elemento 'div' 
 * 2º Añade el texto recibido por parametro
 * 3º Añade el elemento 'div' nodo al 1º nodo del elemento body
 * 
 * @param {string} text 
 * @returns {undefined} No devuelve nada porque es una function
 */
export function addTextToBody(text) {
//  Creamos un elemento 'div'
  const div = document.createElement('div');
//  Añadimos al elemento el texto pasado por parametro
  div.textContent = text;
//  Añadimos el atributo estilo y el color
  div.style.color = "#f00";
  div.style.margin = "10px";
  div.style.fontFamily = "Roboto , sans-serif";
  div.style.borderRadius = "6px";
  div.style.padding = "10px";
  div.style.width = "fit-content";
  div.style.border = "2px solid #f00";
  document.body.appendChild(div);
}