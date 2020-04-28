/* 
 Created on : 25 abr. 2020, 20:48:13
 Author     : Roboto
 */

var sabine = ['Sabine', 'cat', 'female', 14, true],
        dakota = ['Dakota', 'dog', 'male', 15, false];

var pets = [sabine, dakota];

var valores = new Array(4);

var p = document.getElementsByTagName('p');

for (var i = 0; i < sabine.length; i++) {
  p[i].innerHTML = pets[0][i];
}

for (var i = 0; i < sabine.length; i++) {
  var parrafo = document.createElement('p');
}


