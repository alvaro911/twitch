(function(){
	angular
	.module('TwitchApp', ['ngAnimate'])
	.factory('twitchService', ['$http', twitchService])
	.controller('TwitchCtrl', ['twitchService', '$log' ,twitchFn]);

	function twitchFn(channel, $log){
		var self = this;
		var channels = ['adobe', 'freecodecamp', 'legendsofgaminguk'];
		self.users = [];
		var getChannels = function(response){
			self.users.push(response.data);
			$log.info(response);
		};
		var requests = channel(channels);
		requests.forEach(function(req){
			req.then(getChannels);
		});
	}

	function twitchService($http){
		var channel = function(chan){
			var requests = [];
			for(var i=0; i<chan.length; i++){
				var req = $http({
					method:'GET',
					url:'https://api.twitch.tv/kraken/channels/' + chan[i]
				});
				requests.push(req);
			}
			return requests;
		};
		return channel;
	}
}());