const bcrypt = require('bcrypt')

const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword,10)
}

const comparePassword = (plainPassword,hasedPassword) => {
    return bcrypt.compareSync(plainPassword,hasedPassword)
}
module.exports = {
    hashPassword,
    comparePassword
}