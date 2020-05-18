const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const database = {
	users: [
	  {
	  	id: '001',
	  	name: 'John',
	  	email: 'john@gmail.com',
	  	password:'John',
	  	entries: 0,
	  	joined: new Date()
	  },
	  {
	  	id: '002',
	  	name: 'Sally',
	  	email: 'sally@gmail.com',
	  	password:'Sally',
	  	entries: 0,
	  	joined: new Date()
	  }
	]
}


app.get('/', (req, res) => {
	res.json(database.users);
});

app.get('/profile/:userId', (req, res) => {
    const id = req.params.userId;
    database.users.forEach( user => {
    	if (user.id === id){
    		return res.status(200).json(user)
    	}
    })
    return res.status(400).json("user " + id + " not found!");
});

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.status(200).json('success');
	} else {
		res.status(400).json('User does not exist')
	}
});

app.post('/register', (req, res) => {
	database.users.push(
	{
	  	id: '003',
	  	name: req.body.name,
	  	email: req.body.email,
	  	password:req.body.password,
	  	entries: 0,
	  	joined: new Date()
	})
	res.status(200). json('user 003 added');
})

app.put('/image/:userId', (req, res) => {
    const id = req.params.userId;
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