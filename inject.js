//este script busca los arrays y los manda a la ventanita popup
var links = new Array();

//array para los XML
links[0] = new Array();
var elementos = document.getElementsByName("BtnDescarga");
//por cada elemento buscamos el texto adentro:
for (var i = 0; i < elementos.length; i++) {
  //buscamos en el HTML
  var textoOnclick = elementos[i].outerHTML;
  //buscamos la URL relativa con regex
  var urlRelativa = textoOnclick.match(/RecuperaCfdi[^']+/);
  //si la encontramos:
  if (urlRelativa.length > 0) {
    var urlAbsoluta =
      "https://portalcfdi.facturaelectronica.sat.gob.mx/" + urlRelativa[0];
    links[0].push(urlAbsoluta);
  }
}

//array para los PDF
links[1] = new Array();
var elementos = document.getElementsByName("BtnRI");

//buscamos formar una URL así:
//https://portalcfdi.facturaelectronica.sat.gob.mx/RepresentacionImpresa.aspx?Datos=A7XIi6dxVyy88F6VFk+aZwvT7OhvgJ8So2zMvxdzX/elmGt7llni1pxlgjOhQmFjRADq8eWNeERAySUiNM/PVDBJVsTY2yGu07lGlXY25GwjkSrMMwyuUOxkdlTsNucdovXJrV6KDf5qDiLsWq0wP1ps5F3jms/1YO/2fIQI4orKQHHRfY+8RFzTZMV0TVICPGxJn5bCQe87BixcjRmiqdSAb1Nk+/3HoVXyH+YOW6z0MWe5aFL5y/zV64a1osORkUGfGCfz+QDg+T6tQpIy5Tfn3BbXxDyw/Ma3HiieAW3MeRHV5uZ6h3RC280Ldl8pguKIuS7OrhXyOkKuvcAJ2kM1n5oojoJShc7sqoFPC083V5wU0UIa5ZToeUoU8/k3yfNYDy91JSi3PKAeoDbfokaT4AWQtZ0MJwtU+F59eDIqBgO1aFG1Yn3LsbWXf2ESNfBGX5fuUve6jGOscz18qmufid2yG+vcoveEbVb+mSHAx7srspNeoAYARr3C1zAl6zgj07kuahAyt+ihcbAosdNWZkzy9Y/2MVEk8H67uVg=

//por cada elemento buscamos el texto adentro:
for (var i = 0; i < elementos.length; i++) {
  //buscamos en el HTML
  var textoOnclick = elementos[i].outerHTML;
  //buscamos la URL relativa
  var urlRelativa = textoOnclick.match(
    /recuperaRepresentacionImpresa\(\'[^']+/,
  );
  //si la encontramos:
  if (urlRelativa.length > 0) {
    //extraemos el ID
    var id = urlRelativa[0].replace(/recuperaRepresentacionImpresa\(\'/g, "");
    var urlAbsoluta =
      "https://portalcfdi.facturaelectronica.sat.gob.mx/RepresentacionImpresa.aspx?Datos=" +
      id;
    links[1].push(urlAbsoluta);
  }
}

//array con los folios
links[2] = new Array();
var folios = document.getElementsByName("ListaFolios");
//por cada elemento buscamos la etiqueta "value"
for (var i = 0; i < folios.length; i++) {
  var folio = folios[i].attributes["value"].value;
  links[2].push(folio);
}

// console.log(links);
//enviamos el array de arrays a la ventanita, al listener
if (links[0].length > 0 && links[1].length > 0 && links[2].length > 0)
  chrome.extension.sendRequest(links);
