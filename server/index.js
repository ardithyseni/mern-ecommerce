const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");

// initialize app
const app = express();
// db

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
})
    .then(() => console.log(`DB Connected`))
    .catch(err => console.log(`Database connection error`, err));

// middlewares

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "3mb" }));
app.use(cors());

// routes in routes folder
// app.use('/api', authRoutes) // api prefix

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));


// server port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
