module.exports = mongoose => {
    const Writer = mongoose.model(
      "writers",
      mongoose.Schema(
        {
          writerId: Number,
          name: String,
        },
        { timestamps: true }
      )
    );
    return Writer;
}