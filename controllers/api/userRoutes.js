const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Post, User, Comment } = require("../../models");

router.get("/", withAuth, (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"] }
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get("/:id", withAuth, (req, res) => {
    User.findOne({
        attributes: { exclude: ["password"] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ["id", "title", "content", "created_at"]
            },
            {
                model: Comment,
                attribute: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: Post,
                    attributes: ["title"]
                }
            }
        ]
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.post("/", withAuth, (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(userData => {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;
                res.json(userData);
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.post("/login", withAuth, (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: "No user found with this email address" });
                return;
            }

            const validPassword = userData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: "Incorrect password" });
                return;
            }
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;
                res.json({ user: userData, message: "Login successful" })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.post("/logout", withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

router.delete("/:id", withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put("/:id", withAuth, (req, res) => {
    User.update({
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;