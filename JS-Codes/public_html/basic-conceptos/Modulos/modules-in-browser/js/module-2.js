/* 
 Created on : 30 abr. 2020, 19:59:40
 Author     : Android
 */

function addTextToBody(text) {
  const div = document.createElement('div');
  div.textContent = text;
  document.body.appendChild(div);
}


addTextToBody('module-2.js executed the function addTextToBody');