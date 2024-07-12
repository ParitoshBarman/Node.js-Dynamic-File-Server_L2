const fs = require("fs");
const http = require("http");

const icons = {
    folder: '&#x1F4C1;', // 📁
    file: '&#x1F5CE;'    // 🗎
};


const server = http.createServer((req, res) => {
    // console.log(req.url)
    if (req.url == "/") {
        res.setHeader("Content-type", "text/html");
        let listOfF = fs.readdirSync("./");
        let olStart = "<ol>";
        let olEnd = "</ol>";
        listOfF.forEach((itm) => {
            if (itm.includes(".")) {
                olStart += `<li><a href="/${itm}">${icons.file} ${itm}</a></li>`;

            } else {
                olStart += `<li><a href="/${itm}">${icons.folder} ${itm}</a></li>`;

            }

        })
        res.end(olStart + olEnd);
    }

    else if (req.url != "/favicon.ico" && req.url != "/.git") {

        if (req.url.includes(".")) {
            let data = fs.readFileSync(`.${req.url}`, "utf-8");
            res.end(data);
        }
        else {
            // console.log(req.url)
            res.setHeader("Content-type", "text/html");
            let listOfF = fs.readdirSync(`.${req.url}`);
            let olStart = "<ol>";
            let olEnd = "</ol>";
            listOfF.forEach((itm) => {
                if (itm.includes(".")) {
                    olStart += `<li><a href="${req.url}/${itm}">${icons.file} ${itm}</a></li>`;

                } else {
                    olStart += `<li><a href="${req.url}/${itm}">${icons.folder} ${itm}</a></li>`;

                }
            })
            res.end(olStart + olEnd);

        }

    }

    else {
        res.end("Invalid page!")
    }
})


server.listen(8080, () => {
    console.log("Server is listening 8080 port...")
})