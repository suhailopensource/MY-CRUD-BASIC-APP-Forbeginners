const Items = require("../models/itemsModel");

exports.createItems = async (req, res, next) => {
  try {
    const item = await Items.create(req.body);
    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Items.find();
    if (!items) {
      return res.status(404).json({
        success: false,
        message: "no notes",
      });
    }
    res.status(201).json({
      success: true,
      items,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    let item = await Items.findById(req.params.id);
    if (!item) {
      res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    item = await Items.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    let item = await Items.findById(req.params.id);
    if (!item) {
      res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    let item = await Items.findById(req.params.id);
    if (!item) {
      res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    await item.deleteOne();
    res.status(200).json({
      success: true,
      message: "item deleted sucessfully",
    });
  } catch (error) {
    console.log(error);
  }
};
