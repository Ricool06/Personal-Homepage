/**
 * @author Ryan Perry
 */
function onLoad() {
	clock(document.getElementById("clock"));
}

function handleApodResult(result) {
	imgUrl = result.url;
	maxSizeImgUrl = imgUrl.replace("1024","2048");
	xhr = new XMLHttpRequest();
	xhr.open("GET", maxSizeImgUrl, true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
				setBg(maxSizeImgUrl);
		}
		else{
			setBg(imgUrl);
		}
	};
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
	return ""+h+":"+m+":"+s;
}

$.ajax({
	url:"https://api.nasa.gov/planetary/apod?api_key=7aew7vcw7rzahpdR8apwkGsAdyWI6Ji8zCE44ACD",
	success: handleApodResult
});

$(window).load( onLoad );
