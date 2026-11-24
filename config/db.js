// Database settings (same idea as class).
// The real connection string lives in .env, so it never goes to GitHub.
module.exports = {
  "URI": process.env.MONGO_URI
};