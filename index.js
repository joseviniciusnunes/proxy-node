const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const url = "https://my-json-server.typicode.com";

app.use(async (req, res, next) => {
    console.log(req.method, " -> ", req.originalUrl);

    try {
        const response = await axios({
            url: `${url}${req.originalUrl}`,
            method: req.method,
            data: req.body,
            headers: {
                authorization: req.headers["authorization"] ?? "",
                "device-id": req.headers["device-id"] ?? "",
            },
        });

        return res.status(response.status).send(response.data);
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).send(error.response.data);
        }
        return res.status(500).send("Proxy error: " + error.message);
    }
});

app.listen(3001, () => console.log("Proxy on 3001"));
