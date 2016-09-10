(function(){
	angular
	.module('TwitchApp', [require,('angular-animate')])
	.constant('dataUrl', 'https://api.twitch.tv/kraken/streams/');
}(angular));