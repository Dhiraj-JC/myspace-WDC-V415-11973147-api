const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');


async function getHashedPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

function generateToken({userName}) {
    let payload = {
        userName: userName
    }
    const token = sign(payload,process.env.JWT_SECRET_KEY,{
        expiresIn: '1d'
    });

    return token;
}


module.exports = {
    getHashedPassword,
    generateToken
}
