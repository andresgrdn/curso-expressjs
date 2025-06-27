const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(`
            <h1>Holas perras desde mi server...</h1>
            <p>Esta es una app perraaassssss</p>
            <p>y se corre en el puerto ${PORT}</p>
            <p>Nueva perra en la ciudad aaaaaaaaaaaaaaaaaaaa................222</p>
        `);
});

app.listen(PORT, () => {
    console.log(`App corriendose en el puerto ${PORT}!`);
});
