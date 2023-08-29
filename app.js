import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
dotenv.config();

import indexRouter from "./routes/index.routes.js";
import authRouter from "./routes/auth.routes.js";
import usersRouter from "./routes/users.routes.js";
import parentDirectory from "./utils/utils.js";

const app = express();

app.engine("handlebars",engine());
app.set("view engine","handlebars")
app.set("views",path.resolve(parentDirectory + "/views"))

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// exponemos los archivos estáticos
app.use(express.static(path.join(parentDirectory, "public")));
app.use(express.static(path.join(parentDirectory, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(parentDirectory, "node_modules/axios/dist")));
app.use(express.static(path.join(parentDirectory, "node_modules/toastr/build")));
app.use(express.static(path.join(parentDirectory, "node_modules/jquery/dist")));

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
