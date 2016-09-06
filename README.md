![Screenshot](https://raw.githubusercontent.com/jacted/perf-mon/master/example/screenshot1.png)

## Introduction

- Website performance reports for slack using ```performance.timing```
- Messages will be posted to #general (Can be changed in config, remember to invite bot)
- Uses MongoDB, get a free one on mlab.com
- Discuss on [Hacker News](https://news.ycombinator.com/item?id=12438895)

## Getting started

Clone repository

Use npm to install dependencies:

```
npm install
```
Add slack bot ```https://my.slack.com/services/new/bot```

Edit app/config.example.js and rename to app/config.js

Insert script tags at the bottom of your website right before </body>

```
<script type="text/javascript">
	var perfmonUxMonitorBeaconUrl = 'http://localhost:8080/log';
</script>
<script type="text/javascript" src="http://localhost:8080/perfmon.js" defer></script>
```
Invite bot to #general (or the one set in the config)

Run ```node index.js``` (or use something like pm2)

## Commands
- ```perf help``` shows explanations
- ```perf report``` shows report

## ToDo

- [ ] Multiple domain support
- [ ] Clean up code
- [ ] Better readme.md

## License
The MIT License (MIT)

Copyright (c) 2016 Jacob (Jacted)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.