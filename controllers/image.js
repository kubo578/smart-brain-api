const Clarifai = require ('clarifai');

const handleApiCall = (req, res) => {
	//image address that works 
	//https://www.climbing.com/.image/t_share/MTY1MDQwNDQ0ODM1NjM2ODA5/_dsc9973-2.jpg

	const app = new Clarifai.App({
	 apiKey: '4236674f33974c51a1fa78d026305878'
	});

   app.models
     .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
     .then(data => {
     	res.json(data);
     })
     .catch(err => res.status(400).res.json('Error with Clarifai API '))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	    res.status(200).json(entries[0])
	  })
	  .catch(err => res.status(400).json(err))
}

module.exports = {
   handleImage: handleImage,
   handleApiCall: handleApiCall
}