![Screenshot](https://raw.githubusercontent.com/jacted/perf-mon/master/example/screenshot1.png)

## Introduction

- Website performance monitor for slack using ```performance.timing```
- Messages will be posted to #general (Remember to invite bot)

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
Invite bot to #general

## Commands
- ```perf help``` shows explanations
- ```perf report``` shows report