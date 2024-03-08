const express = require("express");
const path = require("path");
const blogRoutes = require("./routes/routes");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/", blogRoutes);
app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (err, req, res, next) {
  res.status(500).render("500");
});
app.listen(3000);
