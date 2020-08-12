import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import { isUserInGroup } from "./services/groupService";

const data_uri =
  "mongodb+srv://hasagi:hasagi@cluster0.zspjy.gcp.mongodb.net/YumYum?retryWrites=true&w=majority";
require("dotenv").config();
mongoose.connect(data_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(passport.initialize());
require("./utils/passport")(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/", require("./routes"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(3000, () => console.info(`Running on 3000`));
