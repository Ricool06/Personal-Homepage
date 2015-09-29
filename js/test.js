/**
 * @author Ryan Perry
 */
function onLoad() {
	clock(document.getElementById("clock"));
	getDominantColorFromBg();
	initialFooterHeight = $( "#footer" ).height();
}

function handleApodResult(result) {
	imgUrl = result.url;
	hdUrl = result.hdurl;
	maxSizeImgUrl = imgUrl.replace("1024","2048");
	setBg(hdUrl);
	getDominantColorFromBg(imgUrl);
	title = result.title;
	explanation = result.explanation;
	revealText = "<h1>" + title + "</h1>\n<p>" + explanation + "</p>";
};

function setBg(url) {
	document.body.style.backgroundImage = "url(" + url + ")";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundAttachment = "fixed";
	document.body.style.backgroundSize = "cover";
	document.body.style.animationName = "bg-transform";
	document.body.style.animationDuration = "120s";
	document.body.style.animationIterationCount = "infinite";
}

function clock(clockElement) {
	date = new Date();
	hour = date.getHours();
	minute = date.getMinutes();
	second = date.getSeconds();
	time = normalizeTime(hour,minute,second);
	clockElement.innerHTML = time;
	setTimeout(function(){ clock(clockElement); }, 1000);
}

function normalizeTime(h,m,s) {
	if(h < 10) {
		h = "0"+h;
	}
	if(m < 10) {
		m = "0"+m;
	}
	if(s < 10) {
		s = "0"+s;
	}
	return ""+h+":"+m+"<seconds>:"+s+"</seconds>";
}

function getDominantColorFromBg() {
	invisImg = new Image;
	c = document.createElement("canvas");
	ctx = c.getContext("2d");
	
	invisImg.crossOrigin = "Anonymous";
	//Must set this before setting invisImg src otherwise, we get a cross-origin error.
	//Cross-origin error is when a local script tries to access potentially sensitive data on a remote DOM.
	//CORS (cross origin resource sharing) has been enabled for APOD for anyone.
	//Therefore, as long as invisImg's crossOrigin request is set to something, even Anonymous, it will work.

	invisImg.src = "https://api.nasa.gov/planetary/apod/direct?api_key=" + getKey();
	invisImg.onload = function(){
		c.width = invisImg.width;
		c.height = invisImg.height;
		ctx.drawImage(invisImg,0,0);
		imgData = ctx.getImageData(1, 1, c.width, c.height);
		
		primaryColours = [0,0,0,0];
	
		for(i = 0; i < (imgData.data.length); i+=4){
			primaryColours[0] += imgData.data[i+0];
			primaryColours[1] += imgData.data[i+1];
			primaryColours[2] += imgData.data[i+2];
			primaryColours[3] += imgData.data[i+3];
		}
		colourComponentAmount = imgData.data.length / 4;
		redAverage = Math.round(primaryColours[0] / colourComponentAmount);
		greenAverage = Math.round(primaryColours[1] / colourComponentAmount);
		blueAverage = Math.round(primaryColours[2] / colourComponentAmount);
		alphaAverage = Math.round(primaryColours[3] / colourComponentAmount);
		
		rgba = 'rgba('+redAverage+','+greenAverage+','+blueAverage+','+0.6+')';
		setUIColour([document.getElementById("centre-title"), document.getElementById("footer")], rgba);
	};
}

function setUIColour(elements, rgba){
	for(i = 0; i < elements.length; i++){
		elements[i].style.backgroundColor = rgba;
	}
}

function toggleInfo(){
	if(infoToggle){
		$( "#footer" ).animate({height: ""+initialFooterHeight+"px" });
		$( "#reveal-text" ).fadeOut(250);
		showClock();
	}else{
		$( "#footer" ).animate({height: "100%"});
		hideClock();
		document.getElementById("reveal-text").innerHTML = revealText;
		$( "#reveal-text" ).fadeIn(250);
	}
	infoToggle = !infoToggle;
}

function hideClock(){
	$( "#centre-title" ).fadeTo("fast", 0);
	$( "#clock" ).fadeTo("fast", 0);
}
function showClock(){
	$( "#centre-title" ).fadeTo("slow", 1);
	$( "#clock" ).fadeTo("slow", 1);
}

$.ajax({
	url:"https://api.nasa.gov/planetary/apod?hd=True&api_key=" + getKey(),
	success: handleApodResult
});

infoToggle = false;
initialFooterHeight = 0;
explanation = "";
title = "";
revealText = "";

$(window).load( onLoad );

//test date for APOD colourful image: date=2015-08-16&
//?direct and ?hd are not mentioned in the official documentation for APOD. However if you go to https://github.com/nasa/api-docs/issues/ you can find some API parameters that are very useful.
