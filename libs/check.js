var request = require('request');
var net = require('net');

module.exports = function(app){
	app.check = {
		website: function(websiteURL, callback){
			if (websiteURL.indexOf("://") === -1){
				websiteURL= "https://" + websiteURL;
			}
			request({
				url: websiteURL,
				followAllRedirects: true,
				timeout: 5000,
				strictSSL: true
			}, function(err, response, body){
				var siteUp= false;
				if (!err && response.statusCode === 200){
					siteUp = true;
				}
				return callback(null, siteUp);
			})
		},
		tcp: function(host, port, callback){
			var client = net.connect({
				port: port,
				host: host
			});
			var hasReturned = false;
			var done = function(err, results){
				if (!hasReturned){
					clearTimeout(timeout);
					client.destroy();
					hasReturned = true;
					return callback(err, results);
				}
			};
			var timeout = setTimeout(function(){
				return done(null, false);
			}, 5000);
			client.once('connect', function(){
				return done(null, true);
			});
			client.once('error', function(){
				return done(null, false);
			});
		}
	}
}