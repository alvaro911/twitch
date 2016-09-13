(function(){
	angular
	.module('TwitchApp', ['ngAnimate'])
	.factory('twitchService', ['$http', '$q', twitchService])
	.controller('TwitchCtrl', ['twitchService', '$log' ,twitchFn]);

	function twitchFn(channel, $log){
		var self = this;
		var channels = ['adobe', 'freecodecamp', 'legendsofgaminguk', 'AngryJoeShow'];
		self.users = [];
		var getChannels = function(response){
			var user = {
				channel:response[0].data,
				stream:response[1].data.stream
			};
			self.users.push(user);
			$log.info(user);
		};
		var requests = channel(channels);
		requests.then(function(req){
			req.forEach(getChannels);
		});
	}

	function twitchService($http, $q){
		var channel = function(chan){
			var requests = [];
			for(var i=0; i<chan.length; i++){
				var channels = $http({
					method:'GET',
					url:'https://api.twitch.tv/kraken/channels/' + chan[i]
				});

				var streams = $http({
					method: 'GET',
					url:'https://api.twitch.tv/kraken/streams/' + chan[i]
				});
			var req = $q.all([channels, streams]);
				requests.push(req);
			}
			return $q.all(requests);
		};
		return channel;
	}
}());