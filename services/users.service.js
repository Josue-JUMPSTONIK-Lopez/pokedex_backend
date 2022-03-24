const getConnection = require("../libs/postgres")
const boom = require('@hapi/boom');

class UserService{
    constructor(){

    }

    async createAcount(name,
        nickname,
        region,
        gender,
        age,
        email,
        trainerClass,
        password){
            if (name !== '' && nickname !== '' && region !== '' && gender !== '' && age !== '' && email !== '' && trainerClass !== '' && password!== '') {
                console.log("")
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

    async updateUsarData(){

    }

    async addPokemonCard(){

    }

    async removePokemonCard(){

    }
}


module.exports = UserService