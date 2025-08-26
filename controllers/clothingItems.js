const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" });
    });
};

module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" });
      }
    });
};

module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => new Error("ItemNotFound"))
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        const err = new Error("Forbidden");
        err.name = "Forbidden";
        throw err;
      }
      return item.deleteOne();
    })
    .then(() => res.send({ message: "Item deleted" }))
    .catch((err) => {
      console.error(err);
      if (err.message === "ItemNotFound") {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else if (err.name === "Forbidden") {
        res
          .status(403)
          .send({ message: "You cannot delete someone else’s item" });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" });
      }
    });
};

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new Error("ItemNotFound"))
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.message === "ItemNotFound") {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" });
      }
    });
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new Error("ItemNotFound"))
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.message === "ItemNotFound") {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" });
      }
    });
};
