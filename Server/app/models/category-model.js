module.exports = mongoose => {
    const Category = mongoose.model(
      "categories",
      mongoose.Schema(
        {
          _id: String,
          catId: Number,
          name: String
        },
        { timestamps: true }
      )
    );
    return Category;
}