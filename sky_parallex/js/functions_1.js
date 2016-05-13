$(function(){
    var $sections = $("section");
        
    
    skrollr.init();
    
    $(window)
        .on("resize", resize)
        .trigger("resize");
});

function random(min, max){
    if(typeof max === "undefined"){
        max = min;
        min = 0;
    }
    return Math.random() * (max - min) + min;
}
function resize(){
    $("section")
        .height($(window).height());
}
