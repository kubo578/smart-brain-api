const handleSignin = (req, res, db, bcrypt) =>  {
	const { email, password } = req.body;
	db.select('hash').from('login').where('email', '=', email)
	.then(result => {
		const isValid = bcrypt.compareSync(password, result[0].hash);
		if (isValid) {
			db.select('*').from('users').where('email', '=', email)
			.then(user => {
				res.status(200).json(user[0]);
			})
			.catch(err => res.status(400).json('Error - unable to get user'));
		} 
	})
	.catch(err => res.status(400).json('Error - Wrong credentials'));	
}

module.exports = {
	handleSignin: handleSignin
}
