jsPlumb.ready(function() {

	var numberOfShapes = 0;
	var htmlBase = 'flowchart-demo';

	var instance = jsPlumb.getInstance({
		// default drag options
		DragOptions : { cursor: 'pointer', zIndex:2000 },
		// the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
		// case it returns the 'labelText' member that we set on each connection in the 'init' method below.
		ConnectionOverlays : [
			[ "Arrow", { location:1 } ],
			[ "Label", { 
				location:0.1,
				id:"label",
				cssClass:"aLabel"
			}]
		],
		Container:"flowchart-demo"
	});
	

	// this is the paint style for the connecting lines..
	var connectorPaintStyle = {
		lineWidth:4,
		strokeStyle:"#61B7CF",
		joinstyle:"round",
		outlineColor:"white",
		outlineWidth:2
	},
	// .. and this is the hover style. 
	connectorHoverStyle = {
		lineWidth:4,
		strokeStyle:"#216477",
		outlineWidth:2,
		outlineColor:"white"
	},
	endpointHoverStyle = {
		fillStyle:"#216477",
		strokeStyle:"#216477"
	},
	// the definition of source endpoints (the small green ones)
	sourceEndpoint = {
		endpoint:"Dot",
		paintStyle:{ 
			strokeStyle:"#7AB02C",
			fillStyle:"transparent",
			radius:4,
			lineWidth:3 
		},				
		isSource:true,
		connector:[ "Flowchart", { cornerRadius:5, alwaysRespectStubs:true } ],								                
		connectorStyle:connectorPaintStyle,
		hoverPaintStyle:endpointHoverStyle,
		connectorHoverStyle:connectorHoverStyle,
        dragOptions:{},
        /*overlays:[
        	[ "Label", { 
            	location:[0.5, 1.5], 
            	label:"Drag",
            	cssClass:"endpointSourceLabel" 
            } ]
        ]*/
	},		
	// the definition of target endpoints (will appear when the user drags a connection) 
	targetEndpoint = {
		endpoint:"Dot",					
		paintStyle:{ fillStyle:"#7AB02C",radius:4 },
		hoverPaintStyle:endpointHoverStyle,
		maxConnections:-1,
		dropOptions:{ hoverClass:"hover", activeClass:"active" },
		isTarget:true,			
        /*overlays:[
        	[ "Label", { location:[0.5, -0.5], label:"Drop", cssClass:"endpointTargetLabel" } ]
        ]*/
	},			
	init = function(connection) {			
		connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
		connection.bind("editCompleted", function(o) {
			if (typeof console != "undefined")
				console.log("connection edited. path is now ", o.path);
		});
	};

	instance.registerConnectionTypes({
	  "connectorType":{ paintStyle: connectorPaintStyle,
	  	connector:[ "Flowchart", { cornerRadius:5, alwaysRespectStubs:true } ],								                
		connectorStyle:connectorPaintStyle,
		hoverPaintStyle:endpointHoverStyle,
		connectorHoverStyle:connectorHoverStyle},
	  "connectorHover":{ paintStyle: connectorHoverStyle},
	});

	instance.registerEndpointTypes({
	  "basic":{         
	    paintStyle:{fillStyle:"blue"}
	  },
	  "selected":{          
	    paintStyle:{fillStyle:"red"}
	  }
	});

	$('#'+htmlBase).on("click", ".button_remove", function () {
		var parentnode = $(this)[0].parentNode.parentNode;
		instance.detachAllConnections(parentnode);
		instance.removeAllEndpoints(parentnode);
		$(parentnode).remove(); 
	});

	var _addTask = function() {
		numberOfShapes++;

		$('<div class="window task node" data-nodetype="task" id="flowchartWindow'+ numberOfShapes +'"></div>').appendTo('#'+htmlBase);

		_addEndpoints("Window"+numberOfShapes, ["BottomCenter"], ["TopCenter"]);

		instance.draggable($('#flowchartWindow'+ numberOfShapes));
		id = 'flowchartWindow'+ numberOfShapes;
		return id
	};

	var _addQuestion = function() {
		numberOfShapes++;

		$('<div class="shape question node" data-nodetype="question" id="flowchartWindow'+ numberOfShapes +'"></div>').appendTo('#'+htmlBase);

		_addEndpoints("Window"+numberOfShapes, ["LeftMiddle", "BottomCenter"], ["TopCenter"]);

		instance.draggable($('#flowchartWindow'+ numberOfShapes));
		id = 'flowchartWindow'+ numberOfShapes;
		return id
	};

	var _switchTask = function() {
		numberOfShapes++;

		$('<div class="shape switch-task node" data-nodetype="switch" id="flowchartWindow'+ numberOfShapes +'"></div>').appendTo('#'+htmlBase);

		_addEndpoints("Window"+numberOfShapes, ["BottomCenter"], ["TopCenter"]);

		instance.draggable($('#flowchartWindow'+ numberOfShapes));
		id = 'flowchartWindow'+ numberOfShapes;
		return id
	};

	var _mergeTask = function() {
		numberOfShapes++;

		$('<div class="shape merge-task node" data-nodetype="merge" id="flowchartWindow'+ numberOfShapes +'"></div>').appendTo('#'+htmlBase);

		_addEndpoints("Window"+numberOfShapes, ["BottomCenter"], ["TopCenter"]);

		instance.draggable($('#flowchartWindow'+ numberOfShapes));
		id = 'flowchartWindow'+ numberOfShapes;
		return id
	};

	var _finishTask = function() {
		numberOfShapes++;

		$('<div class="shape finish-task node"  data-nodetype="finish" id="flowchartWindow'+ numberOfShapes +'"></div>').appendTo('#'+htmlBase);

		_addEndpoints("Window"+numberOfShapes, [], ["TopCenter", "Left", "Right"]);

		instance.draggable($('#flowchartWindow'+ numberOfShapes));
		id = 'flowchartWindow'+ numberOfShapes;
		return id
	};

	var _assemblyTask = function() {
		numberOfShapes++;

		$('<div class="shape assembly-task node"  data-nodetype="assembly" id="flowchartWindow'+ numberOfShapes +'"></div>').appendTo('#'+htmlBase);

		_addEndpoints("Window"+numberOfShapes, [], ["TopCenter", "Left", "Right"]);

		instance.draggable($('#flowchartWindow'+ numberOfShapes));
		id = 'flowchartWindow'+ numberOfShapes;
		return id
	};

	var _conditionTask = function() {
		numberOfShapes++;

		$('<div class="shape condition-task node" data-nodetype="condition" id="flowchartWindow'+ numberOfShapes +'"><div class="small_squar"></div></div>').appendTo('#'+htmlBase);

		_addEndpoints("Window"+numberOfShapes, ["LeftMiddle", "BottomCenter"], ["TopCenter"]);

		instance.draggable($('#flowchartWindow'+ numberOfShapes));
		id = 'flowchartWindow'+ numberOfShapes;
		return id
	};

	var _processTask = function() {
		numberOfShapes++;

		$('<div class="shape process-task node" data-nodetype="process" id="flowchartWindow'+ numberOfShapes +'"><div class="left_rec"></div><div class="center_rec"></div><div class="right_rec"></div></div>').appendTo('#'+htmlBase);

		_addEndpoints("Window"+numberOfShapes, ["BottomCenter"], ["TopCenter"]);

		instance.draggable($('#flowchartWindow'+ numberOfShapes));
		id = 'flowchartWindow'+ numberOfShapes;
		return id
	};

	var _addEndpoints = function(toId, sourceAnchors, targetAnchors) {
			
		for (var i = 0; i < sourceAnchors.length; i++) {
			var sourceUUID = toId + sourceAnchors[i];
			instance.addEndpoint("flowchart" + toId, sourceEndpoint, { anchor:sourceAnchors[i], uuid:sourceUUID});
		}
		for (var j = 0; j < targetAnchors.length; j++) {
			var targetUUID = toId + targetAnchors[j];
			instance.addEndpoint("flowchart" + toId, targetEndpoint, { anchor:targetAnchors[j], uuid:targetUUID });
		}
	};

	_addEndpoints("Startpoint", ["BottomCenter"], []);
	_addEndpoints("Endpoint", [], ["TopCenter"]);
	instance.draggable($("#flowchartStartpoint"));
	instance.draggable($("#flowchartEndpoint"));	

	instance.bind("contextmenu", function(component, originalEvent) {
		alert("context menu on component " + component.id);
		originalEvent.preventDefault();

		var connid = component.id;
		alert("Connection ID " + connid);
		return false;
	});
	
	// suspend drawing and initialise.
	instance.doWhileSuspended(function() {

		// listen for new connections; initialise them the same way we initialise the connections at startup.
		instance.bind("connection", function(connInfo, originalEvent) { 
			init(connInfo.connection);
		});			
					
		// make all the window divs draggable						
		instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });		
		// THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector 
		// method, or document.querySelectorAll:
		//jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });
        
		// connect a few up
		//instance.connect({uuids:["Window2BottomCenter", "Window3TopCenter"], editable:true});
		//
        
		//
		// listen for clicks on connections, and offer to delete connections on click.
		//
		instance.bind("click", function(conn, originalEvent) {
			if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
				jsPlumb.detach(conn); 
		});	
		
		instance.bind("connectionDrag", function(connection) {
			console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
		});		
		
		instance.bind("connectionDragStop", function(connection) {
			console.log("connection " + connection.id + " was dragged");
		});

		instance.bind("connectionMoved", function(params) {
			console.log("connection " + params.connection.id + " was moved");
		});
	});

	$(".button_add_task").click(function () {
		_addTask();
	});

	$(".button_add_question").click(function () {
		_addQuestion();
	});

	$(".button_switch-task").click(function () {
		_switchTask();
	});

	$(".button_merge-task").click(function () {
		_mergeTask();
	});

	$(".button_finish-task").click(function () {
		_finishTask();
	});
	
	$(".button_assembly-task").click(function () {
		_assemblyTask();
	});

	$(".button_condition-task").click(function () {
		_conditionTask();
	});

	$(".button_process-task").click(function () {
		_processTask();
	});

	$("#saveButton").click(function () {
		saveFlowchart();
	});

	$("#loadButton").click(function () {
		loadFlowchart();
	});

	jsPlumb.fire("jsPlumbDemoLoaded", instance);

	
	$(function(){
		$.contextMenu({
		selector: '.shape,.window', 
		callback: function(key, options) {
		    var m = "clicked: " + key;
		    window.console && console.log(m) || alert(m); 
		},
		items: {
			"edit": {name: "Edit", icon: "edit", callback: function(key, options) {
				    var m = "Edit-clicked: " + key;
				    window.console && console.log(m) || alert(m); 
				}
			},
		    "cut": {name: "Cut", icon: "cut"},
		    "copy": {name: "Copy", icon: "copy"},
		    "paste": {name: "Paste", icon: "paste"},
		    "delete": {name: "Delete", icon: "delete", callback: function(key, options) {
				    if (confirm("Delete Shape  " + key + "?")) {
				    	var id = $(this).attr('id');
				    	
						instance.detachAllConnections(id);
						instance.removeAllEndpoints(id);
						$(this).remove();
					}
				}},
		    "sep1": "---------",
		    "quit": {name: "Quit", icon: "quit"}
		}
		});
	});

	var saveFlowchart = function (){
            var nodes = []
            $(".node").each(function (idx, elem) {
            var $elem = $(elem);
            var endpoints = instance.getEndpoints($elem.attr('id'));
            console.log('endpoints of '+$elem.attr('id'));
            console.log(endpoints);
                nodes.push({
                    blockId: $elem.attr('id'),
                    nodetype: $elem.attr('data-nodetype'),
                    positionX: parseInt($elem.css("left"), 10),
                    positionY: parseInt($elem.css("top"), 10)
                });
            });
            var connections = [];
            $.each(instance.getConnections(), function (idx, connection) {
		      connections.push({
		      connectionId: connection.id,
		      pageSourceId: connection.sourceId,
		      pageTargetId: connection.targetId,
		      anchors: $.map(connection.endpoints, function(endpoint) {

			return [[endpoint.anchor.x, 
			endpoint.anchor.y, 
			endpoint.anchor.orientation[0], 
			endpoint.anchor.orientation[1],
			endpoint.anchor.offsets[0],
			endpoint.anchor.offsets[1]]];

		      })
		    });
      	    });

            var flowChart = {};
            flowChart.nodes = nodes;
            flowChart.connections = connections;
            flowChart.numberOfElements = numberOfShapes;

            var flowChartJson = JSON.stringify(flowChart);
            console.log(flowChartJson);

            $('#jsonOutput').val(flowChartJson);
        };

