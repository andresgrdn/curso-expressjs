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
            <h2>Resultado de busqueda:</h2>
            <p>Termino: ${terms}</p>
            <p>Categoría: ${category}</p>
        `);
});


app.listen(PORT, () => {
    console.log(`App corriendose en el puerto ${PORT}!`);
});
