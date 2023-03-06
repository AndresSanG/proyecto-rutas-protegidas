const { ExtractJwt,Strategy } = require('passport-jwt')
const passport = require('passport')
const {findUserById} = require('../users/users.controllers')

const passportConfigs = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'academlo'
}

passport.use(new Strategy(passportConfigs, (tokenDecoded, done)=>{
    findUserById(tokenDecoded.id)
    .then(data=>{
        if(data){
            done(null, tokenDecoded)
        }else{
            done(null,false,{message:'incorrect token'})
        }
    })
    .catch(error =>{
        done(error,false)
    })
}))

module.exports = passport.authenticate('jwt',{session:false})