const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Post, User, Comment } = require("../models");

router.get("/", withAuth, (req, res) => {
    console.log(req.session);

    Post.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: ["id", "title", "content", "created_at"],
        include: [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ]
    })
        .then(postData => {

            const posts = postData.map(post => post.get({ plain: true }));

            res.render("dashboard", {
                posts,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get("/edit/:id", withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "title", "content", "created_at"],
        include: [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ]
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: "No post found with this ID" });
                return;
            }

            const post = postData.get({ plain: true });

            res.render("edit-post", {
                post,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get("/new", withAuth, (req, res) => {
    res.render("new-post")
});

module.exports = router;