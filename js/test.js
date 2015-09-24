/**
 * @author Ryan Perry
 */

$.ajax({
	url:"https://api.nasa.gov/planetary/apod?api_key=***REMOVED***",
	success: handleResult
});

function handleResult(result) {
	document.body.style.backgroundImage = "url(" + result.url + ")";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundSize = "cover";
};
