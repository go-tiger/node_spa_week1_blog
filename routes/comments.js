const express = require("express");
const router = express.Router();

const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const Comments = require("../schemas/comment.js");

// 댓글 작성
router.post("/:_id/comment", async (req, res) => {
  try {
    const { _id: postId } = req.params;
    const { name, password, content } = req.body;

    if (name == undefined || password == undefined || content == undefined) {
      return res.json({ result: "내용을 입력해주세요" });
    }

    await Comments.create({ name, password, content, postId });

    res.json({ result: "comment success" });
  } catch (err) {
    res.status(400).json({ result: "comment failed" });
  }
});

// 댓글 목록 조회
router.get("/:_id/comment", async (req, res) => {
  const comments = await Comments.find(
    {},
    {
      __v: false,
      updatedAt: false,
      _id: false,
      password: false,
      postId: false,
    }
  ).sort({ createdAt: -1 });

  const commentList = comments.map((comment) => {
    return {
      name: comment.name,
      content: comment.content,
      createdAt: moment(comment.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    };
  });
  res.json({ commentList });
});

//댓글 수정
router.put("/:_id/comment/:_commentId", async (req, res) => {
  try {
    const { _commentId: _id } = req.params;
    const { password, content } = req.body;
    const find = await Comments.findOne({ _id });

    if (password === undefined || content === undefined) {
      return res.json({ result: "수정실패! 제대로 값을 입력해주세요." });
    }

    if (find.password === password) {
      await Comments.updateOne({ _id: _id }, { $set: { content: content } });
      res.json({ result: "수정성공!" });
    } else {
      res.status(403).json({ result: "비밀번호가 틀렸습니다." });
    }
  } catch (err) {
    res.status(404).json({ result: "게시글이 존재하지 않습니다." });
  }
});

//댓글 삭제
router.delete("/:_id/comment/:_commentId", async (req, res) => {
  try {
    const { _commentId: _id } = req.params;
    const { password } = req.body;
    const deletes = await Comments.findOne({ _id });

    if (password === undefined) {
      return res.json({ result: "비밀번호를 작성해주세요" });
    }

    if (deletes.password === password) {
      await Comments.deleteOne({ _id });
      res.json({ result: "삭제성공!" });
    } else {
      res.status(403).json({ result: "비밀번호가 틀렸습니다." });
    }
  } catch (err) {
    res.status(404).json({ result: "게시글이 존재하지 않습니다." });
  }
});

module.exports = router;
