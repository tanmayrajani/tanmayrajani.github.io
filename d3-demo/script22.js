function myGraph(el) {

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


    // Add and remove elements on the graph object
    this.addNode = function (id) {
        nodes.push({"id":id});
        update();
    }

    this.removeNode = function (id) {
        var i = 0;
        var n = findNode(id);
        while (i < links.length) {
            if ((links[i]['source'] === n)||(links[i]['target'] == n)) links.splice(i,1);
            else i++;
        }
        var index = findNodeIndex(id);
        if(index !== undefined) {
            nodes.splice(index, 1);
            update();
        }
    }

    this.addLink = function (sourceId, targetId) {
        var sourceNode = findNode(sourceId);
        var targetNode = findNode(targetId);

        if((sourceNode !== undefined) && (targetNode !== undefined)) {
            links.push({"source": sourceNode, "target": targetNode});
            update();
        }
    }

    var findNode = function (id) {
        for (var i=0; i < nodes.length; i++) {
            if (nodes[i].id === id)
                return nodes[i]
        };
    }

    var findNodeIndex = function (id) {
        for (var i=0; i < nodes.length; i++) {
            if (nodes[i].id === id)
                return i
        };
    }

    // set up the D3 visualisation in the specified element
    var w = $(el).innerWidth(),
        h = $(el).innerHeight();

    var vis = this.vis = d3.select(el).append('svg')
        .attr("width", w)
        .attr("height", h);

    var force = d3.layout.force()
        .gravity(.05)
        .distance(100)
        .charge(-100)
        .size([w, h]);

    var nodes = force.nodes(),
        links = force.links();

    var update = function () {

        var link = vis.selectAll("line")
            .data(links, function(d) { return d.source.id + "-" + d.target.id; });

        link.enter().append("line")
            .attr('stroke', palette.blue)

        link.exit().remove();

        var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id;});

        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .call(force.drag);

      var y=  nodeEnter.append("circle")
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; })
          .attr('r', 7)
          .attr('fill', palette.blue)
          .on('mouseover', function(d){
            d3.select(this).attr('cursor','pointer');
          })
          .on('mouseout', function(d){
            d3.select(this).attr('cursor','auto');
          });

       var x= nodeEnter.append("text")
        	.attr('font-family', 'Roboto Slab')
          .attr('fill', '#FFFF66')
  			.attr('x', 10)
  			.attr('y', 10)
  			.attr('text-anchor', 'beginning')
  			.attr('font-size',  '1.2em')
        .text(function(d) {return d.id})
        .on('click', function(d){
				  click_event(d.id);
        })
        .on('mouseover', function(d){
          d3.select(this).attr('font-size',  '1.3em')
          .attr('cursor','pointer');          
        })
        .on('mouseout', function(d){
          d3.select(this).attr('font-size',  '1.2em')
          .attr('cursor','auto');
        });

        // if(x.data.id=='Felicific') y.attr('r',50);

        node.exit().remove();

        force.linkDistance('190')
        .on("tick", function() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });

        // Restart the force layout.
        force.start();
    }

    // Make it all go
    update();
}

graph = new myGraph("#graph");

//new friends to be added from JSON document
var newFriends=[];

//Currently which is hardcoded below can be made dynamic using this function
function addNewNodeAndLinks (me,newFriends) {
  // body...
}

//Currently hardcoded for php
function click_event (who) {
  if(who=='PHP'){
    graph.addNode("Yii");
    graph.addLink("Yii", "PHP");    
    graph.removeNode("Apache");
  }
}

// Initialize with these nodes
graph.addNode("MySQl");
graph.addNode("PHP");
graph.addLink("PHP", "MySQl");
graph.addNode("Apache");
graph.addNode("nginx");
graph.addLink("Apache", "nginx");
graph.addLink("Apache", "PHP");

function addFuckingNode () {
  graph.addNode($('#textboox').val());
}