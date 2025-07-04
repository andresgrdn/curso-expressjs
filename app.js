require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LoggerMiddleware = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const { validateUser, validateUniqueUser } = require("./utils/validation");
const authenticateToken = require("./middlewares/auth");
const bcrypt = require("bcryptjs");

const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "users.json");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(LoggerMiddleware);

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

// datos de formularios
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

// datos en JSON
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

app.get("/users", (req, res) => {
    fs.readFile(usersFilePath, "utf-8", (error, data) => {
        if (error) {
            return res
                .status(500)
                .json({ error: "Error con conexión de datos." });
        }
        const users = JSON.parse(data);
        res.json(users);
    });
});

app.post("/users", (req, res) => {
    const newUser = req.body;
    fs.readFile(usersFilePath, "utf-8", (error, data) => {
        if (error) {
            return res
                .status(500)
                .json({ error: "Error con conexión de datos." });
        }
        const users = JSON.parse(data);

        const uniqueUserValidation = validateUniqueUser(newUser, users);
        if (!uniqueUserValidation.isValid) {
            return res.status(400).json({ error: validation.error });
        }

        users.push(newUser);
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (error) => {
            if (error) {
                return res
                    .status(500)
                    .json({ error: "Error al guardar el usuario." });
            }
            res.status(201).json(newUser);
        });
    });
});

app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const updatedUser = req.body;

    fs.readFile(usersFilePath, "utf-8", (error, data) => {
        if (error) {
            return res
                .status(500)
                .json({ error: "Error con conexión de datos." });
        }
        let users = JSON.parse(data);

        const userValidation = validateUser(updatedUser, users);
        if (!userValidation.isValid) {
            return res.status(400).json({ error: validation.error });
        }

        users = users.map((user) =>
            user.id === userId ? { ...user, ...updatedUser } : user
        );
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (error) => {
            if (error) {
                return res
                    .status(500)
                    .json({ error: "Error al actualizar el usuario." });
            }
            res.json(updatedUser);
        });
    });
});

app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    fs.readFile(usersFilePath, "utf-8", (error, data) => {
        if (error) {
            return res
                .status(500)
                .json({ error: "Error de conexión de datos" });
        }
        let users = JSON.parse(data);
        users = users.filter((user) => user.id !== userId);
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (error) => {
            if (error) {
                return res
                    .status(500)
                    .json({ error: "Error al eliminar usuario." });
            }
            res.status(204).json();
        });
    });
});

app.get("/error", (req, res, next) => {
    next(new Error("Error inocente"));
});

app.get("/db-users", async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: "Error al comunicarme con la base de datos.",
        });
    }
});

app.get("/protected-route", authenticateToken, (req, res) => {
    res.send("Ruta privada perra, eres una perra vip");
});

app.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { email, password: hashedPassword, name, role: "USER" },
    });

    res.status(201).json({ message: "User registered successfully" });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(
        `[${new Date().toISOString()}] [start] Corriéndose en el puerto ${PORT}`
    );
});
