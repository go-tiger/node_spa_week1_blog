const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/node_spa_week1_blog")
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
