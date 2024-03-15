const fs = require('fs');
const pdf = require('pdf-parse');
async ()=>{await fs.rm("texto2.txt")}
 
new Promise((res,req)=>res(leePDFs()))
    .then((archivos)=>{
        console.log(archivos);
        archivos.forEach((element) => {
            let dataBuffer = fs.readFileSync(`./pdfs/${element}`);
            pdf(dataBuffer)
            .then(function(data) {
                // PDF text
                const texto = data.text;
                //console.log(JSON.stringify(texto));
                //console.log("----------------------");
                let resultados =  
                    texto.match(/[$]\s(\d*)(,*)(\d*\s*)\.\d{2}/g).map(
                        (element)=>{
                            return element.replace(/[$,\s]/g, '')
                        }
                    )
                const djIIBB = {
                    "CUIT":texto.match(/((\d\d-\d{8}-\d))/g)[0],
                    "Periodo": texto.match(/(\d?\d\s-\s\d{4})/g).map((element)=>element.replace(/\s/g,""))[0],
                    "Base imponible":resultados[7],
                    "Rubro I":{
                        "Anticipo determinado":resultados[8],
                        "Retenciones":resultados[0],
                        "Percepciones":resultados[1],
                        "Pagos a cuenta":resultados[2],
                        "Saldos a favor":resultados[3],
                        "Otros creditos":resultados[4],
                        "Subtotal a favor DGR":resultados[5],
                        "Subtotal a favor del contribuyente":resultados[6]
                    },
                    "Rubro II":{
                        "Saldo del impuesto que se ingresa":resultados[18],
                        "Coeficiente de interes":resultados[17],
                        "Total importe a ingresar":resultados[20],
                        "Total a pagar":resultados[19]
                    }
                }
                console.log(JSON.stringify(djIIBB));
                fs.promises.writeFile(`./pdfs/${element}`.slice(0,-4)+".json",JSON.stringify(djIIBB));
                console.log(`${element} : Dj cargada`);
            })
            .catch((e)=> {
                console.log(e);
            });
        });
    })
    .catch((e)=>console.log(e));



function leePDFs(){
    const path = require('path');
    const directorio = './pdfs'; // Reemplaza con la ruta a tu carpeta

    // Lee el contenido del directorio
    return new Promise((resolve, reject) => {
        fs.readdir(directorio, (error, archivos) => {
            if (error) {
                console.error('Error al leer el directorio:', error);
                return;
            }

            // Filtra solo los archivos PDF
            const archivosPDF = archivos.filter(archivo => {
                const extension = path.extname(archivo);
                return extension.toLowerCase() === '.pdf';
            });
            resolve (archivosPDF);
        });
    });
}