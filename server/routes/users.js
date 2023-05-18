const router = require('express').Router();
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcryptjs')

router.post('/', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(404).send({ message: "Email id already exists" });
        }

        const saltRounds = parseInt(process.env.SALT);
        if (isNaN(saltRounds)) {
            return res.status(400).send({ message: "Invalid salt rounds" });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User Created Successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error occurred" });
    }
});

module.exports = router;
