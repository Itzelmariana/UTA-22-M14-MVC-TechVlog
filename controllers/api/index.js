const router = require("express").Router();
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const postRoutes = require("./postRoutes");

router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/posts", postRoutes);

module.exports = router;
