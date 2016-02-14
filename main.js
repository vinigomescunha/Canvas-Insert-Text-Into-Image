
/*event click to send file image */
var set = document.getElementById('set'), imgFile = document.getElementById('imgFile');
set.addEventListener('click', function(e) {
	if (imgFile.files.length > 0) 
		ic.handle(imgFile);
}, false);

/* populate select with array */
var sel = document.getElementById('type'), opts = ['Kanit', 'Oswald', 'Quicksand', 'Trochut', 'Vast Shadow'];
for (var i in opts) {
	var opt = document.createElement('option');
	opt.text = opts[i];
	opt.value = opts[i];
	sel.appendChild(opt);
}

/* js manipule canvas from form :P */
var ic = {
	text: '',
	canvas: '',
	context: '',
	dimensions: [],
	setFont: function($f) {
		var link = document.createElement('link');
		link.rel = 'stylesheet', link.id = $f.toLowerCase(), link.type = 'text/css',
			link.href = 'http://fonts.googleapis.com/css?family=' + $f;
		if (!document.getElementById($f.toLowerCase()))
			document.getElementsByTagName('head')[0].appendChild(link);
	},
	handle: function(e) {
		ic.setFont(document.getElementById('type').value.replace(' ', '+'));
		ic.canvas = document.getElementById('imageCanvas');
		ic.context = ic.canvas.getContext('2d');
		ic.text = document.getElementById('texto').value;
		var maxWidth = 0,
			reader = new FileReader(),
			img = new Image();
		reader.onload = function(event) {
			img.onload = function() {
				var lineHeight = 30,
				xv = document.getElementById('x').value,
				xy = document.getElementById('y').value,
				fs = document.getElementById('size').value,
				ft = document.getElementById('type').value,
				x = xv ? xv : 10,
				y = xy ? xy : 20,
				cfont = fs + 'px ' + ft;
				ic.canvas.width = img.width;
				ic.canvas.height = img.height;
				ic.canvas.fillStyle = 'rgba(32, 45, 21, 0.3)';
				ic.context.drawImage(img, 0, 0);
				ic.context.lineStyle = '#FFFFFF';
				ic.context.font = cfont.toString(); //'30px Verdana'
				maxWidth = img.width;console.log(fs);
				ic.insertText(x, y, maxWidth, lineHeight);
			}
			img.src = event.target.result;
		}
		reader.readAsDataURL(e.files[0]);
		if (!document.getElementById('d')) {
			d = ic.create({e: 'button', params:{innerHTML: 'Download', id: 'd', className: 'form right', onclick: function() {ic.download();}}});
			document.getElementById('submit').appendChild(d);
			d = ic.create({e: 'button', params:{innerHTML: 'Invert', id: 'i', className: 'form right', onclick: function(){invert();}}});
			document.getElementById('submit').appendChild(d);
			d = ic.create({e: 'button', params:{innerHTML: 'Grayscale', id: 'i', className: 'form right', onclick: function(){grayscale();}}});
			document.getElementById('submit').appendChild(d);
			d = ic.create({e: 'button', params:{innerHTML: 'Opacity(Mark)', id: 'i', className: 'form right', onclick: function(){opacity();}}});
			document.getElementById('submit').appendChild(d);
		}
	},
	create: function (o) {
		var d = document.createElement(o.e);
		for(var i in o.params) d[i] = o.params[i];
		return d;	
	},
	insertText: function(x, y, maxWidth, lineHeight) {
		var w = ic.text.split(' '),
			line = ' ';console.log(w)
		for(var i=0; i < w.length; i++) {
			var t  = line + w[i] + ' ';
			tw = ic.context.measureText(t);
			if(tw.width > maxWidth){
				ic.context.fillText(line, x, y);
				line = w[i] + ' ';
				y = parseInt(y) + lineHeight;
			} else {
				line = t;
			}
			ic.context.fillText(line, x, y);
		}
	},
	download: function() {
		var l = document.createElement('a');
		l.href = ic.canvas.toDataURL();
		l.download = (new Date().toISOString().replace(new RegExp(':', 'g'), '-')) + '.png';
		document.getElementsByTagName('body')[0].appendChild(l);
		l.click();
	}
};

