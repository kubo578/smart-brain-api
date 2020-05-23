	const handleRegister = (req, res, db, bcrypt) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json('Error - incorrect Submission')
        }

        // //Asynchronous bcrypt
        // bcrypt.hash(password, null, null, function(err, hash) {
        //    db('login').insert({
        //      email: email,
        //      hash: hash
        //     })
       //  });

        //synchronous bcrypt
       const hash = bcrypt.hashSync(password);

        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                  .returning('*')
                  .insert({
                     email: loginEmail[0],
                     name: name,
                     joined: new Date()
                  })
                  .then(user => {
                    res.json(user[0]);
                  })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('Error - unable to register'))
    }

    module.exports = {
        handleRegister: handleRegister
    }