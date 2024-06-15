const db = require("../models");
const publishers = db.publishers;

// Get all publishers from the database.
const findAll = async (req, res) => {
  try {
    const publishersData = await publishers.find();
    res.json(publishersData);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving publishers." });
  }
};

// Create and Save a new publisher
const createPublisher = async (req, res) => {
  const latestPublisher = await publishers.findOne().sort({ publisherId: -1 });
  newPublisherId = latestPublisher ? latestPublisher.publisherId + 1 : 1
  try {
    const newPublisher = new publishers({
      publisherId: newPublisherId,
      name: req.body.name,
    });
    const savedPublisher = await newPublisher.save();
    res.status(201).json(savedPublisher);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the publisher."
    });
  }
};

// Update a publisher by the id in the request
const updatePublisher = async (req, res) => {
  try {
    const publisherId = req.body.id;
    const updatePublisherData = {
      name: req.body.name,
    }
    const updatedPublisher = await publishers.findOneAndUpdate(
      { publisherId: publisherId },
      { $set: updatePublisherData },
      { new: true }
    );
    if (!updatedPublisher) {
      return res.status(404).json({ message: 'publisher not found' });
    }
    res.json(updatedPublisher);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating publisher."
    });
  }
};

// Delete a publisher with the specified id in the request
const deletePublisher = async (req, res) => {
  const id = req.params.id;
  try {
    const publisherDeleteResult = await publishers.deleteOne({ publisherId: id });
    if (publisherDeleteResult.deletedCount === 0) {
      res.status(404).send({ message: "Not found publisher with id " + id });
    } else {
      res.status(200).send({ message: "publisher deleted successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Could not delete publisher with id=" + id });
  }
};

module.exports = {
    findAll,
    createPublisher,
    updatePublisher,
    deletePublisher
};
  