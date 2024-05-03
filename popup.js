var allLinks = [];

function descargarxml() {
    document.getElementById("status").textContent = "Descargando XML...";
    // Hacemos una copia de allLinks
    // luego ejecutamos un intervalo cada 1000 milisegundos para extraer un elemento del array y descargarlo
    // cuando no haya elementos, cancelar el intervalo.
    //los xml están en el array en posición 0
    var urls = allLinks[0];
    var nombres = allLinks[2];
    var interval = setInterval(function() {
        var url = urls.shift();
        var nombre = nombres.shift();
        if (url) {
            //Descargar el archivo
            chrome.downloads.download(
                {
                    url: url,
                    filename: nombre + ".xml",
                },
                function(id) {},
            );
        } else {
            clearInterval(this);
        }
    }, 1000);
}

function descargarpdf() {
    document.getElementById("status").textContent = "Descargando PDF...";

    // Hacemos una copia de allLinks
    // luego ejecutamos un intervalo cada 1000 milisegundos para extraer un elemento del array y descargarlo
    // cuando no haya elementos, cancelar el intervalo.
    //los pdf están en el array en posición 1
    var urls = allLinks[1];
    var nombres = allLinks[2];
    var interval = setInterval(function() {
        var url = urls.shift();
        var nombre = nombres.shift();
        if (url) {
            //Descargar el archivo
            chrome.downloads.download(
                {
                    url: url,
                    filename: nombre + ".pdf",
                },
                function(id) {},
            );
        } else {
            clearInterval(this);
        }
    }, 1000);
}
//listener que recibe los elaces de send_links.js
chrome.extension.onRequest.addListener(function(links) {
    allLinks = links;
    //cambiamos los textos de los botones
    document.getElementById("cuenta-xml").innerText = allLinks[0].length;
    document.getElementById("cuenta-pdf").innerText = allLinks[1].length;
});

window.onload = function() {
    //botones
    document.getElementById("descargarxml").onclick = descargarxml;
    document.getElementById("descargarpdf").onclick = descargarpdf;

    //enlaces
    document.getElementById("analizar").onclick = function() {
        chrome.tabs.create({
            url: "https://analizador-cfdi.netlify.app/",
        });
    };
    document.getElementById("iralsat").onclick = function() {
        chrome.tabs.create({
            url: "https://portalcfdi.facturaelectronica.sat.gob.mx",
        });
    };
    document.getElementById("enlace").onclick = function() {
        chrome.tabs.create({
            url: "https://eduardoarandah.github.io/",
        });
    };
    document.getElementById("manual").onclick = function() {
        chrome.tabs.create({
            url: "https://github.com/eduardoarandah/DescargaMasivaCFDIChrome",
        });
    };

    //esta función inyecta un JS a la tab activa para enviar los enlaces al listener
    chrome.windows.getCurrent(function(currentWindow) {
        chrome.tabs.query(
            {
                active: true,
                windowId: currentWindow.id,
            },
            function(activeTabs) {
                //checar si url contiene "https://portalcfdi.facturaelectronica.sat.gob.mx/"
                var url = activeTabs[0].url;
                var estamos_en_sat = url.startsWith(
                    "https://portalcfdi.facturaelectronica.sat.gob.mx",
                );
                if (estamos_en_sat) {
                    chrome.tabs.executeScript(activeTabs[0].id, {
                        file: "inject.js",
                    });
                }
            },
        );
    });
};
