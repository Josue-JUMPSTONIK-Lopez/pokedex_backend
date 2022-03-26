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
        // console.log(users.rows)
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
})


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

router.get('/:id', async(req, res, next) =>{
    try {
        const {id} = req.params
        const user = await service.find(id);
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

router.put('/', async(req, res, next) =>{
    try {
        const {
            userId,
            name,
            nickname,
            region,
            gender,
            age,
            trainerClass,
        } = req.body;
        const user = await service.updateUsarData(userId,name,nickname,region,gender,age,trainerClass,)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

router.post('/pokemonCards', async(req, res, next) =>{
    try {
        // console.log(req.body)
        const {
            trainer_id,
            key_id,
            name,
            nickname,
            picture,
            moves,
            gender,
            types
        } = req.body
        const pokemon = await service.addPokemonCard(trainer_id, key_id, name, nickname, picture, moves, gender, types)
        res.status(200).json(pokemon)
    } catch (error) {
        next(error)
    }
})

router.delete('/pokemonCards/:id', async(req, res, next) =>{
    try {
        const {id} = req.params;
        const pokemon = await service.removePokemonCard(id);
        res.status(200).json(pokemon)
    } catch (error) {
        next(error)
    }
})

router.get('/pokemonCards/:id', async(req, res,next) =>{
    try {
        const {id} = req.params;
        const pokemons = await service.getPokemons(id);
        res.status(200).json(pokemons);
    } catch (error) {
        next(error)
    }
})


module.exports = router

