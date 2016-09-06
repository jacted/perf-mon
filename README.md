## Introduction

- Website performance monitor for slack using ```performance.timing```

## Getting started

Clone repository

Use npm to install dependencies:

```
npm instal
```
Edit config.example.js and rename to config.js

Insert script tags at the bottom of your website right before </body>

```
<script type="text/javascript">
	var perfmonUxMonitorBeaconUrl = 'http://localhost:8080/log';
</script>
<script type="text/javascript" src="http://localhost:8080/perfmon.js" defer></script>
```