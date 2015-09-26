/**
 * @author Ryan Perry
 */
function handleResult(result) {
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

function onLoad() {
	
}
function setBg(url) {
	document.body.style.backgroundImage = "url(" + url + ")";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundAttachment = "fixed";
	document.body.style.backgroundSize = "cover";
	document.body.style.animationName = "bg-transform";
	document.body.style.animationDuration = "120s";
	document.body.style.animationIterationCount = "infinite";
}
$.ajax({
	url:"https://api.nasa.gov/planetary/apod?api_key=7aew7vcw7rzahpdR8apwkGsAdyWI6Ji8zCE44ACD",
	success: handleResult
});

$(window).load( onLoad );
