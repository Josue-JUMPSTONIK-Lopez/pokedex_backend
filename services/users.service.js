const getConnection = require("../libs/postgres")
const boom = require('@hapi/boom');

class UserService{
    constructor(){

    }

    async createAcount(name,nickname,region,gender,age,email,trainerClass,password){
        if (name !== '' && nickname !== '' && region !== '' && gender !== '' && age !== '' && email !== '' && trainerClass !== '' && password!== '') {
            const verifyUserQuery = `SELECT * FROM users
            WHERE email = '${email}' AND password = '${password}'`
            const client = await getConnection();
            const rta = await client.query(verifyUserQuery)
            if (rta.rows.length === 0) {
                const postQuery = `INSERT INTO users(name, nickname, region, gender, age, email, trainer_class, password)
                VALUES ('${name}', '${nickname}', '${region}', '${gender}', '${age}', '${email}', '${trainerClass}', '${password}')
                RETURNING *;`
                const rtu  = await client.query(postQuery);
                return rtu.rows
            }else{
                throw boom.conflict('Already exist a user with that same email. Please, use a differente email')
            }
        }else{
            throw boom.notAcceptable('some data fields were empty')
        }
    }

    async logIn(email, password){

        if (email !== '' && password !=='') {
            const query = `SELECT * FROM users
            WHERE email = '${email}' AND password = '${password}'`
            const client = await getConnection();
            const rta = await client.query(query)
            // console.log(rta.rows)
            if (rta.rows.length === 1) {
                // console.log(users)
                // console.log(email,password)
                return rta.rows;
            }else{
                throw boom.notFound(`User with email: ${email} and its password where not found`)
            }
        }else{
        throw boom.notAcceptable('some data fields were empty')
    }
}

    async find(id){
        if (id !== "") {
            const query = `SELECT * FROM users
            WHERE user_id = '${id}'`;
            const client = await getConnection();
            const rta = await client.query(query);
            if (rta.rows.length === 1) {
                return rta.rows;
            }else{
                throw boom.notFound(`there's not a user with that id`)
            }
        }else{
            throw boom.notAcceptable(`missing id`)
        }
    }

    async updateUsarData(userId, name, nickname, region, gender, age, trainerClass){
        if (name !== '' && nickname !== '' && region !== '' && gender !== '' && age !== '' && userId !== '' && trainerClass !== '') {
            const query = `UPDATE users
            SET name = '${name}',
                nickname = '${nickname}',
                region = '${region}',
                gender = '${gender}',
                age = '${age}',
                trainer_class = '${trainerClass}'
            WHERE user_id = ${userId}
            RETURNING *;`;
            const client = await getConnection();
            const rta = await client.query(query);
            if (rta.rows.length === 1) {
                return rta.rows
            }else{
                throw boom.notFound('It doesnt exist a user with that ID')
            }
        }else{
            throw boom.notAcceptable('there are missing data to do the update')
        }

    }

    async addPokemonCard(trainer_id, key_id, name, nickname, picture, moves, gender, types){
        if (trainer_id !== '' && key_id !== '' && name !== '' && picture !== '' && moves !== '' && gender !== '' && types !== '') {
            const query = `INSERT INTO pokemons(trainer_id, key_id, name, nickname, picture, types, gender, moves)
            VALUES ('${trainer_id}', '${key_id}', '${name}', '${nickname}', '${picture}', '${types}', '${gender}', '${moves}')
            RETURNING *;`
            const client = await getConnection();
            const rta = await client.query(query);
            return rta.rows
        }else{
            throw boom.notAcceptable('Pokemon information is missing')
        }
    }

    async removePokemonCard(id){
        if (id !== "") {
            const query = `DELETE FROM pokemons
            WHERE poke_id = ${id}
            RETURNING *;`
            const client = await getConnection();
            const rta = await client.query(query);
            if (rta.rows.length === 1) {
                return rta.rows
            }else{
                throw boom.notFound("this pokemon doesnt exist")
            }
        }else{
            throw boom.notAcceptable("pokemon id is missing")
        }
    }

    async getPokemons(id){
        if (id !== "") {
            const query = `SELECT * FROM pokemons
            WHERE trainer_id = '${id}'`;
            const client = await getConnection();
            const rta = await client.query(query);
            rta.rows.map(pokemon => {
                pokemon.poke_id = String(pokemon.poke_id)
                pokemon.trainer_id = String(pokemon.trainer_id)
                pokemon.moves = pokemon.moves.split(",")
                pokemon.types =  pokemon.types.split(",")
                pokemon.gender = pokemon.gender.split(",")
            })
            // console.log(rta.rows)
            return rta.rows
        }else {
            throw boom.notAcceptable('User ID is missing, so we cant find its pokemons')
        }
    }
}


module.exports = UserService