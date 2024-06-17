module.exports = mongoose => {
    const Request = mongoose.model(
      "rent-requests",
      mongoose.Schema(
        {
          userId: String,
          bookId: String,
        },
        { timestamps: true }
      )
    );
    return Request;
}