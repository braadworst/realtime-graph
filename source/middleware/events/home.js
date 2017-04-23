const parse = require('date-fns/parse');

module.exports = (next, relay, record) => {
let dataset;
	
	if (record) {
		record.timestamp = parse(record.timestamp);
		dataset = relay.state;
		dataset.shift();
		dataset.push(record);
		update(dataset);
	} else {
		dataset = relay.state ? relay.state : window.__state__.watertable;
		dataset.forEach(record => {
			record.timestamp = parse(record.timestamp);
		});  	
		update(dataset.reverse());
	}

	function update(records) { 

		const container = '.graph';

		document.querySelector(container).innerHTML = '';

		const margin = {top: 40, right: 20, bottom: 30, left: 40},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		const scaleX = d3.scaleBand()
				.domain(records.map(record => record.timestamp))
		    .rangeRound([0, width])
		    .paddingInner(0.1);

		const scaleY = d3.scaleLinear()
				.domain([0, 100])
		    .range([height, 0]);

		const xAxis = d3
			.axisBottom(scaleX)
			.tickFormat(d3.timeFormat('%M'));
		const yAxis = d3.axisLeft(scaleY);

		let svg = d3.select(container).append('svg')
		    .attr('width', width + margin.left + margin.right)
		    .attr('height', height + margin.top + margin.bottom)
		  .append('g')
		    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	  svg.append('g')
	      .attr('class', 'x axis')
	      .attr('transform', 'translate(0,' + height + ')')
	      .call(xAxis);

	  svg.append('g')
	      .attr('class', 'y axis')
	      .call(yAxis)  	

	  let bars = svg.selectAll('.bar')
	    .data(records);

    // init
	  bars
	    .enter()
	    	.append('rect')
	      .attr('class', 'bar')
	      .attr('x', d => scaleX(d.timestamp))
	      .attr('width', scaleX.bandwidth())
	      .attr('y', d => scaleY(d.level))
	      .attr('height', d => height - scaleY(d.level));
  }

	next({ state : dataset });
}