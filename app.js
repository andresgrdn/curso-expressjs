require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(`
            <h1>Holas perras desde mi server...</h1>
            <p>Esta es una app perraaassssss</p>
            <p>y se corre en el puerto ${PORT}</p>
            <p>Nueva perra en la ciudad aaaaaaaaaaaaaaaaaaaa................222</p>
        `);
});

//  ruta dinámica
app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`Mostrar info del usuario con id: ${userId}`);
});

// parámetros query
app.get("/search", (req, res) => {
    const terms = req.query.termino || "No especificado";
    const category = req.query.categoria || "Todas";

    res.send(`
            <h2>Resultado de búsqueda:</h2>
            <p>Termino: ${terms}</p>
            <p>Categoría: ${category}</p>
        `);
});

app.post("/form", (req, res) => {
    const name = req.body.nombre || "Anó nimo";
    const email = req.body.email || "No proporcionade";

    res.json({
        message: "datos recibidos",
        data: {
            name,
            email,
        },
    });
});

app.post("/api/data", (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: "No tengo eso perro" });
    }

    res.status(201).json({
        message: "Datos JSON recibidos",
        data,
    });
});


app.listen(PORT, () => {
    console.log(`App corriendose en el puerto ${PORT}!`);
});
