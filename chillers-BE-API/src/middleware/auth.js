require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports = async (req, res, next) => {
	// Verify token
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		let { user } = payload;
		if (!user) {
			throw 'No user was found';
		}
		user = await User.findOne({ email: user.email });
		req.token = token;
		req.user = user;
		next();
	} catch (err) {
		res.status(401).json({ code: 401, msg: err.message });
	}
};
