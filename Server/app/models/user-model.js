module.exports = mongoose => {
    const User = mongoose.model(
      "users",
      mongoose.Schema(
        {
          username: String,
          password: String,
          role: Number,
          mail: String,
        },
        { timestamps: true }
      )
    );
    return User;
}