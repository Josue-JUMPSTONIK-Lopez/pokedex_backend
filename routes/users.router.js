const express = require('express');
const UserService = require('../services/users.service')
const router = express.Router();
const service = new UserService()

// let users;



router.post('/create-user', async(req, res, next) =>{
    try {
        const {name,
            nickname,
            region,
            gender,
            age,
            email,
            trainerClass,
            password} = req.body
        const users = await service.createAcount(name,nickname,region,gender,age,email,trainerClass,password)
        console.log(users.rows)
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
})

// router.put('user', async(req, res) =>{

// })

router.post('/login', async(req, res, next)=>{
    try {
        const {email, password} = req.body
        const users = await service.logIn(email, password)
        res.status(200).json(users)
        // res.send(`${JSON.stringify(req.body)}`)
    } catch (error) {
        next(error)
    }
})

// router.post('/pokemonCard', async(req, res) =>{

// })

// router.delete('/pokemonCard', async(req, res) =>{

// })


module.exports = router

