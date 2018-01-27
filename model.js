const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  favorites: [
    {
      id: Number,
      img: String,
      shoeUrl: String,
      brandedName: String
    }
  ]
});

UserSchema.methods.apiRepr = function() {
  return {
    username: this.username || "",
    firstName: this.firstName || "",
    lastName: this.lastName || "",
    favorites: this.favorites || []
  };
};

UserSchema.methods.apiFavorites = function() {
  return {
    favorites: this.favorites || []
  };
};

UserSchema.methods.isIteminFavorites = function(id) {
  return this.favorites.find(function(item) {
    return item.id == id;
  });
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
