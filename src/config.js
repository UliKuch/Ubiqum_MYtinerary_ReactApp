if (process.env.NODE_ENV === "production") {
  module.exports = "https://arcane-everglades-71216.herokuapp.com"
} else {
  module.exports = "http://localhost:5000"
}