module.exports = mongoose => {
    const borrowedBooks = mongoose.model(
      "borrowed-books",
      mongoose.Schema(
        {
          userId: String,
          bookId: String,
          state: Boolean,
          rentStart: Date,
          rentEnd: Date
        },
        { timestamps: true }
      )
    );
    return borrowedBooks;
}