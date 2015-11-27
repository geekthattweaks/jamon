module.exports = function(app){
	var dontSneeze = function(){
		setTimeout(function(){
			app.check.website("http://96.127.180.180/", function(err, siteUp){
				if (siteUp){
					app.log("Site is up!");
				}else{
					app.error("Site is down!");
				}
				dontSneeze();
			});
		}, 1000);
	};
	dontSneeze();
};