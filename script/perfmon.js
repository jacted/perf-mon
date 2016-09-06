'use strict';

// Cookies
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// Read cookie
var perfmonLogged 		= readCookie('perfmonLogged');
var perfmonVisitorId 	= readCookie('perfmonVisitorId');

if (!perfmonLogged) {
	createCookie('perfmonLogged','true',1);

	// Read visitorID cookie
	if (!perfmonVisitorId) {
		var visitorId = Math.floor(Math.random()*1023422343231);
		visitorId.toString();
		createCookie('perfmonVisitorId', visitorId, 1825);
		recordTiming(visitorId);
	} else {
		perfmonVisitorId = Number(perfmonVisitorId);
		recordTiming(perfmonVisitorId);
	}

}

function recordTiming(visitorId) {

	var device, perfmonUxMonitorData;

	// Detect Mobile or Desktop
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		device = 'mobile';
	} else {
		device = 'desktop';
	}

	if (performance && performance.timing) {
		
		perfmonUxMonitorData = {};
		perfmonUxMonitorData.version 		= '1.0.0';
		perfmonUxMonitorData.siteDomainName = window.location;
		perfmonUxMonitorData.visitorId 		= visitorId;
		perfmonUxMonitorData.userAgent 		= navigator.userAgent;
		perfmonUxMonitorData.device 		= device;
		perfmonUxMonitorData.performance 	= performance.timing;

		window.addEventListener('unload', logData, false);

		function logData() {
			var blob = new Blob([JSON.stringify(perfmonUxMonitorData)], {type : 'application/json; charset=UTF-8'});
			navigator.sendBeacon(perfmonUxMonitorBeaconUrl, blob);
		}

	}

}