//from http://j4n.co/blog/batch-rendering-screenshots-with-phantomjs

var URLS =['http://fatemaalmalki.georgetown.domains','http://ale.georgetown.domains','http://boston.georgetown.domains','http://ceres.georgetown.domains','http://ac1610.georgetown.domains'];


var SCREENSHOT_WIDTH = 1280; 
var SCREENSHOT_HEIGHT = 768; 
var LOAD_WAIT_TIME = 5000; 

var getPageTitle = function(page){
    var documentTitle = page.evaluate(function(){
        return document.title; 
    })
    console.log("getting title:", documentTitle)
    return documentTitle; 
}

var getPageHeight = function(page){
    var documentHeight = page.evaluate(function() { 
        return document.body.offsetHeight; 
    })
    console.log("getting height:", documentHeight)
    return documentHeight; 
}

var renderPage = function(page,index,URLS){

    var title =  URLS[index].substring(7);

    var pageHeight = getPageHeight(page); 

    page.clipRect = {
        top:0,left:0,width: SCREENSHOT_WIDTH, 
        height: SCREENSHOT_HEIGHT
    };
    page.render('/home/bionicte/public_html/gtown/screenshots/'+title+".png");
    console.log("rendered:", title+".png")
}

var exitIfLast = function(index,array){
    console.log(array.length - index-1, "more screenshots to go!")
    console.log("~~~~~~~~~~~~~~")
    if (index == array.length-1){
        console.log("exiting phantomjs")
        phantom.exit();
    }
}

var takeScreenshot = function(element){

    console.log("opening URL:", element)

    var page = require("webpage").create();

    page.viewportSize = {width:SCREENSHOT_WIDTH, height:SCREENSHOT_HEIGHT};

    page.open(element); 

    console.log("waiting for page to load...")

    page.onLoadFinished = function() {
        setTimeout(function(){
            console.log("that's long enough")
            renderPage(page,index,URLS)
            exitIfLast(index,URLS)
            index++; 
            takeScreenshot(URLS[index]);
        },LOAD_WAIT_TIME)
    }

}

var index = 0; 

takeScreenshot(URLS[index]);