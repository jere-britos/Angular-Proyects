
const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {
    const payload = { uid, name };
    return new Promise((res, rej) => {
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, ( err, token )=>{
            if(err){
                //Todo mal
                console.log(err);
                rej(err);
            }else{
                //Todo bien
                res( token )
            }
        })
    });
}

module.exports = {
    generarJWT
}