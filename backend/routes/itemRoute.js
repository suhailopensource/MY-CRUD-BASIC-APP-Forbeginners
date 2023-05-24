const express = require("express");
const {
  createItems,
  getAllItems,
  updateNote,
  getSingleProduct,
  deleteItem,
} = require("../controllers/itemController");
const router = express.Router();

router.route("/items").get(getAllItems);
router.route("/item/new").post(createItems);
router
  .route("/item/:id")
  .put(updateNote)
  .get(getSingleProduct)
  .delete(deleteItem);

module.exports = router;
