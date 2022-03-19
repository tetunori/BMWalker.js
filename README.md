# Description 📐

**BMWalker.js** is a simple class supplying the marker information of the [Biological motion](https://en.wikipedia.org/wiki/Biological_motion) 'Walker'.  
Now, you can draw it without difficulty!  
<img src="https://tetunori.github.io/BMWalker/images/keyvisual.png" alt="logo" width="640px">  

Now, the latest version is `0.5.0`(alpha release).  

# Usage
## Import Data
```html 
<script src="https://tetunori.github.io/BMWalker/dist/v0.5.0/bmwalker.js"></script>
```
## Basic Usage
Just new `BMWalker()` and you can get an marker coordinates via `getMarkers()` method.

```javascript
// Create Biological motion walker instance
const bmw = new BMWalker();

// Get array of the current marker coordinates 
const walkerHeight = 100;
const markers = bmw.getMarkers(walkerHeight);
```
Received array consists of objects as below.

```javascript
// Return value of getMarkers()
[
  { x:  3.18, y: -170.70, desc: "Head" },
  { x:  2.74, y: -115.11, desc: "Clavicles" },
  { x: 40.24, y: -121.91, desc: "L-Shoulder" },
  ...
]
```

So we can draw gotton markers like below.
```javascript
// Draw each markers
markers.forEach((m) => {
  circle(m.x, m.y, 6);
});
```
### p5.js sample-01: Basic Usage
<img src="https://tetunori.github.io/BMWalker/images/sample01.png" alt="Sample-01: Basic Usage" width="360px"> 

 - ['Sample-01: Basic Usage' On GitHub](https://tetunori.github.io/BMWalker/samples/01/)
 - ['Sample-01: Basic Usage' On OpenProcessing](https://openprocessing.org/sketch/1338726)

# API Specification
<!-- <details><summary>CLICK ME</summary> -->
<!-- <p> -->

## API List
- [Constructor](#Constructor)
- Methods
  - [getMarkers](#getMarkers)

## Constructor
```javascript
new BMWalker()
```

Returns:
BMWalker instance.

## Methods
### getMarkers
```javascript
getMarkers(walkerHeight: Number, [tmsec: Number])
```

Parameters:
|  name  |  note  |
| ---- | ---- |
|  [`walkerHeight`]   | `Number`: Height size of the Walker. This method returns the coordinates as the height of 'Walker' fits into this value. |
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
  ...
]
```


Example1-1:
```javascript
// Create Biological motion walker instance
const bmw = new BMWalker();

// Get array of the current marker coordinates 
const walkerHeight = 100;
const markers = bmw.getMarkers(walkerHeight);

// Draw each markers
markers.forEach((m) => {
  circle(m.x, m.y, 6);
});

```

Example1-2:
```javascript
// Create Biological motion walker instance
const bmw = new BMWalker();

// Get array of the marker coordinates with bigger size and specified time. 
const walkerHeight = 300;
const specifiedTime = 500;
const markers = bmw.getMarkers(walkerHeight, specifiedTime);

// Draw each markers with descriptions
markers.forEach((m) => {
  circle(m.x, m.y, 6);
  text(m.desc, m.x, m.y + 20);
});
```

<!-- </p> -->
<!-- </details> -->

# License
Attribution-NonCommercial-ShareAlike 4.0 International  
Copyright (c) 2022 Tetsunori Nakayama and Nikolaus Troje.
For commercial use, please contact us.

This library is based on the results of BIO-MOTION-LAB's researches in York University.  
See the URL below in detail.  
https://www.biomotionlab.ca/

# Author
Tetsunori Nakayama.
