/**
 * 
 */
var Points,ctx,map={},can;
function getData() {
    console.log( "ready!" );
    $.ajax({
    	url: "https://rambo-test.cartodb.com:443/api/v2/sql?q=select%20*%20from%20public.mnmappluto",
    	method:"get"
    })
    .done(function(data){
    	Points = data.rows;
    })
    .fail(function(err){
    	console.log("Error making  requests"+err)
    })
}

function canvasInit() {
	 can = document.getElementById("myCanvas");
	 ctx = can.getContext("2d");
}
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawPoints() {
	Points.forEach(function(element,index,ar){
		if ( map[element.numfloors]== undefined) {
			map[element.numfloors] = 1;
		}
		else {
			map[element.numfloors] = map[element.numfloors]+1;
		}
	});
	var keys = [],dataValue=[],fillColor=[];
	var total=0;
	for(var k in map){ 
		keys.push(k);
		dataValue.push(map[k]);
		total = total+ map[k];
		fillColor.push(getRandomColor());
	}
	var oldAngle = 0;
	var midX = can.width /2;
	var midY = can.height /2;
	var radius = midY;
	 
	// do for each sample:
	for (i = 0; i < keys.length; i++) {
	    // draw wedge
	    var portion = dataValue[i] / total;
	    var wedge = 2 * Math.PI * portion;
	    ctx.beginPath();
	    var angle = oldAngle + wedge;
	    ctx.arc(midX, midY, radius, oldAngle, angle);
	    ctx.lineTo(midX, midY);
	    ctx.closePath();
	    ctx.fillStyle = fillColor[i];
	    ctx.fill();    // fill with wedge color
	    ctx.stroke();  // outline in black
	    oldAngle += wedge;
	}
}
$( document ).ready(function() {
	    $.getJSON("data/test.json",function(json){
	    	Points = json.rows;
	    	canvasInit();
	    	drawPoints();
	    	}
	    ); 
	}
);


