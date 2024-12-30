const { User } = require('../models/User');

const login = (req, res) => {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
        return res.status(400).json({ message: 'phoneNumber and password are required' });
    }
    const userExists = User.find(phoneNumber === phoneNumber);
    if (userExists) {
        return res.status(200).json({ message: 'login Successfully' });
    }
    res.status(404).json({ message: 'User unauthenticated' });
}

const Signup = async (req, res) => {

    const { firstName, lastName, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !phoneNumber || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // const phone = fetch("https://phonevalidation.abstractapi.com/v1?api_key= e7d7b8e0a9ee47aaa35171a9dec93955&phone=+9779749712851");
        // console.log(phone)
        await User.create({
            firstName, lastName, phoneNumber, password
        })
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = { login, Signup };
