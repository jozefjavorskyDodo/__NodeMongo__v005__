"use strict";


try {

    var ISBNs_memo = [];

    var pseudo_random_ISBN = () => {
        let return_string = '';
        while (return_string.length <= 16) {
            return_string += String(Math.floor(Math.random() * 10));
            if (
                (return_string.length === 3) ||
                (return_string.length === 5) ||
                (return_string.length === 8) ||
                (return_string.length === 15)
            ) return_string += '-';
        };
        if (ISBNs_memo.includes(return_string) === Boolean(true)) {
            pseudo_random_ISBN();
        } else {
            ISBNs_memo.push(return_string);
            return (return_string);
        };
    };

} catch (err) {
    if (err) console.log(err);
};

try {

    require("http").createServer((req, res) => {
        if (req.method === "GET") {
            require("fs").readFile("page_0.htm", (err, data) => {
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                return (res.end());
            });
        }
        else if (req.method === "POST") {
            let req_body_memo = [];
            req.on("data", (req_body_subpart_memo) => {
                req_body_memo.push(req_body_subpart_memo);
            });
            req.on("end", () => {
                let req_b = String(decodeURIComponent(require("node:buffer").Buffer.concat(req_body_memo).toString())).replaceAll('+', ' ');
                if (req_b === "initialized=true") {
                    require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                        if (err) throw err;
                        db.db("tryout_db").createCollection("books_collection", (err, rslt) => {
                            if (err) throw err;
                            db.close();
                        });
                        db.db("tryout_db").collection("books_collection").insertMany([
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "Rolling All These Nuts.",
                                author: "Phoebe Botswani"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "A Walk By Sand Trees.",
                                author: "Bukekele Mengva"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "Where Stuffing At?",
                                author: "Tomas Markowicz"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "Moonlight Wall.",
                                author: "Frederick Oline"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "That Much Hardware Of There?!",
                                author: "Cloey Nochs Naftly"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "Before Big Bangs.",
                                author: "Jeffrey Khajyti"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "Not Vanilla But Lemonish Ice...",
                                author: "Mantoli Wyjomin"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "After Vacuum.",
                                author: "Alan Von Wolfram"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "Secrets Of Voiceless Ronie.",
                                author: "Ding Yun"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "Misinterpretation And The Bug.",
                                author: "Andrew Owens"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "Clue Of The Ashed Map.",
                                author: "Jivika Matthai"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "Boogie And Skating Woogie.",
                                author: "Osvald Carti"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "Wonders Of Cuckoo's Nest.",
                                author: "Aleksej Nestorovski"
                            },
                            {
                                ISBN: `${pseudo_random_ISBN.call()}`,
                                title: "Ch-room And Where Turings At?",
                                author: "Natasha Quigley Foy"
                            }
                        ], (err, rslt) => {
                            if (err) throw err;
                            db.close();
                        });
                    });
                    require("fs").readFile("CRUD_1.htm", (err, data) => {
                        if (err) throw err;
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(data);
                        return (res.end());
                    });
                }
                else if (req_b === "operation=create") {
                    require("fs").readFile("create_add_2.htm", (err, data) => {
                        if (err) throw err;
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(data);
                        return (res.end());
                    });
                }
                else if (
                    (require("node:querystring").parse(req_b)["operation"] === "create") &&
                    (require("node:querystring").parse(req_b)["title"] !== undefined) &&
                    (require("node:querystring").parse(req_b)["author"] !== undefined)
                ) {
                    let ___req = JSON.stringify(req_b);
                    require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                        if (err) throw err;
                        db.db("tryout_db").collection("books_collection").insertOne({
                            ISBN: `${pseudo_random_ISBN()}`,
                            title: String(___req.split('&')[1].split('=')[1]),
                            author: String(___req.split('&')[2].split('=')[1].replace('"', ' ').trimEnd())
                        }, (err, rslt) => {
                            if (err) throw err;
                            db.close();
                        });
                    });
                    require("fs").readFile("CRUD_1.htm", (err, data) => {
                        if (err) throw err;
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(data);
                        return (res.end());
                    });
                }
                else if (req_b === "operation=read") {
                    require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                        if (err) throw err;
                        db.db("tryout_db").collection("books_collection").find({}).toArray((err, rslt) => {
                            if (err) throw err;
                            if (rslt.length === 0) {
                                require("fs").readFile("redirect_3.htm", (err, data) => {
                                    if (err) throw err;
                                    res.writeHead(200, { "Content-Type": "text/html" });
                                    res.write(data);
                                    return (res.end());
                                });
                                db.close();
                            } else {
                                res.writeHead(200, { "Content-Type": "text/html" });
                                res.write(`<!DOCTYPE html>` +
                                    `<html lang="en">` +
                                    `` +
                                    `<head>` +
                                    `<meta charset="UTF-8" />` +
                                    `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` +
                                    `<meta name="author" content="dodo : jozef.javorsky.strom44zem88@gmail.com" />` +
                                    `<meta name="description" content="Node.js and MongoDB tryout." />` +
                                    `<link rel="icon" type="image/x-icon" sizes="16x16"` +
                                    `href="data:image/x-icon;base64,` +
                                    `iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0` +
                                    `IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdv` +
                                    `qGQAAABdSURBVDhPvYxRDsAgDEJ7bs+9A6xJCbMVY+PHXvgQCtol4x` +
                                    `l4bUgFN01h4CSjqIXw8Q1vs2UI5pQ3GQKmIYa0DEH1C3ogZ/r040CK` +
                                    `hY/qF1IhvukIAycZxbGwwewFg9icUZ82eVoAAAAASUVORK5CYII=" />` +
                                    `<title>eLibrary v0.05</title>` +
                                    `<style>` +
                                    `#html-body {` +
                                    `background-color: rgb(122, 122, 122);` +
                                    `user-select: none;` +
                                    `}` +
                                    `` +
                                    `#header-h2 {` +
                                    `display: inline-block;` +
                                    `margin: 1mm 0 1mm 1mm;` +
                                    `border: 1mm solid rgba(0, 0, 0, 1);` +
                                    `border-radius: 3mm;` +
                                    `padding: 0 3mm 2mm 3mm;` +
                                    `box-shadow: -3mm -3mm 15mm 15mm;` +
                                    `font-family: cursive;` +
                                    `}` +
                                    `</style>` +
                                    `</head>` +
                                    `` +
                                    `<body id="html-body">` +
                                    `<header>` +
                                    `<h2 id="header-h2">eLibrary v0.05</h2>` +
                                    `</header>` +
                                    `<main id="body-main"></main>` +
                                    `<footer id="body-footer"></footer>` +
                                    `<script>` +
                                    `"use strict";` +
                                    `try {` +
                                    `let nu_info_p = document.createElement('p');` +
                                    `nu_info_p.innerHTML = "Please,<br />select ISBN for the book,<br />You want to see details of.";` +
                                    `nu_info_p.style.fontSize = "3.8mm";` +
                                    `nu_info_p.style.fontWeight = "900";` +
                                    `nu_info_p.style.color = "rgba(0, 0, 0, 1)";` +
                                    `nu_info_p.style.fontFamily = "cursive";` +
                                    `nu_info_p.style.marginLeft = "3mm";` +
                                    `nu_info_p.style.marginTop = "18mm";` +
                                    `document.querySelector("#body-main").appendChild(nu_info_p);` +
                                    `} catch (err) {` +
                                    `if (err) console.log(err);` +
                                    `};` +
                                    `</script>` +
                                    `<script>` +
                                    `"use strict";` +
                                    `try {` +
                                    `let slct_box = document.createElement("select");` +
                                    `slct_box.style.marginLeft = "3mm";` +
                                    `slct_box.setAttribute("id", "slct-box");` +
                                    `document.querySelector("#body-main").appendChild(slct_box);` +
                                    `let pseudo_placeholder = document.createElement("option");` +
                                    `pseudo_placeholder.innerText = "ISBNs :";` +
                                    `pseudo_placeholder.setAttribute("value", '');` +
                                    `pseudo_placeholder.setAttribute("disabled", "disabled");` +
                                    `pseudo_placeholder.setAttribute("hidden", "hidden");` +
                                    `pseudo_placeholder.setAttribute("selected", "selected");` +
                                    `document.querySelector("#slct-box").appendChild(pseudo_placeholder);` +
                                    `let ISBNs_arr = [...${JSON.stringify(ISBNs_memo)}];` +
                                    `ISBNs_arr.forEach(ISBN => {` +
                                    `let nu_opt = document.createElement("option");` +
                                    `nu_opt.innerText = String(ISBN);` +
                                    `nu_opt.value = String(ISBN);` +
                                    `document.querySelector("#slct-box").appendChild(nu_opt);` +
                                    `});` +
                                    `} catch (err) {` +
                                    `if (err) console.log(err);` +
                                    `};` +
                                    `</script>` +
                                    `<script>` +
                                    `"use strict";` +
                                    `try {` +
                                    `document.querySelector("#slct-box").addEventListener("input", (ev) => {` +
                                    `let selected_ISBN = String(ev.target.value);` +
                                    `ev.target.setAttribute("disabled", "disabled");` +
                                    `let booklets_arr = [...${JSON.stringify(rslt)}];` +
                                    `for (let indx_iterator in booklets_arr) {` +
                                    `if (` +
                                    `String(booklets_arr[indx_iterator]["ISBN"]) === String(selected_ISBN)` +
                                    `) {` +
                                    `let nu_nu_p = document.createElement('p');` +
                                    `nu_nu_p.innerHTML = "ISBN<br />==== " + String(booklets_arr[indx_iterator]["ISBN"]);` +
                                    `nu_nu_p.style.marginLeft = "1mm";` +
                                    `nu_nu_p.style.color = "rgba(0, 0, 0, 1)";` +
                                    `nu_nu_p.style.fontFamily = "cursive";` +
                                    `nu_nu_p.style.fontWeight = "900";` +
                                    `nu_nu_p.style.fontSize = "3.5mm";` +
                                    `document.querySelector("#body-main").appendChild(nu_nu_p);` +
                                    `let nu_nu_p_p = document.createElement('p');` +
                                    `nu_nu_p_p.innerHTML = "title<br />=== " + String(booklets_arr[indx_iterator]["title"]);` +
                                    `nu_nu_p_p.style.marginLeft = "1mm";` +
                                    `nu_nu_p_p.style.color = "rgba(0, 0, 0, 1)";` +
                                    `nu_nu_p_p.style.fontFamily = "cursive";` +
                                    `nu_nu_p_p.style.fontWeight = "900";` +
                                    `nu_nu_p_p.style.fontSize = "3.5mm";` +
                                    `document.querySelector("#body-main").appendChild(nu_nu_p_p);` +
                                    `let nu_nu_p_p_p = document.createElement('p');` +
                                    `nu_nu_p_p_p.innerHTML = "author<br />===== " + String(booklets_arr[indx_iterator]["author"]);` +
                                    `nu_nu_p_p_p.style.marginLeft = "1mm";` +
                                    `nu_nu_p_p_p.style.color = "rgba(0, 0, 0, 1)";` +
                                    `nu_nu_p_p_p.style.fontFamily = "cursive";` +
                                    `nu_nu_p_p_p.style.fontWeight = "900";` +
                                    `nu_nu_p_p_p.style.fontSize = "3.5mm";` +
                                    `document.querySelector("#body-main").appendChild(nu_nu_p_p_p);` +
                                    `let nu_nav = document.createElement("nav");` +
                                    `let nu_form = document.createElement("form");` +
                                    `nu_form.setAttribute("action", "http://localhost:5500");` +
                                    `nu_form.setAttribute("method", "post");` +
                                    `let nu_inp = document.createElement("input");` +
                                    `nu_inp.setAttribute("type", "text");` +
                                    `nu_inp.setAttribute("name", "redirect");` +
                                    `nu_inp.setAttribute("value", "true");` +
                                    `nu_inp.setAttribute("hidden", "hidden");` +
                                    `nu_form.appendChild(nu_inp);` +
                                    `let nu_bttn = document.createElement("button");` +
                                    `nu_bttn.style.marginTop = "3mm";` +
                                    `nu_bttn.style.marginLeft = "3mm";` +
                                    `nu_bttn.style.border = '0';` +
                                    `nu_bttn.style.padding = "1mm 3mm 2mm 3mm";` +
                                    `nu_bttn.style.backgroundColor = "rgb(0, 0, 0)";` +
                                    `nu_bttn.style.color = "rgba(122, 244, 122, 1)";` +
                                    `nu_bttn.style.fontFamily = "cursive";` +
                                    `nu_bttn.style.fontWeight = "900";` +
                                    `nu_bttn.style.fontSize = "4mm";` +
                                    `nu_bttn.style.borderRadius = "3mm";` +
                                    `nu_bttn.addEventListener("mouseenter", (ev) => {` +
                                    `ev.target.style.cursor = "pointer";` +
                                    `ev.target.style.backgroundColor = "rgb(122, 244, 122)";` +
                                    `ev.target.style.color = "rgba(0, 0, 0, 1)";` +
                                    `});` +
                                    `nu_bttn.addEventListener("mouseleave", (ev) => {` +
                                    `ev.target.style.backgroundColor = "rgb(0, 0, 0)";` +
                                    `ev.target.style.color = "rgba(122, 244, 122, 1)";` +
                                    `});` +
                                    `nu_bttn.setAttribute("type", "submit");` +
                                    `nu_bttn.innerText = "redirect";` +
                                    `nu_form.appendChild(nu_bttn);` +
                                    `nu_nav.appendChild(nu_form);` +
                                    `document.querySelector("#body-footer").appendChild(nu_nav);` +
                                    `break;` +
                                    `} else {` +
                                    `continue;` +
                                    `};` +
                                    `};` +
                                    `});` +
                                    `} catch (err) {` +
                                    `if (err) console.log(err);` +
                                    `};` +
                                    `</script>` +
                                    `</body>` +
                                    `` +
                                    `</html>`);
                                res.end();
                                db.close();
                            };
                        });
                    });
                }
                else if (req_b === "operation=update") {
                    require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                        if (err) throw err;
                        db.db("tryout_db").collection("books_collection").find({}).toArray((err, rslt) => {
                            if (err) throw err;
                            if (rslt.length === 0) {
                                require("fs").readFile("redirect_3.htm", (err, data) => {
                                    if (err) throw err;
                                    res.writeHead(200, { "Content-Type": "text/html" });
                                    res.write(data);
                                    return (res.end());
                                });
                                db.close();
                            } else {
                                res.writeHead(200, { "Content-Type": "text/html" });
                                res.write(`<!DOCTYPE html>` +
                                    `<html lang="en">` +
                                    `` +
                                    `<head>` +
                                    `<meta charset="UTF-8" />` +
                                    `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` +
                                    `<meta name="author" content="dodo : jozef.javorsky.strom44zem88@gmail.com" />` +
                                    `<meta name="description" content="Node.js and MongoDB tryout." />` +
                                    `<link rel="icon" type="image/x-icon" sizes="16x16"` +
                                    `href="data:image/x-icon;base64,` +
                                    `iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0` +
                                    `IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdv` +
                                    `qGQAAABdSURBVDhPvYxRDsAgDEJ7bs+9A6xJCbMVY+PHXvgQCtol4x` +
                                    `l4bUgFN01h4CSjqIXw8Q1vs2UI5pQ3GQKmIYa0DEH1C3ogZ/r040CK` +
                                    `hY/qF1IhvukIAycZxbGwwewFg9icUZ82eVoAAAAASUVORK5CYII=" />` +
                                    `<title>eLibrary v0.05</title>` +
                                    `<style>` +
                                    `#html-body {` +
                                    `background-color: rgb(122, 122, 122);` +
                                    `user-select: none;` +
                                    `}` +
                                    `` +
                                    `#header-h2 {` +
                                    `display: inline-block;` +
                                    `margin: 1mm 0 1mm 1mm;` +
                                    `border: 1mm solid rgba(0, 0, 0, 1);` +
                                    `border-radius: 3mm;` +
                                    `padding: 0 3mm 2mm 3mm;` +
                                    `box-shadow: -3mm -3mm 15mm 15mm;` +
                                    `font-family: cursive;` +
                                    `}` +
                                    `` +
                                    `.formInp {` +
                                    `width: 7.4cm;` +
                                    `color: rgba(0, 0, 0, 1);` +
                                    `border-radius: 1mm;` +
                                    `}` +
                                    `` +
                                    `.formInp::placeholder {` +
                                    `color: rgb(0, 0, 0);` +
                                    `opacity: 1;` +
                                    `}` +
                                    `` +
                                    `.formInp:focus {` +
                                    `outline: 1.4mm solid rgba(0, 0, 0, 1);` +
                                    `color: rgba(0, 0, 0, 1);` +
                                    `}` +
                                    `</style>` +
                                    `</head>` +
                                    `` +
                                    `<body id="html-body">` +
                                    `<header>` +
                                    `<h2 id="header-h2">eLibrary v0.05</h2>` +
                                    `</header>` +
                                    `<main id="body-main"></main>` +
                                    `<footer id="body-footer"></footer>` +
                                    `<script>` +
                                    `"use strict";` +
                                    `try {` +
                                    `let nu_p_info = document.createElement('p');` +
                                    `nu_p_info.innerHTML = "Please,<br />select ISBN for the book,<br />You want to edit details of.";` +
                                    `nu_p_info.style.marginTop = "16mm";` +
                                    `nu_p_info.style.marginLeft = "1cm";` +
                                    `nu_p_info.style.fontFamily = "cursive";` +
                                    `nu_p_info.style.fontWeight = "900";` +
                                    `nu_p_info.style.fontSize = "4mm";` +
                                    `nu_p_info.style.color = "rgba(0, 0, 0, 1)";` +
                                    `document.querySelector("#body-main").appendChild(nu_p_info);` +
                                    `} catch (err) {` +
                                    `if (err) console.log(err);` +
                                    `};` +
                                    `</script>` +
                                    `<script>` +
                                    `"use strict";` +
                                    `try {` +
                                    `let nu_slct_box = document.createElement("select");` +
                                    `nu_slct_box.style.marginLeft = "1cm";` +
                                    `nu_slct_box.setAttribute("id", "nu-slct-box");` +
                                    `let nu_pseudo_placeholder = document.createElement("option");` +
                                    `nu_pseudo_placeholder.innerText = "ISBNs : ";` +
                                    `nu_pseudo_placeholder.setAttribute("value", '');` +
                                    `nu_pseudo_placeholder.setAttribute("disabled", "disabled");` +
                                    `nu_pseudo_placeholder.setAttribute("hidden", "hidden");` +
                                    `nu_pseudo_placeholder.setAttribute("selected", "selected");` +
                                    `nu_slct_box.appendChild(nu_pseudo_placeholder);` +
                                    `document.querySelector("#body-main").appendChild(nu_slct_box);` +
                                    `} catch (err) {` +
                                    `if (err) console.log(err);` +
                                    `};` +
                                    `</script>` +
                                    `<script>` +
                                    `"use strict";` +
                                    `try {` +
                                    `let _ISBNs_arr_ = [];` +
                                    `_ISBNs_arr_ = [...${JSON.stringify(ISBNs_memo)}];` +
                                    `_ISBNs_arr_.forEach(ISBN => {` +
                                    `let nu_opt = document.createElement("option");` +
                                    `nu_opt.innerText = String(ISBN);` +
                                    `nu_opt.setAttribute("value", String(ISBN));` +
                                    `document.querySelector("#nu-slct-box").appendChild(nu_opt);` +
                                    `});` +
                                    `} catch (err) {` +
                                    `if (err) console.log(err);` +
                                    `};` +
                                    `</script>` +
                                    `<script>` +
                                    `"use strict";` +
                                    `try {` +
                                    `document.querySelector("#nu-slct-box").addEventListener("input", (ev) => {` +
                                    `let selected_ISBN = String(ev.target.value);` +
                                    `ev.target.setAttribute("disabled", "disabled");` +
                                    `let nu_nu_p_info = document.createElement('p');` +
                                    `nu_nu_p_info.style.marginLeft = "1cm";` +
                                    `nu_nu_p_info.style.fontFamily = "cursive";` +
                                    `nu_nu_p_info.style.fontWeight = "900";` +
                                    `nu_nu_p_info.style.fontSize = "4mm";` +
                                    `nu_nu_p_info.style.color = "rgba(0, 0, 0, 1)";` +
                                    `nu_nu_p_info.innerHTML = '"A new ISBN for the book,<br />will be auto-generated,<br />and implicitly pre-set."';` +
                                    `document.querySelector("#body-main").appendChild(nu_nu_p_info);` +
                                    `let nu_nu_info_p_p = document.createElement('p');` +
                                    `nu_nu_info_p_p.innerHTML = "hint : space ! - . ? A-Z a-z";` +
                                    `nu_nu_info_p_p.style.fontFamily = "cursive";` +
                                    `nu_nu_info_p_p.style.fontWeight = "900";` +
                                    `nu_nu_info_p_p.style.fontSize = "4mm";` +
                                    `nu_nu_info_p_p.style.display = "inline-block";` +
                                    `nu_nu_info_p_p.style.padding = "1mm";` +
                                    `nu_nu_info_p_p.style.border = "1mm solid rgba(20, 20, 20, 1)";` +
                                    `nu_nu_info_p_p.style.borderRadius = "2mm";` +
                                    `nu_nu_info_p_p.style.color = "rgba(20, 20, 20, 1)";` +
                                    `nu_nu_info_p_p.style.marginLeft = "5mm";` +
                                    `document.querySelector("#body-main").appendChild(nu_nu_info_p_p);` +
                                    `let nunu_nav = document.createElement("nav");` +
                                    `nunu_nav.setAttribute("id", "nunu-nav");` +
                                    `let nunu_form = document.createElement("form");` +
                                    `nunu_form.setAttribute("action", "http://localhost:5500");` +
                                    `nunu_form.setAttribute("method", "post");` +
                                    `nunu_form.setAttribute("id", "nunu-form");` +
                                    `nunu_nav.appendChild(nunu_form);` +
                                    `let nunu_form_inp = document.createElement("input");` +
                                    `nunu_form_inp.setAttribute("id", "nunu-form-inp");` +
                                    `let nunu_form_inp_i = document.createElement("input");` +
                                    `nunu_form_inp_i.setAttribute("id", "nunu-form-inp-i");` +
                                    `let first_brElement_break_NewLine = document.createElement("br");` +
                                    `let nunu_form_inp_inp = document.createElement("input");` +
                                    `nunu_form_inp_inp.setAttribute("id", "nunu-form-inp-inp");` +
                                    `let second_brElement_break_NewLine = document.createElement("br");` +
                                    `let third_brElement_break_NewLine = document.createElement("br");` +
                                    `let nunu_form_inp_inp_inp = document.createElement("input");` +
                                    `nunu_form_inp_inp_inp.setAttribute("id", "nunu-form-inp-inp-inp");` +
                                    `let fourth_brElement_break_NewLine = document.createElement("br");` +
                                    `let fifth_brElement_break_NewLine = document.createElement("br");` +
                                    `let nunu_form_bttn = document.createElement("button");` +
                                    `nunu_form_bttn.setAttribute("id", "nunu-form-bttn");` +
                                    `document.querySelector("#body-footer").appendChild(nunu_nav);` +
                                    `document.querySelector("#nunu-form").appendChild(nunu_form_inp);` +
                                    `document.querySelector("#nunu-form").appendChild(nunu_form_inp_i);` +
                                    `document.querySelector("#nunu-form").appendChild(first_brElement_break_NewLine);` +
                                    `document.querySelector("#nunu-form").appendChild(nunu_form_inp_inp);` +
                                    `document.querySelector("#nunu-form").appendChild(second_brElement_break_NewLine);` +
                                    `document.querySelector("#nunu-form").appendChild(third_brElement_break_NewLine);` +
                                    `document.querySelector("#nunu-form").appendChild(nunu_form_inp_inp_inp);` +
                                    `document.querySelector("#nunu-form").appendChild(fourth_brElement_break_NewLine);` +
                                    `document.querySelector("#nunu-form").appendChild(fifth_brElement_break_NewLine);` +
                                    `document.querySelector("#nunu-form").appendChild(nunu_form_bttn);` +
                                    `document.querySelector("#nunu-nav").style.marginLeft = "1mm";` +
                                    `document.querySelector("#nunu-form-inp").setAttribute("type", "text");` +
                                    `document.querySelector("#nunu-form-inp").setAttribute("name", "operation");` +
                                    `document.querySelector("#nunu-form-inp").setAttribute("value", "update");` +
                                    `document.querySelector("#nunu-form-inp").setAttribute("hidden", "hidden");` +
                                    `document.querySelector("#nunu-form-inp-i").setAttribute("type", "text");` +
                                    `document.querySelector("#nunu-form-inp-i").setAttribute("name", "ISBN");` +
                                    `document.querySelector("#nunu-form-inp-i").setAttribute("value", String(selected_ISBN));` +
                                    `document.querySelector("#nunu-form-inp-i").setAttribute("hidden", "hidden");` +
                                    `document.querySelector("#nunu-form-inp-inp").setAttribute("type", "text");` +
                                    `document.querySelector("#nunu-form-inp-inp").setAttribute("placeholder", "title");` +
                                    `document.querySelector("#nunu-form-inp-inp").setAttribute("name", "title");` +
                                    `document.querySelector("#nunu-form-inp-inp").setAttribute("value", '');` +
                                    `document.querySelector("#nunu-form-inp-inp").setAttribute("class", "formInp");` +
                                    `document.querySelector("#nunu-form-inp-inp").setAttribute("maxlength", "22");` +
                                    `document.querySelector("#nunu-form-inp-inp-inp").setAttribute("type", "text");` +
                                    `document.querySelector("#nunu-form-inp-inp-inp").setAttribute("placeholder", "author");` +
                                    `document.querySelector("#nunu-form-inp-inp-inp").setAttribute("name", "author");` +
                                    `document.querySelector("#nunu-form-inp-inp-inp").setAttribute("value", '');` +
                                    `document.querySelector("#nunu-form-inp-inp-inp").setAttribute("class", "formInp");` +
                                    `document.querySelector("#nunu-form-inp-inp-inp").setAttribute("maxlength", "22");` +
                                    `document.querySelector("#nunu-form-bttn").setAttribute("type", "submit");` +
                                    `document.querySelector("#nunu-form-bttn").innerText = "edit ~ update";` +
                                    `document.querySelector("#nunu-form-bttn").style.border = '0';` +
                                    `document.querySelector("#nunu-form-bttn").style.padding = "1mm 3mm 2mm 3mm";` +
                                    `document.querySelector("#nunu-form-bttn").style.marginLeft = "2cm";` +
                                    `document.querySelector("#nunu-form-bttn").style.fontFamily = "cursive";` +
                                    `document.querySelector("#nunu-form-bttn").style.fontWeight = "900";` +
                                    `document.querySelector("#nunu-form-bttn").style.fontSize = "4mm";` +
                                    `document.querySelector("#nunu-form-bttn").style.backgroundColor = "rgb(0, 0, 0)";` +
                                    `document.querySelector("#nunu-form-bttn").style.color = "rgba(122, 244, 122, 1)";` +
                                    `document.querySelector("#nunu-form-bttn").style.borderRadius = "3mm";` +
                                    `document.querySelector("#nunu-form-bttn").style.visibility = "hidden";` +
                                    `document.querySelector("#nunu-form-bttn").addEventListener("mouseenter", (ev) => {` +
                                    `ev.target.style.cursor = "pointer";` +
                                    `ev.target.style.backgroundColor = "rgb(122, 244, 122)";` +
                                    `ev.target.style.color = "rgba(0, 0, 0, 1)";` +
                                    `});` +
                                    `document.querySelector("#nunu-form-bttn").addEventListener("mouseleave", (ev) => {` +
                                    `ev.target.style.backgroundColor = "rgb(0, 0, 0)";` +
                                    `ev.target.style.color = "rgba(122, 244, 122, 1)";` +
                                    `});` +
                                    `let node_inps = document.querySelectorAll(".formInp");` +
                                    `node_inps.forEach(inp => {` +
                                    `inp.addEventListener("input", (e) => {` +
                                    `let val_arr = [...e.target.value].map(char => Number(char.charCodeAt()));` +
                                    `for (let indx_iterator = 0; indx_iterator <= val_arr.length - 1; indx_iterator++) {` +
                                    `if (` +
                                    `(val_arr[indx_iterator] === Number(32)) ||` +
                                    `(val_arr[indx_iterator] === Number(33)) ||` +
                                    `(val_arr[indx_iterator] === Number(45)) ||` +
                                    `(val_arr[indx_iterator] === Number(46)) ||` +
                                    `(val_arr[indx_iterator] === Number(63)) ||` +
                                    `((val_arr[indx_iterator] > Number(64)) && (val_arr[indx_iterator] < Number(91))) ||` +
                                    `((val_arr[indx_iterator] > Number(96)) && (val_arr[indx_iterator] < Number(123)))` +
                                    `) {` +
                                    `continue;` +
                                    `} else {` +
                                    `e.target.value = '';` +
                                    `break;` +
                                    `}` +
                                    `};` +
                                    `if (` +
                                    `(node_inps[0].value !== '') &&` +
                                    `(node_inps[1].value !== '')` +
                                    `) {` +
                                    `document.querySelector("#nunu-form-bttn").style.visibility = "visible";` +
                                    `} else {` +
                                    `document.querySelector("#nunu-form-bttn").style.visibility = "hidden";` +
                                    `};` +
                                    `});` +
                                    `});` +
                                    `});` +
                                    `} catch (err) {` +
                                    `if (err) console.log(err);` +
                                    `};` +
                                    `</script>` +
                                    `</body>` +
                                    `` +
                                    `</html>`);
                                res.end();
                                db.close();
                            };
                        });
                    });
                }
                else if (
                    (require("node:querystring").parse(req_b)["operation"] === "update") &&
                    (require("node:querystring").parse(req_b)["ISBN"] !== undefined) &&
                    (require("node:querystring").parse(req_b)["title"] !== undefined) &&
                    (require("node:querystring").parse(req_b)["author"] !== undefined)
                ) {
                    let del_memo = Number(0);
                    for (let indx_iterator = 0; indx_iterator <= ISBNs_memo.length - 1; indx_iterator++) {
                        if (
                            (String(ISBNs_memo[indx_iterator]) === String(require("node:querystring").parse(req_b)["ISBN"]))
                        ) {
                            del_memo = Number(indx_iterator);
                            break;
                        } else {
                            continue;
                        };
                    };
                    ISBNs_memo.splice(del_memo, Number(1));
                    let ____req = JSON.stringify(req_b);
                    require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                        if (err) throw err;
                        db.db("tryout_db").collection("books_collection").updateOne({
                            ISBN: String(require("node:querystring").parse(req_b)["ISBN"])
                        }, {
                            $set: {
                                ISBN: String(`${pseudo_random_ISBN.call()}`),
                                title: String(____req.split('&')[2].split('=')[1]),
                                author: String(____req.split('&')[3].split('=')[1].replace('"', ' ').trimEnd())
                            }
                        }, (err, rslt) => {
                            if (err) throw err;
                            db.close();
                        });
                    });
                    require("fs").readFile("CRUD_1.htm", (err, data) => {
                        if (err) throw err;
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(data);
                        return (res.end());
                    });
                }
                else if (req_b === "operation=delete") {
                    require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                        if (err) throw err;
                        db.db("tryout_db").collection("books_collection").find({}).toArray((err, rslt) => {
                            if (err) throw err;
                            if (rslt.length === 0) {
                                require("fs").readFile("redirect_3.htm", (err, data) => {
                                    if (err) throw err;
                                    res.writeHead(200, { "Content-Type": "text/html" });
                                    res.write(data);
                                    return (res.end());
                                });
                                db.close();
                            } else {
                                res.writeHead(200, { "Content-Type": "text/html" });
                                res.write(`<!DOCTYPE html>` +
                                    `<html lang="en">` +
                                    `` +
                                    `<head>` +
                                    `<meta charset="UTF-8" />` +
                                    `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` +
                                    `<meta name="author" content="dodo : jozef.javorsky.strom44zem88@gmail.com" />` +
                                    `<meta name="description" content="Node.js and MongoDB tryout." />` +
                                    `<link rel="icon" type="image/x-icon" sizes="16x16"` +
                                    `href="data:image/x-icon;base64,` +
                                    `iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0` +
                                    `IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdv` +
                                    `qGQAAABdSURBVDhPvYxRDsAgDEJ7bs+9A6xJCbMVY+PHXvgQCtol4x` +
                                    `l4bUgFN01h4CSjqIXw8Q1vs2UI5pQ3GQKmIYa0DEH1C3ogZ/r040CK` +
                                    `hY/qF1IhvukIAycZxbGwwewFg9icUZ82eVoAAAAASUVORK5CYII=" />` +
                                    `<title>eLibrary v0.05</title>` +
                                    `<style>` +
                                    `#html-body {` +
                                    `background-color: rgb(122, 122, 122);` +
                                    `user-select: none;` +
                                    `}` +
                                    `` +
                                    `#header-h2 {` +
                                    `display: inline-block;` +
                                    `margin: 1mm 0 1mm 1mm;` +
                                    `border: 1mm solid rgba(0, 0, 0, 1);` +
                                    `border-radius: 3mm;` +
                                    `padding: 0 3mm 2mm 3mm;` +
                                    `box-shadow: -3mm -3mm 15mm 15mm;` +
                                    `font-family: cursive;` +
                                    `}` +
                                    `</style>` +
                                    `</head>` +
                                    `` +
                                    `<body id="html-body">` +
                                    `<header>` +
                                    `<h2 id="header-h2">eLibrary v0.05</h2>` +
                                    `</header>` +
                                    `<main id="body-main"></main>` +
                                    `<footer id="body-footer"></footer>` +
                                    `<script>` +
                                    `"use strict";` +
                                    `try {` +
                                    `let nu_p_info = document.createElement('p');` +
                                    `nu_p_info.innerHTML = "Please,<br />select ISBN of the book,<br />which You want to get removed.";` +
                                    `nu_p_info.style.marginLeft = "3mm";` +
                                    `nu_p_info.style.marginTop = "18mm";` +
                                    `nu_p_info.style.fontFamily = "cursive";` +
                                    `nu_p_info.style.fontWeight = "900";` +
                                    `nu_p_info.style.fontSize = "4mm";` +
                                    `nu_p_info.style.color = "rgba(0, 0, 0, 1)";` +
                                    `document.querySelector("#body-main").appendChild(nu_p_info);` +
                                    `} catch (err) {` +
                                    `if (err) console.log(err);` +
                                    `};` +
                                    `</script>` +
                                    `<script>` +
                                    `"use strict";` +
                                    `try {` +
                                    `let nununu_slct_box = document.createElement("select");` +
                                    `nununu_slct_box.style.marginLeft = "3mm";` +
                                    `nununu_slct_box.setAttribute("id", "nununu-slct-box");` +
                                    `document.querySelector("#body-footer").appendChild(nununu_slct_box);` +
                                    `let nununu_pseudo_placeholder = document.createElement("option");` +
                                    `nununu_pseudo_placeholder.innerText = "ISBN : ";` +
                                    `nununu_pseudo_placeholder.setAttribute("value", '');` +
                                    `nununu_pseudo_placeholder.setAttribute("hidden", "hidden");` +
                                    `nununu_pseudo_placeholder.setAttribute("selected", "selected");` +
                                    `nununu_pseudo_placeholder.setAttribute("disabled", "disabled");` +
                                    `document.querySelector("#nununu-slct-box").appendChild(nununu_pseudo_placeholder);` +
                                    `} catch (err) {` +
                                    `if (err) console.log(err);` +
                                    `};` +
                                    `</script>` +
                                    `<script>` +
                                    `"use strict";` +
                                    `try {` +
                                    `let ISBNs_arr = [...${JSON.stringify(ISBNs_memo)}];` +
                                    `ISBNs_arr.forEach(ISBN => {` +
                                    `let nununu_opt = document.createElement("option");` +
                                    `nununu_opt.innerText = String(ISBN);` +
                                    `nununu_opt.setAttribute("value", String(ISBN));` +
                                    `document.querySelector("#nununu-slct-box").appendChild(nununu_opt);` +
                                    `});` +
                                    `} catch (err) {` +
                                    `if (err) console.log(err);` +
                                    `};` +
                                    `</script>` +
                                    `<script>` +
                                    `"use strict";` +
                                    `try {` +
                                    `document.querySelector("#nununu-slct-box").addEventListener("input", (ev) => {` +
                                    `let selected_removal_ISBN = String(ev.target.value);` +
                                    `ev.target.setAttribute("disabled", "disabled");` +
                                    `let nununu_nav = document.createElement("nav");` +
                                    `let nununu_form = document.createElement("form");` +
                                    `nununu_form.setAttribute("action", "http://localhost:5500");` +
                                    `nununu_form.setAttribute("method", "post");` +
                                    `nununu_form.setAttribute("id", "nununu-form");` +
                                    `nununu_nav.appendChild(nununu_form);` +
                                    `document.querySelector("#body-footer").appendChild(nununu_nav);` +
                                    `let nununu_form_inp = document.createElement("input");` +
                                    `nununu_form_inp.setAttribute("type", "text");` +
                                    `nununu_form_inp.setAttribute("name", "operation");` +
                                    `nununu_form_inp.setAttribute("value", "delete");` +
                                    `nununu_form_inp.setAttribute("hidden", "hidden");` +
                                    `document.querySelector("#nununu-form").appendChild(nununu_form_inp);` +
                                    `let nununu_form_inp_inp = document.createElement("input");` +
                                    `nununu_form_inp_inp.setAttribute("type", "text");` +
                                    `nununu_form_inp_inp.setAttribute("name", "ISBN");` +
                                    `nununu_form_inp_inp.setAttribute("value", String(selected_removal_ISBN));` +
                                    `nununu_form_inp_inp.setAttribute("hidden", "hidden");` +
                                    `document.querySelector("#nununu-form").appendChild(nununu_form_inp_inp);` +
                                    `let nununu_form_bttn = document.createElement("button");` +
                                    `nununu_form_bttn.setAttribute("type", "submit");` +
                                    `nununu_form_bttn.innerText = "delete ~ remove";` +
                                    `nununu_form_bttn.style.marginLeft = "1cm";` +
                                    `nununu_form_bttn.style.color = "rgba(122, 244, 122, 1)";` +
                                    `nununu_form_bttn.style.backgroundColor = "rgb(0, 0, 0)";` +
                                    `nununu_form_bttn.style.padding = "1mm 3mm 2mm 3mm";` +
                                    `nununu_form_bttn.style.border = '0';` +
                                    `nununu_form_bttn.style.borderRadius = "3mm";` +
                                    `nununu_form_bttn.style.fontFamily = "cursive";` +
                                    `nununu_form_bttn.style.fontWeight = "900";` +
                                    `nununu_form_bttn.style.fontSize = "4mm";` +
                                    `nununu_form_bttn.style.marginTop = "5mm";` +
                                    `nununu_form_bttn.addEventListener("mouseenter", (e) => {` +
                                    `e.target.style.cursor = "pointer";` +
                                    `e.target.style.backgroundColor = "rgb(122, 244, 122)";` +
                                    `e.target.style.color = "rgba(0, 0, 0, 1)";` +
                                    `});` +
                                    `nununu_form_bttn.addEventListener("mouseleave", (e) => {` +
                                    `e.target.style.backgroundColor = "rgb(0, 0, 0)";` +
                                    `e.target.style.color = "rgba(122, 244, 122, 1)";` +
                                    `});` +
                                    `document.querySelector("#nununu-form").appendChild(nununu_form_bttn);` +
                                    `});` +
                                    `} catch (err) {` +
                                    `if (err) console.log(err);` +
                                    `};` +
                                    `</script>` +
                                    `</body>` +
                                    `` +
                                    `</html>`);
                                res.end();
                                db.close();
                            };
                        });
                    });
                }
                else if (req_b.length === Number(39)) {
                    let select_ISBN_pseudo_copy = String(JSON.stringify(req_b)).split('&')[1].split('=')[1].replace('"', ' ').trimEnd();
                    let indx_memo = Number(0);
                    for (let indx_iterator = 0; indx_iterator <= ISBNs_memo.length - 1; indx_iterator++) {
                        if (String(ISBNs_memo[indx_iterator]) === select_ISBN_pseudo_copy) {
                            indx_memo = Number(indx_iterator);
                            break;
                        } else {
                            continue;
                        };
                    };
                    ISBNs_memo.splice(indx_memo, Number(1));
                    require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                        if (err) throw err;
                        db.db("tryout_db").collection("books_collection").deleteOne(
                            {
                                ISBN: select_ISBN_pseudo_copy
                            },
                            (err, rslt) => {
                                if (err) throw err;
                                db.close();
                            });
                    });
                    require("fs").readFile("CRUD_1.htm", (err, data) => {
                        if (err) throw err;
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(data);
                        return (res.end());
                    });
                }
                else if (req_b === "redirect=true") {
                    require("fs").readFile("CRUD_1.htm", (err, data) => {
                        if (err) throw err;
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(data);
                        return (res.end());
                    });
                }
                else { };
            });
        }
        else { };
    }).listen(5500);

} catch (err) {
    if (err) console.log(err);
};