var repositionElement = function repositionElement(id, posX, posY){
	$('#'+id).css('left', posX);
	$('#'+id).css('top', posY);
	instance.repaint(id);
}

var loadFlowchart = function (){
            var flowChartJson = $('#jsonOutput').val();
            var flowChart = JSON.parse(flowChartJson);
            var nodes = flowChart.nodes;
            $.each(nodes, function( index, elem ) {
                if(elem.nodetype === 'startpoint'){
                    repositionElement('startpoint', elem.positionX, elem.positionY);
                }else if(elem.nodetype === 'endpoint'){
                    repositionElement('endpoint', elem.positionX, elem.positionY);
                }else if(elem.nodetype === 'task'){
                    var id = _addTask(elem.blockId);
                    repositionElement(id, elem.positionX, elem.positionY);
                }else if(elem.nodetype === 'question'){
                    var id = _addQuestion(elem.blockId);
                    repositionElement(id, elem.positionX, elem.positionY);
				}else if(elem.nodetype === 'switch'){
                    var id = _switchTask(elem.blockId);
                    repositionElement(id, elem.positionX, elem.positionY);
				}else if(elem.nodetype === 'merge'){
                    var id = _mergeTask(elem.blockId);
                    repositionElement(id, elem.positionX, elem.positionY);
				}else if(elem.nodetype === 'finish'){
                    var id = _finishTask(elem.blockId);
                    repositionElement(id, elem.positionX, elem.positionY);
				}else if(elem.nodetype === 'assembly'){
                    var id = _assemblyTask(elem.blockId);
                    repositionElement(id, elem.positionX, elem.positionY);
				}else if(elem.nodetype === 'condition'){
                    var id = _conditionTask(elem.blockId);
                    repositionElement(id, elem.positionX, elem.positionY);
				}else if(elem.nodetype === 'process'){
                    var id = _processTask(elem.blockId);
                    repositionElement(id, elem.positionX, elem.positionY);
                }else{

                }
            });

           var connections = flowChart.connections;
		    $.each(connections, function( index, elem ) {
			    	var connection1 = instance.connect({
				    source: elem.pageSourceId,
				    target: elem.pageTargetId,
				    anchors: elem.anchors,
				    endpointStyle: [sourceEndpoint],
				    type:"connectorType"
		    	});

		        numberOfShapes = flowChart.numberOfElements;
		    });
}
	
});


