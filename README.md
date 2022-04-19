# Description 🚶‍♀️🚶

**BMWalker.js** is a simple JavaScript library supplying the marker information of the [biological motion](https://en.wikipedia.org/wiki/Biological_motion) 'Walker'.  
Now, you can draw it without difficulty!  
<a href="https://www.youtube.com/watch?v=dC20G0TBt6w"><img src="./images/keyvisual_play.png" alt="KeyVisual" width="640px"></a>  
[Concept movie.](https://www.youtube.com/watch?v=dC20G0TBt6w)

Now, the latest version is `0.6.0`(alpha-2 release).  

## Demos
### Full function demo
<img src="./images/ffdemo.png" alt="Full function demo" width="640px"> 

- [Full function Demo On GitHub](https://tetunori.github.io/BMWalker.js/sample/fullFunction/index.html), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/fullFunction)
- [Full function Demo On OpenProcessing](https://openprocessing.org/sketch/1543496)

### Application demos
<img src="./images/applications.png" alt="Applications" width="640px"> 
<details><summary>CLICK ME to show apps</summary>
<p>

#### Application 01
<img src="./images/app1.png" alt="Application 01" width="360px"> 

- [Application 01 Demo On GitHub](https://tetunori.github.io/BMWalker.js/sample/app-01/index.html), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/app-01)
- [Application 01 Demo On OpenProcessing](https://openprocessing.org/sketch/1543498)

<img src="./images/app2.png" alt="Application 02" width="360px"> 

#### Application 02
- [Application 02 Demo On GitHub](https://tetunori.github.io/BMWalker.js/sample/app-02/index.html), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/app-02)
- [Application 02 Demo On OpenProcessing](https://openprocessing.org/sketch/1543499)

#### Application 03
<img src="./images/app3.png" alt="Application 03" width="360px"> 

- [Application 03 Demo On GitHub](https://tetunori.github.io/BMWalker.js/sample/app-03/index.html), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/app-03)
- [Application 03 Demo On OpenProcessing](https://openprocessing.org/sketch/1543500)

#### Application 04
<img src="./images/app4.png" alt="Application 04" width="360px"> 

- [Application 04 Demo On GitHub](https://tetunori.github.io/BMWalker.js/sample/app-04/index.html), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/app-04)
- [Application 04 Demo On OpenProcessing](https://openprocessing.org/sketch/1543501)

#### Application 05
<img src="./images/app5.png" alt="Application 05" width="360px"> 

- [Application 05 Demo On GitHub](https://tetunori.github.io/BMWalker.js/sample/app-05/index.html), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/app-05)
- [Application 05 Demo On OpenProcessing](https://openprocessing.org/sketch/1543502)

#### Application 06
<img src="./images/app6.png" alt="Application 06" width="360px"> 

- [Application 06 Demo On GitHub](https://tetunori.github.io/BMWalker.js/sample/app-06/index.html), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/app-06)
- [Application 06 Demo On OpenProcessing](https://openprocessing.org/sketch/1543503)

#### Pigeon full function 
<img src="./images/pigeonffdemo.png" alt="Pigeon full function" width="360px"> 

- [Pigeon full function Demo On GitHub](https://tetunori.github.io/BMWalker.js/sample/pigeonFullFunction/index.html), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/pigeonFullFunction)
- [Pigeon full function Demo On OpenProcessing](https://openprocessing.org/sketch/1548125)


</p>
</details>


# Usage
## Import
```html 
<script src="https://tetunori.github.io/BMWalker.js/dist/v0.6.0/bmwalker.js"></script>
```
## Basic Usage
Just new `BMWalker()` and you can get marker coordinates via `getMarkers()` method.

```javascript
// Create biological motion walker instance
const bmw = new BMWalker();

// Get array of the current marker coordinates 
const walkerHeight = 200;
const markers = bmw.getMarkers(walkerHeight);
```
Received array consists of objects as below.

```javascript
// Return value of getMarkers()
[
  { x:  3.18, y: -170.70, desc: 'Head' },
  { x:  2.74, y: -115.11, desc: 'Clavicles' },
  { x: 40.24, y: -121.91, desc: 'L-Shoulder' },
  // ...
]
```

So we can draw gotton markers like below.
```javascript
// Draw each markers
markers.forEach((m) => {
  circle(m.x, m.y, 6);
});
```
### Example: Basic Usage
<img src="./images/ex0-1.webp" alt="Example 0-1: Basic Usage" width="360px"> 

 - ['Example 0-1: Basic Usage' On GitHub](https://tetunori.github.io/BMWalker.js/sample/ex0-1/), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/ex0-1)
 - ['Example 0-1: Basic Usage' On OpenProcessing](https://openprocessing.org/sketch/1543504)

# API Specification
<details><summary>CLICK ME</summary>
<p>

## API List
- [Constructor](#Constructor)
- [Methods](#Methods)
  - [getMarkers](#getMarkers)
  - [getLineMarkers](#getLineMarkers)
  - [setSpeed](#setSpeed)
  - [setWalkerParam](#setWalkerParam)
  - [setCameraParam](#setCameraParam)
  - [setTranslationParam](#setTranslationParam)
  - [resetTimer](#resetTimer)

## Constructor
```javascript
new BMWalker([type: Number])
```

Parameters:
|  name  |  note  |
| ---- | ---- |
|  [`type`]  | Optional. `Number`: Specify `BMW_TYPE_HUMAN` or `BMW_TYPE_PIGEON`. If unspecified, `BMW_TYPE_HUMAN` is selected automatically. |

Returns:
BMWalker instance.

ExampleP-1: Constructor Example P
```javascript
// Create biological motion walker instance
const bmw = new BMWalker(BMW_TYPE_PIGEON);
```
<img src="./images/exP-1.webp" alt="Example P-1: Pigeon Basic Example" width="360px"> 

 - ['Example P-1: Pigeon Basic Example' On GitHub](https://tetunori.github.io/BMWalker.js/sample/exP-1/), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/exP-1)
 - ['Example P-1: Pigeon Basic Example' On OpenProcessing](https://openprocessing.org/sketch/1548115)

## Methods
### getMarkers
```javascript
getMarkers(walkerHeight: Number, [tmsec: Number])
```

Overview:  
Get all markers that make up 'Walker'.

Parameters:
|  name  |  note  |
| ---- | ---- |
|  `walkerHeight`   | `Number`: Height size of the 'Walker'. This method returns the coordinates as the height of 'Walker' fits into this value. |
|  [`tmsec`]  | Optional. `Number`: Specify the time in msec for which you would like to get markers. If unspecified, this method returns current marker coordinates. |

Returns:  
Array of the marker data `Object` at specified time. Each data `Object` has properties below.
|  name  |  note  |
| ---- | ---- |
|  `x`  |  `Number`: x-coordinate of the marker.  |
|  `y`  |  `Number`: y-coordinate of the marker.  |
|  `desc`  |  `String`: Description of the marker like `'Head'`, `'Clavicles'` and so on.  |
```javascript
// Example of Return value of getMarkers()
[
  { x:  3.18, y: -170.70, desc: "Head" },
  { x:  2.74, y: -115.11, desc: "Clavicles" },
  { x: 40.24, y: -121.91, desc: "L-Shoulder" },
  // ...
]
```


Example1-1: getMarkers Example 1
```javascript
// Create biological motion walker instance
const bmw = new BMWalker();

// Get array of the current marker coordinates 
const walkerHeight = 100;
const markers = bmw.getMarkers(walkerHeight);

// Draw each markers
markers.forEach((m) => {
  circle(m.x, m.y, 6);
});
```
<img src="./images/ex1-1.webp" alt="Example 1-1: getMarkers Example 1" width="360px"> 

 - ['Example 1-1: getMarkers Example 1' On GitHub](https://tetunori.github.io/BMWalker.js/sample/ex1-1/), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/ex1-1)
 - ['Example 1-1: getMarkers Example 1' On OpenProcessing](https://openprocessing.org/sketch/1543505)


Example1-2: getMarkers Example 2
```javascript
// Create biological motion walker instance
const bmw = new BMWalker();

// Get array of the marker coordinates with bigger size and specified time. 
const walkerHeight = 350;
const specifiedTime = 500;
const markers = bmw.getMarkers(walkerHeight, specifiedTime);

// Draw each markers with descriptions
markers.forEach((m) => {
  circle(m.x, m.y, 6);
  text(m.desc, m.x, m.y + 15);
});
```
<img src="./images/ex1-2.png" alt="Example 1-2: getMarkers Example 2" width="360px"> 

 - ['Example 1-2: getMarkers Example 2' On GitHub](https://tetunori.github.io/BMWalker.js/sample/ex1-2/), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/ex1-2)
 - ['Example 1-2: getMarkers Example 2' On OpenProcessing](https://openprocessing.org/sketch/1543506)

### getLineMarkers
```javascript
getLineMarkers(walkerHeight: Number, [tmsec: Number])
```
Overview:  
Get combinations of marker coordinates for both ends of all lines that make up 'Walker'.

Parameters:
|  name  |  note  |
| ---- | ---- |
|  `walkerHeight`   | `Number`: Height size of the 'Walker'. This method returns as the height of 'Walker' fits into this value. |
|  [`tmsec`]  | Optional. `Number`: Specify the time in msec for which you would like to get. If unspecified, this method returns with current time. |

Returns:
Array of the combination of 2 marker `Object`s. Each marker `Object` has properties below.
|  name  |  note  |
| ---- | ---- |
|  `x`  |  `Number`: x-coordinate of the marker.  |
|  `y`  |  `Number`: y-coordinate of the marker.  |
|  `i`  |  `Number`: Index value of the marker.  |

```javascript
// Example of Return value of getLineMarkers()
[
  [ // Line 0
    { // Marker 0
      x: -0.95,
      y: -47.4,
      i: 0,
    },
    { // Marker 1
      x: -0.76,
      y: -31.95,
      i: 1,
    },
  ],
  [ // Line 1
  // ...
]
```

Example2-1: getLineMarkers Example
```javascript
// Create biological motion walker instance
const bmw = new BMWalker();

// Get array of the current line markers
const walkerHeight = 300;
const lineMarkers = bmw.getLineMarkers(walkerHeight);

// Draw lines
lineMarkers.forEach((m) => {
  line(m[0].x, m[0].y, m[1].x, m[1].y);
});
```

<img src="./images/ex2-1.webp" alt="Example 2-1: getLineMarkers Example" width="360px"> 

 - ['Example 2-1: getLineMarkers Example' On GitHub](https://tetunori.github.io/BMWalker.js/sample/ex2-1/), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/ex2-1)
 - ['Example 2-1: getLineMarkers Example' On OpenProcessing](https://openprocessing.org/sketch/1543507)


### setSpeed
```javascript
setSpeed(speed: Number)
```
Overview:  
Set walking speed.

Parameters:
|  name  |  note  |
| ---- | ---- |
|  `speed`   | `Number`: Walking speed of the 'Walker'. Set values between `minSpeed` and `maxSpeed`(automtically clamped). Default value is `1.0`. Setting `0` means stop walking. Walk backward when negative values are set. |

Example 3-1: setSpeed Example
```javascript
// Create biological motion walker instance
const bmw = new BMWalker();

// Set speed with mouseX coordinate.
const spd = map(mouseX, 0, width, bmw.minSpeed, bmw.maxSpeed);
bmw.setSpeed(spd);
```
<img src="./images/ex3-1.webp" alt="Example 3-1: setSpeed Example" width="360px"> 

 - ['Example 3-1: setSpeed Example' On GitHub](https://tetunori.github.io/BMWalker.js/sample/ex3-1/), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/ex3-1)
 - ['Example 3-1: setSpeed Example' On OpenProcessing](https://openprocessing.org/sketch/1543508)


### setWalkerParam
```javascript
setWalkerParam(bodyStructure: Number, weight: Number, nervousness: Number, happiness: Number)
```
Overview:  
Set parameters on the motion of 'Walker'. Valid if the type is `BMW_TYPE_HUMAN` only.

Parameters:
|  name  |  note  |
| ---- | ---- |
|  `bodyStructure`   | `Number`: Adjust parameters on body structure. Set values between `minBodyStructure` and `maxBodyStructure`(automtically clamped). Default value is `0`(means neutral). |
|  `weight`   | `Number`: Adjust parameters on weight. Set values between `minWeight` and `maxWeight`(automtically clamped). Default value is `0`(means neutral). Positive values are heavy and negative values are light. |
|  `nervousness`   | `Number`: Adjust parameters on nervousness. Set values between `minNervousness` and `maxNervousness`(automtically clamped). Default value is `0`(means neutral). Positive values are nervous and negative values are relaxed. |
|  `happiness`   | `Number`: Adjust parameters on happiness. Set values between `minHappiness` and `maxHappiness`(automtically clamped). Default value is `0`(means neutral). Positive values are happy and negative values are sad.|

Example 4-1: setWalkerParam Example
```javascript
// Create biological motion walker instance
const bmw = new BMWalker();

// Set walker parameters.
const bodyStructure = 1.0;
const weight = -0.2;
const nervousness = 0.0;
const happiness = 3.1;
bmw.setWalkerParam(bodyStructure, weight, nervousness, happiness);
```
<img src="./images/ex4-1-1.webp" alt="Example 4-1-1: setWalkerParam Example 1-1" width="360px"> 
<img src="./images/ex4-1-2.webp" alt="Example 4-1-2: setWalkerParam Example 1-2" width="360px"> 

 - ['Example 4-1: setWalkerParam Example' On GitHub](https://tetunori.github.io/BMWalker.js/sample/ex4-1/), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/ex4-1)
 - ['Example 4-1: setWalkerParam Example' On OpenProcessing](https://openprocessing.org/sketch/1543509)


### setCameraParam
```javascript
setCameraParam(azimuth: Number, angularVelocity: Number, elevation: Number, roll: Number)
```
Overview:  
Set parameters on the camera.

Parameters:
|  name  |  note  |
| ---- | ---- |
|  `azimuth`   | `Number`: The rotation angle(in radians) of the 'Walker' around the vertical axis. Set values from `-PI` to `PI`. Default value is `0`. |
|  `angularVelocity`   | `Number`: The rotation speed(**radians/sec**) of the 'Walker'. `0` would mean the 'Walker' that does not rotate over a trial. Default value is `0` and recommendation settings are from `-2*PI` to `2*PI`. |
|  `elevation`   | `Number`: The elevation of the camera with respect to the 'Walker'. Essentially a rotation angle(in radians) around the horizontal axis. Set values from `-PI` to `PI`. Default value is `0`. |
|  `roll`   | `Number`: The roll angle of the camera. Set values from `-PI` to `PI`. Default value is `0`. |

Example 5-1: setCameraParam Example 1
```javascript
// Create biological motion walker instance
const bmw = new BMWalker();

// Set walker parameters.
const azimuth = Math.PI / 4;
const angularVelocity = 0;
const elevation = Math.PI / 4;
const roll = 0;
bmw.setCameraParam(azimuth, angularVelocity, elevation, roll);
```
<img src="./images/ex5-1.webp" alt="Example 5-1: setCameraParam Example 1" width="360px"> 

 - ['Example 5-1: setCameraParam Example 1' On GitHub](https://tetunori.github.io/BMWalker.js/sample/ex5-1/index.html), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/ex5-1)
 - ['Example 5-1: setCameraParam Example 1' On OpenProcessing](https://openprocessing.org/sketch/1543510)


Example 5-2: setCameraParam Example 2
```javascript
// Create biological motion walker instance
const bmw = new BMWalker();

// Set walker parameters.
const azimuth = 0;
const angularVelocity = Math.PI / 4;
const elevation = Math.PI / 4;
const roll = 0;
bmw.setCameraParam(azimuth, angularVelocity, elevation, roll);
```
<img src="./images/ex5-2.webp" alt="Example 5-2: setCameraParam Example 2" width="360px"> 

 - ['Example 5-2: setCameraParam Example 2' On GitHub](https://tetunori.github.io/BMWalker.js/sample/ex5-2/), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/ex5-2)
 - ['Example 5-2: setCameraParam Example 2' On OpenProcessing](https://openprocessing.org/sketch/1543511)


### setTranslationParam
```javascript
setTranslationParam(flagTranslation: Boolean)
```
Overview:  
Set parameters on translation. It is recommended that `resetTimer()` be called in advance when `flagTranslation` is enabled. See [resetTimer()](#resetTimer).

Parameters:
|  name  |  note  |
| ---- | ---- |
|  `flagTranslation`   | `Boolean`: Whether translation should be enabled or disabled. Default value is `false`. When this flag is enabled, `angularVelocity` setting will be ignored. |

Example 6-1: setTranslationParam Example
```javascript
// Create biological motion walker instance
const bmw = new BMWalker();

// Set params on translation.
const enableTranslation = true;
bmw.setTranslationParam(enableTranslation);
```
<img src="./images/ex6-1.webp" alt="Example 6-1: setTranslationParam Example" width="360px"> 

 - ['Example 6-1: setTranslationParam Example' On GitHub](https://tetunori.github.io/BMWalker.js/sample/ex6-1/), [Source code On GitHub](https://github.com/tetunori/BMWalker.js/tree/main/sample/ex6-1)
 - ['Example 6-1: setTranslationParam Example' On OpenProcessing](https://openprocessing.org/sketch/1543512)


### resetTimer
```javascript
resetTimer()
```
Overview:  
Reset 'Walker' timer(set at constructor). It is recommended that `resetTimer()` be called in advance when `flagTranslation` is enabled. See [setTranslationParam](#setTranslationParam).

</p>
</details>

# License
Attribution-NonCommercial-ShareAlike 4.0 International  
Copyright (c) 2022 [Tetsunori Nakayama](https://twitter.com/tetunori_lego) and [Nikolaus Troje](https://www.biomotionlab.ca/niko-troje/).
For commercial use, please contact us.

This library is based on the results of [BioMotion Lab](https://www.biomotionlab.ca/)'s researches in York University.  
See the URL below in detail.  
https://www.biomotionlab.ca/

# Author
Tetsunori Nakayama.
