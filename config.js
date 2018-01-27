exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:8080";
exports.DATABASE_URL =
  process.env.DATABASE_URL || global.DATABASE_URL || "mongodb://localhost:27017/sneaker-feed-users";

exports.PORT = process.env.PORT || 8080;
