const express = require("express"); // express 라이브러리를 가지고 와서 변수에 넣음
const app = express(); // express를 실행해서 앱객체를 만들어줌.
const port = 3000;

// router가져옴
const postsRouter = require("./routes/posts.js");
const comtsRouter = require("./routes/comments.js");
const connect = require("./schemas");
connect();

//전역미들웨어(app.use) - express.json()를 써야 request 객체 안에있는 req.body를 사용할 수 있음.(모든 코드에서 body-parser등록해서)
app.use(express.json());
app.use("/posts", [postsRouter]);
app.use("/comments", [comtsRouter]);

app.get("/", (req, res) => {
  res.send("hello post!");
});

app.listen(port, () => {
  console.log(port, '서버 ON http://localhost:3000/');
});