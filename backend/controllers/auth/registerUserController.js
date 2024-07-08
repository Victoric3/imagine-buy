const bcrypt = require('bcrypt')
const User = require('../../models/User')

const handleUserRegistration = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ 'message': 'Email and Password are required' })

    const duplicate = await User.findOne({ email: email }).exec()

    if (duplicate) return res.status(409).json({ 'message': 'Email already in use' })

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            "email": email,
            "password": hashedPassword
        })

        return res.status(201).json({ 'message': 'user created successfully' })
    } catch (error) {
        return res.status(400).json({ 'error': error.message })
    }
}

module.exports = handleUserRegistration