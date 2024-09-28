import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url"; 

var isPasswordCorrect = false;
const app = express();
const port = 3010;

const __dirname = dirname(fileURLToPath(import.meta.url));

//Uwaga, nie trzeba używać osobnego bodyParser, ta funkcja jest wewnąrz express
// zamiast: app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));

//Hasło: ILoveProgramming
function checkPassword(req, res, next) {
    isPasswordCorrect = false;
    if (req.body["password"] === "ILoveProgramming") {
        isPasswordCorrect = true;
        };
    next();
}

app.use(checkPassword);

app.get("/", (req, res) => {
    console.log("Get / was used")
    res.sendFile(__dirname + `/public/index.html`);
})

app.post("/check", (req, res) => {
console.log("post /check was used");
if (isPasswordCorrect) {
    res.sendFile(__dirname + `/public/secret.html`)
} else {
    res.sendFile(__dirname + `/public/index.html`);
    // lub: res.redirect("/")
}
})

app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});