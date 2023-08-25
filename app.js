import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import exphbs from "express-handlebars";
dotenv.config();

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.routes.js";

const app = express();

// Obtener la ruta del directorio actual
const currentDirectory = path.dirname(new URL(import.meta.url).pathname);

// view engine setup
const handlebars = exphbs.create({
    layoutsDir: path.join(currentDirectory, "views"),
    partialsDir: path.join(currentDirectory, "views/partials"),
});
app.engine(".hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(currentDirectory, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// exponemos los archivos estáticos
app.use(express.static(path.join(currentDirectory, "public")));
app.use(express.static(path.join(currentDirectory, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(currentDirectory, "node_modules/axios/dist")));
app.use(express.static(path.join(currentDirectory, "node_modules/toastr/build")));
app.use(express.static(path.join(currentDirectory, "node_modules/jquery/dist")));

app.use("/", indexRouter);
app.use("/api/", authRouter);
app.use(usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

export default app;
