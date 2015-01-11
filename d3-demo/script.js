var   w = 1200,
      h = 500;

var circleWidth = 7;

var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",

      "darkblue": "#0A2933",
      "darkerblue": "#042029",

      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05"
  }

var nodes = [
      { name: "PHP", target: [1,2,5,13]},
      { name: "MySQL", target: [0,4,10,11,12]},
      { name: "Apache", target: [0,3]},
      { name: "nginx", target: [2]},
      { name: "PostgreSQL", target: [1,10,11,12]},
      { name: "Java", target: [0,6,7,8,9,13]},
      { name: "Android", target: [5]},
      { name: "SCaViS", target: [5]},
      { name: "RapidMiner", target: [5]},
      { name: "Weka", target: [5]},
      { name: "SQLite", target: [1,4,11,12]},
      { name: "VoltDB", target: [1,4,10,12]},
      { name: "PL/SQL", target: [1,4,10,11]},
      { name: "Python", target: [0,5,14]},
      { name: "Django", target: [13]}
];

var links = [];

for (var i = 0; i< nodes.length; i++) {
      if (nodes[i].target !== undefined) {
            for (var x = 0; x< nodes[i].target.length; x++ ) {
                  links.push({
                        source: nodes[i],
                        target: nodes[nodes[i].target[x]]
                  })
            }
      }
}

var myChart = d3.select('#chart')
		.append('svg')
		.attr('width', w)
		.attr('height', h)

var force = d3.layout.force()
	.nodes(nodes)
	.links([])
	.gravity(0.2)
	.charge(-1000)
	.size([w, h])

var link = myChart.selectAll('line')
	.data(links).enter().append('line')
	.attr('stroke', palette.gray)

var node = myChart.selectAll('circle')
	.data(nodes).enter()
	.append('g')
	.call(force.drag);

node.append('circle')
	.attr('cx', function(d) { return d.x; })
	.attr('cy', function(d) { return d.y; })
	.attr('r', circleWidth )
	.attr('fill', function(d, i) {
		if (i%2==0) { return palette.pink }
		else { return palette.blue }
	})
	.on('click', function(d){
		var relatives='';
		document.getElementById('relation').innerHTML='';
		document.getElementById('relation').innerHTML='I am '+d.name+'<br>';
		for (var i = 0; i< d.target.length; i++) {
			if(i!==0)relatives+=' / '; 
			relatives+=nodes[d.target[i]].name;
			//console.log(nodes[d.target[i]].name);
		}
		document.getElementById('relation').innerHTML+='Meet my friend(s): '+relatives;
	})

node.append('text')
	.text(function(d) { return d.name})
	.attr('font-family', 'Roboto Slab')
	.attr('fill', function(d, i) {
		return palette.yellowgreen
	})
	.attr('x', function(d, i) {
		if (i>0) { return circleWidth + 4 }
		else { return circleWidth -15 }
	})
	.attr('y', function(d, i) {
		if (i>0) { return circleWidth }
		else { return 8 }
	})
	.attr('text-anchor', function(d, i) {
		if (i>0) { return 'beginning' }
		else { return 'end'}
	})
	.attr('font-size',  '1.3em')
	.on('click', function(d){
		var relatives='';
		document.getElementById('relation').innerHTML='';
		document.getElementById('relation').innerHTML='I am '+d.name+'<br>';
		for (var i = 0; i< d.target.length; i++) {
			if(i!==0)relatives+=' / '; 
			relatives+=nodes[d.target[i]].name;
			//console.log(nodes[d.target[i]].name);
		}
		document.getElementById('relation').innerHTML+='Meet my friends: '+relatives;
	})

force.on('tick', function(e) {
	node.attr('transform', function(d, i) {
		return 'translate('+ d.x +', '+ d.y +')';
	})

	link
		.attr('x1', function(d) { return d.source.x })
		.attr('y1', function(d) { return d.source.y })
		.attr('x2', function(d) { return d.target.x })
		.attr('y2', function(d) { return d.target.y })
})


force.start();

