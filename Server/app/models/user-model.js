module.exports = mongoose => {
    const User = mongoose.model(
      "users",
      mongoose.Schema(
        {
          username: String,
          password: String,
          role: Number
        },
        { timestamps: true }
      )
    );
    return User;
}