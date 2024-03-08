const express = require("express");
const app = express();
const router = express.Router();
const uuid = require("uuid");
const blog = require("../util/blog-data");

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/blog", async (req, res) => {
  const storedBlogs = await blog.getReadFile();
  res.render("blog", { storedBlogs });
});

router.get("/blog/:id", async function (req, res) {
  const params = req.params;
  const storedBlogs = await blog.getReadFile();
  for (const blog of storedBlogs) {
    if (blog.id === params.id) {
      res.render("blog-story", { blog });
    }
  }
  res.render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});
router.post("/recommend", async function (req, res) {
  const blogs = req.body;
  blogs.id = uuid.v4();
  const storedBlogs = await blog.getReadFile();
  storedBlogs.push(blogs);
  await blog.getWriteFile(storedBlogs);
  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
