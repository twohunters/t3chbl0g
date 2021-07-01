const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Post, User, Comment } = require("../../models");

router.get("/", withAuth, (req, res) => {
    Comment.findAll()
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get("/:id", (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.post("/", withAuth, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
    })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
});

router.delete("/:id", withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(commentData => {
            if (!commentData) {
                res.status(404).json({ message: "No comment found with this ID" });
                return;
            }
            res.json(commentData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put("/:id", withAuth, (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(commentData => {
            if (!commentData) {
                res.status(404).json({ message: "No comment found with this ID" });
                return;
            }
            res.json(commentData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;