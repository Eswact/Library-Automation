module.exports = mongoose => {
    const Book = mongoose.model(
      "books",
      mongoose.Schema(
        {
          _id: String,
          name: String,
          writer: String,
          category: Number,
          image: String
        },
        { timestamps: true }
      )
    );
    return Book;
}