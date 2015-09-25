/**
 * @author Ryan Perry
 */
function handleResult(result) {
	maxSizeImgUrl = result.url.replace("1024","");
	document.body.style.backgroundImage = "url(" + maxSizeImgUrl + ")";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundAttachment = "fixed";
	document.body.style.backgroundSize = "cover";
	document.body.style.animationName = "bg-transform";
	document.body.style.animationDuration = "60s";
	document.body.style.animationIterationCount = "infinite";
};

function onLoad() {
	
}
function animateBg() {
	
}
$.ajax({
	url:"https://api.nasa.gov/planetary/apod?api_key=***REMOVED***",
	success: handleResult
});

$(window).load( onLoad );
