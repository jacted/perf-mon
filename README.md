## Speed Monitor

- Website user performance reports for slack and Rocket.chat
- Captures performance stats using ```performance.timing``` 
- This is NOT a NodeJS package.

## What does it do?

The script captures the users performance using ```performance.timing```

It then sends it to a NodeJS server, storing it in MongoDB and sends reports to slack or Rocket.chat about the performance.

![Screenshot](https://raw.githubusercontent.com/jacted/speed-monitor/master/example/screenshot1.png)

## Stack

> - NodeJS
> - MongoDB (Get one free at mlab.com)

## Getting started slack

1. Clone repository

2. Use npm to install dependencies:

	```
	npm install
	```

3. Add Outgoing WebHook Integration to Slack ```https://my.slack.com/services/new/outgoing-webhook```

4. Slack WebHook url `http://localhost:8080/slack` - Add `speed` to trigger word(s)

5. Edit app/config.example.js and rename to app/config.js

6. Insert script tags at the bottom of your website right before ```</body>```

	```
	<script type="text/javascript">
		var speedmonitorUxMonitorBeaconUrl = 'http://localhost:8080/log';
	</script>
	<script type="text/javascript" src="http://localhost:8080/speedmonitor.js" defer></script>
	```

7. Run ```node index.js``` (or use something like pm2)

8. Use commands in any channel or the channel selected when creating webhook

## Getting started Rocket.chat

1. Clone repository

2. Use npm to install dependencies:

	```
	npm install
	```

3. Add Outgoing WebHook Integration to Rocket.chat url `http://localhost:8080/rocketchat`

4. Edit app/config.example.js and rename to app/config.js

5. Insert script tags at the bottom of your website right before ```</body>```

	```
	<script type="text/javascript">
		var speedmonitorUxMonitorBeaconUrl = 'http://localhost:8080/log';
	</script>
	<script type="text/javascript" src="http://localhost:8080/speedmonitor.js" defer></script>
	```

6. Run ```node index.js``` (or use something like pm2)

7. Use commands in any channel or the channel selected when creating webhook

## Commands
- ```speed help``` shows explanations
- ```speed report``` shows report
- ```speed report full``` shows extended report

## ToDo

- [ ] Multiple domain support
- [ ] Clean up code

## Browser support

Any browser that supports `performance.timing()`! Chrome, Firefox, Safari 9.2+, Edge, IE 9+, Android Browser 4.4, UC Browser.

See [caniuse.com](http://caniuse.com/#feat=nav-timing) for full support.

## Screenshots

![Screenshot](https://raw.githubusercontent.com/jacted/speed-monitor/master/example/screenshot2.png)

## License
The MIT License (MIT)

Copyright (c) 2016 Jacob (Jacted)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
