const User = require("../../models/User")
const userCreate = async() => {
    await User.create(
        {
            firstName:"Fernando",
            lastName: "De Jesus",
            email: "fernando@gmail.com",
            password: "fernando123",
            phone: "+572342123"
        }
    )
}

module.exports = userCreate