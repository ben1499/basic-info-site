import http from "http";
import fs from "fs";

http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost:8080")
    let filename = null;
    if (url.pathname === "/") filename = "./index.html"
    else filename = "." + url.pathname + ".html"
    
    fs.readFile(filename, (err, data) => {
        if (err) {
            return fs.readFile("./404.html", (err, data) => {
                if (err) {
                    throw err;
                }
                res.writeHead(404, {"Content-Type": "text/html"});
                res.write(data);
                return res.end();
            })
        }
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        return res.end();
    })
}).listen(8080)