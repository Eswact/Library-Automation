const db = require("../models");
const writers = db.writers;

// Get all writers from the database.
const findAll = async (req, res) => {
  try {
    const writersData = await writers.find();
    res.json(writersData);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving writers." });
  }
};

// Create and Save a new writer
const createWriter = async (req, res) => {
  const latestWriter = await writers.findOne().sort({ writerId: -1 });
  newWriterId = latestWriter ? latestWriter.writerId + 1 : 1
  try {
    const newWriter = new writers({
      writerId: newWriterId,
      name: req.body.name,
    });
    const savedWriter = await newWriter.save();
    res.status(201).json(savedWriter);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the writer."
    });
  }
};

// Update a writer by the id in the request
const updateWriter = async (req, res) => {
  try {
    const writerId = req.body.id;
    const updateWriterData = {
      name: req.body.name,
    }
    const updatedWriter = await writers.findOneAndUpdate(
      { writerId: writerId },
      { $set: updateWriterData },
      { new: true }
    );
    if (!updatedWriter) {
      return res.status(404).json({ message: 'writer not found' });
    }
    res.json(updatedWriter);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating writer."
    });
  }
};

// Delete a writer with the specified id in the request
const deleteWriter = async (req, res) => {
  const id = req.params.id;
  try {
    const writerDeleteResult = await writers.deleteOne({ writerId: id });
    if (writerDeleteResult.deletedCount === 0) {
      res.status(404).send({ message: "Not found writer with id " + id });
    } else {
      res.status(200).send({ message: "writer deleted successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Could not delete writer with id=" + id });
  }
};

module.exports = {
    findAll,
    createWriter,
    updateWriter,
    deleteWriter
};
  