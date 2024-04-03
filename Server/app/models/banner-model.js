module.exports = mongoose => {
    const Banner = mongoose.model(
      "banners",
      mongoose.Schema(
        {
          img: String,
          title: String,
          description: String
        },
        { timestamps: true }
      )
    );
    return Banner;
}