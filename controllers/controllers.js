module.exports = function(app){
	app.server.get('/', function (req, res){
		res.send('Hello World!');
	});

	app.server.get('/check/site/:website', function(req, res){
		app.check.website(req.params.website, function(err, results){
			if (err){
				res.send("An error has occured!");
				return app.debug(err);
			}
			res.send(results);
		});
	});
	app.server.get('/check/tcp/:host/:port', function(req, res){
		app.check.tcp(req.params.host, req.params.port, function(err, results){
			if (err){
				res.send("An error has occured!");
				return app.debug(err);
			}
			res.send(results);
		});
	});
}