//ads click sample
var canvas = document.getElementById('adversitment'), ctx = canvas.getContext('2d');
canvas.onclick = function() {
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#fff';
	ctx.font = '50px sans-serif';
	ctx.fillText('Clicked ... ', 200, 60);
	//window.open('http://github.com/vinigomescunha');
	ctx.font = '20px Arial';
	var txt = 'Thank You!', h = (canvas.width - parseInt(ctx.measureText(txt).width)) / 2;
	ctx.fillText(txt, parseInt(h), 85);
}

//ads sample
function simpleAdversitment() {
	/* draw something */
	ctx.fillStyle = '#EC6148';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#ECE6A6';
	ctx.font = '30px sans-serif';
	ctx.fillText('Github say: This is my ads generated', 120, 40);
	ctx.font = '20px Arial';
	ctx.fillText('Powered By "My Ads Example @vinigomescunha"', 15, 85);
	ctx.fillStyle = '#fff';
	ctx.font = '15px sans-serif';
	ctx.fillText('Click Here', (canvas.width - 75), (canvas.height - 15));
}
simpleAdversitment();

//watermark sample
watermark = function() {
	txt = 'This is a example of watermark';
    wcanvas = document.getElementById('watermarked_canvas');
    if (wcanvas.getContext) {
        wctx = wcanvas.getContext('2d');
        var im = new Image();
        im.src = 'image.jpg';
        im.onload = function() {
            var imgWidth = im.width;
            var imgHeight = im.height;
            wcanvas.width = imgWidth;
            wcanvas.height = imgHeight;
            wctx.drawImage(im, 0, 0);
            wctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            wctx.font = '40px sans-serif';
            wctx.fillText(txt, wcanvas.width - (txt.length * 15), wcanvas.height - 40);
            wctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
            wctx.fillText(txt, wcanvas.width - (txt.length * 15) - 2, wcanvas.height - 42)
        }
    }
}
watermark()
//invert color sample
invert = function () {
	var icanvas = document.getElementById('imageCanvas'),
	ictx = icanvas.getContext('2d');
	idata = ictx.getImageData(0,0,icanvas.width, icanvas.height);
	for (var i = 0; i < idata.data.length; i += 4) {
		idata.data[i] = 255 - idata.data[i];     // red
		idata.data[i + 1] = 255 - idata.data[i + 1]; // green
		idata.data[i + 2] = 255 - idata.data[i + 2]; // blue
	}
	ictx.putImageData(idata, 0, 0);
	document.getElementById('imageCanvas').toDataURL('image/png');
}
//gray scale sample
grayscale = function () {
	var gcanvas = document.getElementById('imageCanvas'),
	gctx = gcanvas.getContext('2d');
	gdata = gctx.getImageData(0,0,gcanvas.width, gcanvas.height);
	for (var i = 0; i < gdata.data.length; i += 4) {
		var avg = (gdata.data[i] + gdata.data[i +1] + gdata.data[i +2]) / 3;
		gdata.data[i] = avg;     // red
		gdata.data[i + 1] = avg; // green
		gdata.data[i + 2] = avg; // blue
	}
	gctx.putImageData(gdata, 0, 0);
	document.getElementById('imageCanvas').toDataURL('image/png');
}
//opacity  sample image
opacity = function() {
	var ocanvas = document.getElementById("imageCanvas"),
	octx = ocanvas.getContext("2d");
	var img = new Image(); 
	img.src = ocanvas.toDataURL('image/png');
	var img1 = img;
	if( img.complete ) {
		octx.drawImage(img1, 0, 0);
	} else {
		img.addEventListener('load', function() { octx.drawImage(img1, 0, 0); } );
	}
	var img = new Image();img.src = "mark.png",
	img2 = img,
	octx.globalAlpha = 0.25;
	if( img2.complete ) {
		octx.drawImage(img2, 0, 0);
	} else {
		img.addEventListener('load', function() { octx.drawImage(img2, 0, 0); } );
	}
}


