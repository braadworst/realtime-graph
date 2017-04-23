module.exports = (next, relay) => {
	relay.extensions.renderer.template(`
<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">

			<title>Water tables (prototype)</title>

			<script src="https://d3js.org/d3.v4.min.js"></script>
			<script src="/scripts/main.min.js"></script>

			<link rel="stylesheet" href="/stylesheets/styles.css">

		</head>
		<body>
			<section class="content"></section>
			<script id="state"></script>
		</body>
	</html>
	`);	
	next();
}