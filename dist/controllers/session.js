const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth')
const user = require('./../helpers/user_db');
const router = express.Router();

router.post('/login',auth.isLogged,  (req, res, next) => {
    passport.authenticate('local',(err, user, info) => {
        if (err) {
            res.send({status:500})
        }
        if (!user) {
            res.send({status:404})
        }
        req.logIn(user, (err) => {
            if (!err) {
                res.send({status:200, user:user})
            }
        })
    })(req, res, next)
})

router.post('/signup',auth.isLogged, (req, res, next) => {
    const { /* PARAMS HERE*/ } = req.body
    user.new(/* PARAMS HERE*/).then((data) => {
        console.log(data);
        passport.authenticate('local',(err, user, info) => {
            if (err) {
                console.log(err);
                res.send({status:403})
            }
            if (!user) {
                res.send({status:400})
            }
            req.logIn(user, (err) => {
                if (!err) {
                    res.send({status:200})
                }
            })
        })(req, res, next)
        }).catch((err) => {
            console.log(err);
        res.send({status:404})
    })
})

router.get('/value',auth.isAuth ,(req,res) => {
    res.send({session:req.session.passport, status:200})
});

router.get('/logout',auth.isAuth ,(req, res) => {
    req.logout();
    res.status(200).send({
        msg: 'Bye!'
    });
});

module.exports = router;