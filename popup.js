var allLinks = [];
function descargarxml() {  
  document.getElementById('status').textContent = "Descargando XML...";    
  //los xml están en el array en posición 0
  for (var i=0; i < allLinks[0].length; i++){
    var liga = allLinks[0][i];
    var name = allLinks[2][i]+".xml";
    chrome.downloads.download({url: liga,filename:name},function(id){});
  }
}
function descargarpdf() {  
  document.getElementById('status').textContent = "Descargando PDF...";    
  //los xml están en el array en posición 1
  for (var i=0; i < allLinks[1].length; i++){
    var liga = allLinks[1][i];
    var name = allLinks[2][i]+".pdf";
    chrome.downloads.download({url: liga,filename:name},function(id){});
  }
}

//listener que recibe los elaces de send_links.js
chrome.extension.onRequest.addListener(function(links) {  
  //console.log("listener recibido"); console.log(links);
  allLinks=links;
  //cambiamos los textos de los botones
  document.getElementById('descargarxml').innerText="Descargar "+allLinks[0].length+" XML";
  document.getElementById('descargarpdf').innerText="Descargar "+allLinks[1].length+" PDF";

});

window.onload = function() {
document.getElementById('descargarxml').onclick = descargarxml;
document.getElementById('descargarpdf').onclick = descargarpdf;
document.getElementById('analizar').onclick = function(){chrome.tabs.create({url: 'https://analizador-cfdi.netlify.com/'});}
document.getElementById('enlace').onclick = function(){chrome.tabs.create({url: 'https://github.com/eduardoarandah'});}

//esta función agrega un JS a la tab activa para enviar los enlaces al listener
chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'send_links.js', allFrames: true});
    });
  });

};
