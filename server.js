const http = require("http");
const url = require("url");
const fs = require("fs");

let page404;

try {
  page404 = fs.readFileSync("404.html", "utf-8");
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('404.html not found!');
    process.exit(1); // Uygulamayı sonlandır
  } else {
    throw err;
  }
}

http.createServer(function (req, res) {
  const q = url.parse(req.url, true);
  let filename = "";
  if (q.pathname === "/") {
    filename = "." + "/index.html";
  } else {
    filename = "." + q.pathname;
  }

  try {
    const data = fs.readFileSync(filename, "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(page404);
      res.end();
    } else {
      throw err;
    }
  }
}).listen(8080);
