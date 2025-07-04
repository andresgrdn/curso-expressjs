const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `[${new Date().toISOString()}] [ srt ] server running on [port ${PORT}]`
    );
});
