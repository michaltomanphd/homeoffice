
/*

pattern = {
             name: P1,
             image: img1
}

grammar = {
              name: G1,
              pattern: P1,
              repeat: {
                       x: 10,4y: -1
              }
}

*/

var resultImageWidth = 1000;
var resultImageHeight = 1000;

var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(resultImageWidth, resultImageHeight)
  , ctx = canvas.getContext('2d');
 
var fs = require('fs');

var imgData = null;
var img = new Image;
var repeatX = 6, x = 0;
var repeatY = 8, y = 0;
var shiftX = 30;
var shiftY = 80;

saveImage = function() {
  canvas.toBuffer(function (err, buf) {
	  if (err) throw err;
	  fs.writeFile(__dirname + '/output.png', buf);
  });
}

drawImage = function() { 
  img.src = imgData;
  var startX = shiftX * y + x * 95;
  var startY = shiftY + y * 90;
  ctx.drawImage(img, startX, startY, img.width / 10, img.height / 10);
  if (x < repeatX) {
    x++;
    setTimeout(drawImage, 1);
  }
  else if (y < repeatY) {
    y++;
    x = 0;
    setTimeout(drawImage, 1);
  }
  else {
    saveImage();
  }
}

fs.readFile(__dirname + '/images/strom_1.png', function(err, data){
  if (err) throw err;
  imgData = data;
  drawImage();
});
