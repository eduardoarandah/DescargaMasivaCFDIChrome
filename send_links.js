//este script busca los arrays y los manda a la ventanita popup
var links=new Array();

//array para los XML
links[0]=new Array();
var elementos=document.getElementsByName('BtnDescarga');  
  //por cada elemento buscamos el texto adentro:
  for (var i=0; i < elementos.length; i++){    
    //buscamos en el HTML
    var textoOnclick=elementos[i].outerHTML;
    //buscamos la URL relativa con regex
    var urlRelativa=textoOnclick.match(/RecuperaCfdi[^']+/);
    //si la encontramos:
    if(urlRelativa.length>0){
      var urlAbsoluta="https://portalcfdi.facturaelectronica.sat.gob.mx/"+urlRelativa[0];      
      links[0].push(urlAbsoluta);
    }    
  } 

//array para los PDF
links[1]=new Array();
var elementos=document.getElementsByName('BtnVerDetalle');
  //por cada elemento buscamos el texto adentro:
  for (var i=0; i < elementos.length; i++){    
    //buscamos en el HTML
    var textoOnclick=elementos[i].outerHTML;
    //buscamos la URL relativa
    var urlRelativa=textoOnclick.match(/Detalle\.aspx[^']+/);
    //si la encontramos:
    if(urlRelativa.length>0){
      var urlAbsoluta="https://portalcfdi.facturaelectronica.sat.gob.mx/"+urlRelativa[0];      
      links[1].push(urlAbsoluta);
    }    
  } 

//console.log(links);
//enviamos el array de arrays a la ventanita, al listener
if(links[0].length>0 && links[1].length>0)
  chrome.extension.sendRequest(links);
