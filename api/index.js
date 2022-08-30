const express = require("express");
const chrome = require("chrome-aws-lambda");
const RaySo = require("rayso-api");
const app = express();

app.use(express.json());

app.get("/api", async (req, res) => {
    if (!req.query.code) {
        res.status(400);
        res.json({error: "code query parameter is missing."});
        return;
    }
    const raySo = new RaySo({
        title: req.query.title,
        theme: req.query.theme,
        padding: req.query.padding,
        language: req.query.language,
        background: req.query.background,
        darkMode: req.query.darkMode,
        browserPath: process.env.NODE_ENV !== "development" ? await chrome.executablePath : "/bin/chromium",
    });
    raySo
        .cook(`${req.query.code}`)
        .then((response) => {
            res.end(response, "binary");
        })
        .catch((err) => {
            console.error(err);
        });
});

app.post("/api", async (req, res) => {
    if (!req.body.code) {
        res.status(400);
        res.json({error: "Body cannot be empty or missing code parameter."});
        return;
    }
    const raySo = new RaySo({
        title: req.body.title,
        theme: req.body.theme,
        padding: req.body.padding,
        language: req.body.language,
        background: req.body.background,
        darkMode: req.body.darkMode,
        browserPath: process.env.NODE_ENV !== "development" ? await chrome.executablePath : "/bin/chromium",
    });
    raySo
        .cook(`${req.body.code}`)
        .then((response) => {
            res.end(response, "binary");
        })
        .catch((err) => {
            console.error(err);
        });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app listening`);
});

module.exports = app;
