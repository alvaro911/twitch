(function(){
	angular
	.module('TwitchApp', ['ngAnimate'])
	.factory('twitchService', ['$http', '$q', twitchService])
	.controller('TwitchCtrl', ['twitchService', '$log' ,twitchFn]);

	function twitchFn(channel, $log){
		var self = this;
		var channels = ['adobe', 'freecodecamp', 'Bobross', 'AngryJoeShow', 'mioree', 'moatdd', 'thegypsyknight'];
		self.users = [];
		var getChannels = function(response){
			var user = {
				channel:response[0].data,
				stream:response[1].data.stream
			};
			if(user.stream === null){
				user.channel.channelStatus = 'not streaming';
			}else{
				user.channel.channelStatus = 'is streaming';
			}
			self.users.push(user);
			$log.info(user);
		};
		var requests = channel(channels);
		requests.then(function(req){
			req.forEach(getChannels);
		});

		self.tab = 1;
		self.select = function (setTab){
			self.tab = setTab;
			if(setTab === 2){
				self.users.filtText = 'is streaming';
			}
			else if(setTab === 3){
				self.users.filtText = 'not streaming';
			} 
			else{
				self.users.filtText = '';
			}
		};
	}

	function twitchService($http, $q){
		var channel = function(chan){
			var requests = [];
			for(var i=0; i<chan.length; i++){
				var channels = $http({
					method:'GET',
					url:'https://api.twitch.tv/kraken/channels/' + chan[i],
					headers:{
						'Client-ID':'686epy0ixpmvawi7c8bljf3zj9t6ix0'
					}
				});

				var streams = $http({
					method: 'GET',
					url:'https://api.twitch.tv/kraken/streams/' + chan[i],
					headers:{
						'Client-ID':'686epy0ixpmvawi7c8bljf3zj9t6ix0'
					}
				});
			var req = $q.all([channels, streams]);
				requests.push(req);
			}
			return $q.all(requests);
		};
		return channel;
	}
}());