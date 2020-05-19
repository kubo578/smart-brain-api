const express = require('express');
const bodyParser = require('body-parser');
const bcrypt  = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
	  {
	  	id: '001',
	  	name: 'John',
	  	password: 'John',
	  	email: 'john@gmail.com',
	  	entries: 0,
	  	joined: new Date()
	  },
	  {
	  	id: '002',
	  	name: 'Sally',
	  	password: 'Sally',
	  	email: 'sally@gmail.com',
	  	entries: 0,
	  	joined: new Date()
	  }
	],
	logins: [
	{
		id:'001',
		hash:'',
		email:'john@gmail.com'
	}
	]
}


app.get('/', (req, res) => {
	res.send(database.users);
});

app.get('/profile/:userId', (req, res) => {
    const { id } = req.params;
    database.users.forEach( user => {
    	if (user.id === id){
    		return res.status(200).json(user)
    	}
    })
    return res.status(400).json("user " + id + " not found!");
});

app.post('/signin', (req, res) => {
	const { email, password } = req.body;
	let found = false;
	let  index = database.logins.findIndex(login => login.email === email)
	if (index == 1) {
   	    bcrypt.compare(password, database.logins[index].hash, function(err, response) {
           if (response == true) {
            	return res.status(200).json('success');
            } else {
            	return res.status(400).json('error loginning in')
            }
        });
	} else {
	    return res.status(400).json('error loginning in')
	}
});

app.post('/register', (req, res) => {
	const { name, email, password } = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
	    database.logins.push(
	    {
	   		id: '003',
	   		email: email,
	   		hash: hash
	    });
    });

	database.users.push(
	{
	  	id: '003',
	  	name: name,
	  	email: email,
	  	entries: 0,
	  	joined: new Date()
	})
	res.status(200). json('user 003 added');
})

app.put('/image/', (req, res) => {
    const { id } = req.body;
    let found = false
    database.users.forEach( user => {
    	if (user.id === id) {
    		found = true;
    		user.entries ++;
    		return res.status(200).json(database.users);
     	}
    });
    if (!found) {
       return res.status(400).json("user " + id + " not found!");
    }
});

app.listen (3000, () => {
	console.log ('app is running on port 3000');
})