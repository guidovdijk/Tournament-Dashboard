require("dotenv").config();

module.exports = {
  url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.obibsnu.mongodb.net/test?retryWrites=true&w=majority`,
};
