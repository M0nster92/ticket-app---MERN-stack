const router = require("express").Router({ mergeParams: true });
const { auth } = require("../middleware/authMiddleware");
const { getNotes, addNote } = require("../controllers/noteController");

router.get("/", auth, getNotes);
router.post("/", auth, addNote);

module.exports = router;
