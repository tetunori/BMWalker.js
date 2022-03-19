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
  circle(m.x, m.y, 10);
});
```
### p5.js sample-01: Basic Usage
<img src="https://tetunori.github.io/BMWalker/images/sample01.png" alt="Sample-01: Basic Usage" width="360px"> 

 - ['Sample-01: Basic Usage' On GitHub](https://tetunori.github.io/BMWalker/samples/01/)
 - ['Sample-01: Basic Usage' On OpenProcessing](https://openprocessing.org/sketch/1338726)

# API Specification
<details><summary>CLICK ME</summary>
<p>

## Constructors
### constructor
```javascript
new mPSS([sideLength: Number])
```
Parameters:
|  name  |  note  |
| ---- | ---- |
|  [`sideLength`]   | `Number`: Size of the outline (biggest)square. Optional.  |

Returns:
mPSS instance.

## Properties
### Transform type ID
```javascript
// Number
mPSS.tfTypeIdOriginal;
mPSS.tfTypeIdRotate90;
mPSS.tfTypeIdRotate180;
mPSS.tfTypeIdRotate270;
mPSS.tfTypeIdMirror;
mPSS.tfTypeIdMirrorRotate90;
mPSS.tfTypeIdMirrorRotate180;
mPSS.tfTypeIdMirrorRotate270;
```

## Methods
### getSquares
```javascript
getSquares([transformTypeIndex: Number])
```
Parameters:
|  name  |  note  |
| ---- | ---- |
|  [`transformTypeIndex`]   | `Number`: Specify `mPSS.tfTypeId*`. Default value is `mPSS.tfTypeIdOriginal` Optional. |

Returns:
Array of the square data. Each data has properties below.
|  name  |  note  |
| ---- | ---- |
|  `x`  |  `Number`: x-coordinate of the square.  |
|  `y`  |  `Number`: y-coordinate of the square.  |
|  `size`  |  `Number`: side size of the square.  |
|  `centerX`  |  `Number`: x-coordinate of the center of the square.  |
|  `centerY`  |  `Number`: y-coordinate of the center of the square.  |
|  `originalSize`  |  `Number`: side size of the square before transformed. If you do not specify the size in the Constructor, this is the same as `size` property.  |

### getSmallestSizeSquares
```javascript
getSmallestSizeSquares([squareTypeIndex: Number], [transformTypeIndex: Number]) {
```
Parameters:
|  name  |  note  |
| ---- | ---- |
|  [`squareTypeIndex`]   | `Number`: Specify square type index `0`, `1` or `2`. Default value is `0`. Optional. |
|  [`transformTypeIndex`]   | `Number`: Specify `mPSS.tfTypeId*`. Default value is `mPSS.tfTypeIdOriginal` Optional. |

Returns:
Array of the square data. See `getSquares()` section.

</p>
</details>

# License
Attribution-NonCommercial-ShareAlike 4.0 International  
Copyright (c) 2022 Tetsunori Nakayama and Nikolaus Troje.
For commercial use, please contact us.

This library is based on the results of BIO-MOTION-LAB's researches in York University.  
See the URL below in detail.  
https://www.biomotionlab.ca/

# Author
Tetsunori Nakayama.
