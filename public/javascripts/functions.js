$(document).ready(function() {
	$.ajax({
		type:'get',
		url:'/open',
		datatype:'json'
	}).done(function(data){
		var data = JSON.parse(data);
		var title = data.title;
		$('.container').append('<h1 class="text-center">'+title+'</h1>');
		if(data.type === 'bar') {
			barGraph(data.content);
		} else {
			forceGraph(data);
		}
	})
})

var barGraph = function(data) {
	$('.container').append('<svg class="chart"></svg>');
	var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
	.domain([0, d3.max(data, function(d){return d.value;})])
    .range([0, width]);

var chart = d3.select('.chart')
    .attr("width", width);

  chart.attr("height", barHeight * data.length);

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", function(d) {return x(parseInt(d.value)); })
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", function(d) { return x(parseInt(d.value)) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
};

var forEach = function(array, fn) {
	for(i=0;i<array.length;i++) {
		fn(array[i]);
	}
};

var forceGraph = function (data) {
  var names = data.names;
  var nodes = {};
  var links = data.links;
  var width = 960;
  var height = 500;

  links.forEach(function (link) {
    link.source = nodes[link.source] || (nodes[link.source] = {ID: link.source});
    link.target = nodes[link.target] || (nodes[link.target] = {ID: link.target});
  })

  var force = d3.layout.force()
  .nodes(d3.values(nodes))
  .links(links)
  .size([width, height])
  .linkDistance(100)
  .charge(-300)
  .on("tick", tick)
  .start();

  var svg = d3.select('.container').append('svg')
    .attr("width", width)
    .attr("height", height);

  svg.append("svg:defs").selectAll("marker")
    .data(["end"])
  .enter().append("svg:marker")    
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

var path = svg.append("svg:g").selectAll("path")
    .data(force.links())
  .enter().append("svg:path")
    .attr("class", "link")
    .attr("marker-end", "url(#end)");

  var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())
  .enter().append("circle")
    .attr("r", 9)
    .call(force.drag);

  var text = svg.append("g").selectAll("text")
    .data(force.nodes())
  .enter().append("text")
    .attr("x", 10)
    .attr("y", ".31em")
    .text(function(d) { return (names[d.ID]) });

  function tick() {
    path.attr("d", linkArc);
    circle.attr("transform", transform);
    text.attr("transform", transform);
  }

  function linkArc(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

  function transform(d) {
    return "translate(" + d.x + "," + d.y + ")";
  }
}