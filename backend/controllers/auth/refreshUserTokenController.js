const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec()

    if (!foundUser) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.email !== decoded.email) return res.sendStatus(403)

        const roles = Object.values(foundUser.roles).filter(Boolean)

        const accessToken = jwt.sign({
            "userInfo": {
                "user_id": foundUser._id,
                "email": foundUser.email,
                "roles": roles
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" })

        res.json({ accessToken })
    })
}

module.exports = handleRefreshToken