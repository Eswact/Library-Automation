module.exports = mongoose => {
    const Publisher = mongoose.model(
      "publishers",
      mongoose.Schema(
        {
          publisherId: Number,
          name: String,
        },
        { timestamps: true }
      )
    );
    return Publisher;
}