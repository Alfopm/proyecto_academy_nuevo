const http = require('http');
let url = require('url')
var fs = require('fs');
let objRead;

let readJsonDB = () => {
    let readFile = fs.readFileSync("db.json");
    objRead = JSON.parse(readFile)
    return objRead
}




let firstServer = () => {
    let server = http.createServer(function (req, res) {
        let jsonDB = readJsonDB()

        const query = req.url;
        let id = query.slice(10)
        
        if (req.url === "/articles") {
            if (typeof jsonDB === "object") {
                let dbToString = JSON.stringify(jsonDB)
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end("<p>" + dbToString + "</p>")
            } else {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<p>Ocurrió un problema</p>")
            }
        }
        else if (req.url === `/articles/${id}`) {
            const found = jsonDB.find(element => element.id === id);

            if (found !== undefined) {
                let mostrar = JSON.stringify(found)
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end("<p>" + mostrar + "</p>")
            }
            else {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<p> No existe ese articulo</p>")
            }
        }
        else {

            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<p>Pagina no encontrada</p>");
        }
    });
    server.listen(8080);

    // mensaje de espera
    console.log("Esperando request en el puerto 8080")
}

firstServer()

