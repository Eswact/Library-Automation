module.exports = mongoose => {
    const Book = mongoose.model(
      "books",
      mongoose.Schema(
        {
          name: String,
          writer: String,
          publisher: String,
          category: Number,
          isBorrowed: Boolean,
          images: Array,
          subject: String,
          ageRange: Number,
        },
        { timestamps: true }
      )
    );
    return Book;
}