import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import { group } from "console";
import groupModel from "./models/groups";

const data_uri =
  "mongodb+srv://hasagi:hasagi@cluster0.zspjy.gcp.mongodb.net/YumYum?retryWrites=true&w=majority";

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

app.get("/", (req, res) => {
  res.send("YES");
});

app.use("/api/", require("./routes"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

groupModel.createGroup("Com chien", "5f2b9f2408c32300174f2764", "f12344");
app.listen(3000, () => console.info(`Running on 3000`));
