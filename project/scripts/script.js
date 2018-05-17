var Scene = require('Scene')
var D = require('Diagnostics')
var TouchGestures = require('TouchGestures')
var Reactive = require('Reactive')
var Time = require('Time');

var camera = Scene.root.find('Camera')
var plane0 = Scene.root.find('planet.dae')
// var outWindow = Scene.root.find('outWindow');
// var transparentPlane = Scene.root.find('plane0');

var camPos = Reactive.point(
Reactive.val(camera.transform.x.lastValue),
Reactive.val(camera.transform.y.lastValue),
Reactive.val(camera.transform.z.lastValue));

var objPos = Reactive.point(
Reactive.val(plane0.transform.x.lastValue),
Reactive.val(plane0.transform.y.lastValue),
Reactive.val(plane0.transform.z.lastValue));

// var initialDistance = camPos.distance(objPos).round();
// D.watch('initial original', initialDistance);

// target to track distance to
var planePosition = Reactive.point(
	plane0.transform.x.lastValue, 
	plane0.transform.y.lastValue, 
	plane0.transform.z.lastValue)
plane0.transform.position = planePosition;

var pixelPoint = Reactive.point2d(
	Reactive.val(0), 
	Reactive.val(0));

var camPosition = Scene.unprojectWithDepth(pixelPoint, 0.01);
var distance = camPosition.distance(planePosition).round();

D.watch('cam.x', camPosition.x)
D.watch('cam.y', camPosition.y)
D.watch('cam.z', camPosition.z)
D.watch('distance', distance);

// Time.ms.interval(500).subscribe(
//   function (elapsedTime) {
//   	D.log(distance.lastValue);
//     // if (camPosition.x.lastValue < 9)
//       // transparentPlane.hidden = false;
//   	// D.log(initialDistance.lastValue);
//   	// planetObj.transform.scale = Reactive.scale(0, 0, 0);
//   	// var calc = 5 * initialDistance.lastValue/distance.lastValue;
//   	// planetObj.transform.scale = Reactive.scale(calc, calc, calc);
//     // calc = 1 * initialDistance.lastValue/distance.lastValue;
//     // window.transform.scale = Reactive.scale(calc, calc, calc);
//   });

// outWindow.hidden = distance.gt(100);
// outWindow.hidden = distance.lt(0);
