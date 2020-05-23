const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if (user.length){
            res.status(200).json(user[0]);
        } else {
           res.status(400).json('Invalid User');
        }   
    })
    .catch(err => {
        res.status(400).json('Error getting user');
    })
}

module.exports  = {
    handleProfileGet: handleProfileGet
}
