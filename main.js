
var set = document.getElementById('set'), imgFile = document.getElementById('imgFile');

set.addEventListener('click', function(e) {
	if (imgFile.files.length > 0) 
		ic.handle(imgFile);
}, false);

/*populate select with array*/
var sel = document.getElementById('type'), opts = ['Kanit', 'Oswald', 'Quicksand', 'Trochut', 'Vast Shadow'];
for (var i in opts) {
	var opt = document.createElement('option');
	opt.text = opts[i];
	opt.value = opts[i];
	sel.appendChild(opt);
}

/* js manipule canvas :P */
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
			var d = document.createElement('button');
			d.innerHTML = 'Download';
			d.id = 'd';
			d.className = 'form right';
			d.onclick = function() {
				ic.download();
			};
			document.getElementById('submit').appendChild(d);
		}
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
