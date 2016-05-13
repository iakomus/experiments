var _skrollr = null;
$(function(){
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
    var times  = 14,
        clouds = random(times * 1.5),
        trees  = random(times*2, times * 10),
        _moon = "",
        _clouds = "",
        _trees  = "",
        window_height = $(window).height(),
        window_width = $(window).width(),
        last = times + "00p", 
        plane_start = random(-50, 100),
        plane_end = random(plane_start, plane_start + 100), deg = Math.atan2(plane_end - plane_start, window_width),
        max = window_height > window_width ? window_height : window_width;
    
    
    for(var i = 0; i < clouds; i++){
        var ref = parseInt(random(window_height * .5)),
            so = parseInt(100 + window_width * Math.random() * 0.25) + "px",
            sf = parseInt(100 + window_width * Math.random() * 0.25) + "px",
            yo = ref + "px",
            yf = (ref + (parseInt(Math.random() * 10) % 2 ? -1 : 1) * window_height * Math.random() * .25) + "px",
            xo = random(-.25 * window_width, 1.5 * window_width) + "px",
            xf = random(-.25 * window_width, 1.5 * window_width) + "px";
        
        _clouds += "<div class='cloud cloud_" + parseInt(random(10)) + "'\
                    data-0='width:" + so + "; height:" + so + "; left:" + xo + "; top:" + yo + "; transform:rotate(0deg); opacity: " + 0.5 * Math.random() + ";'\
         data-" + (times*2) + "00p='width:" + sf + "; height:" + sf + "; left:" + xf + "; top:" + yf + "; transform:rotate(" + random(20) + "deg); opacity: " + 0.5 * Math.random() + ";'\
                    ></div>";
    }
    for(var i = 0; i < trees; i++){
        var ref = parseInt(random(window_height * .5)),
            so = parseInt(random(window_width * 0.05, window_width * 0.1)),
            xo = random(-so*i, window_width + so*i);
        
        _trees += "<div class='tree tree_" + parseInt(random(10)) + "'\
                    data-0='width:" + so + "px; height:" + so + "px; left:" + xo + "px;'\
         data-" + last + "='width:" + so + "px; height:" + so + "px; left:" + (xo + (i%2?1:-1)*10) + "px;'\
                    ></div>";
    }
    _moon = "<ul><li/><li/><li/><li/><li/><li/><li/></ul>";
    $("body")
        .height($(window).height()*times)
        .attr("data-0p", "background-color: rgb(255,255,255)")
        .attr("data-" + last, "background-color: rgb(50,50,50)")
        .find("#background")
            .find("#clouds")
                .html(_clouds)
                .end()
            .find("#moon")
                .css({
                    "transform-origin-x": (window_width + 50*2.5)/2,
                    "transform-origin-y": (window_width + 50*2.5)/2
                })
                .attr("data-250p", "transform: rotate(180deg) scale(1); opacity: .75;")
                .attr("data-1150p", "transform: rotate(360deg) scale(.5); opacity: .25;")
                .attr("data-1800p", "transform: rotate(540deg) scale(1); opacity: .75;")
                .attr("data-2700p", "transform: rotate(720deg) scale(.5); opacity: .25;")
                
                .html(_moon)
                .end()
            .find("#sun")
                .css({
                    "transform-origin-x": (window_width + 50*2.5)/2,
                    "transform-origin-y": (window_width + 50*2.5)/2
                })
                .attr("data-250p", "transform: rotate(0deg) scale(1); opacity: .75;")
                .attr("data-1150p", "transform: rotate(180deg) scale(.5); opacity: .25;")
                .attr("data-1800p", "transform: rotate(360deg) scale(1); opacity: .75;")
                .attr("data-2700p", "transform: rotate(540deg) scale(.5); opacity: .25;")
                .end()
            .find("#mountains")
                .find(".mountain").each(function(i , object){
                    $(object)
                        .attr("data-0p", "background-position: 0% 100%")
                        .attr("data-" + (times*2) + "00p", "background-position: -" + (i*25 + 75) + "% 100%");
                    if(!i){
                        $(object)
                            .attr("data-1100p", "opacity: 1;")
                            .attr("data-1200p", "opacity: 0;");
                    }
                }).end()
                .end()
            .find("#trees")
                .html(_trees)
                .end();

    /*
    
    for(var i = 0; i < clouds; i++){
        var ref = parseInt(random(window_height));
        background_images += (i ? ", " : "") + "url(images/real_cloud_" + parseInt(random(0,4)) + ".png)";
        background_size_start += (i ? ", " : "") + parseInt(200 + window_width * Math.random() * 0.15) + "px";
        background_size_end += (i ? ", " : "") + parseInt(200 + window_width * Math.random() * 0.15) + "px";
        background_position_start += (i ? ", " : "") + random(-.25*window_width, 1.5*window_width) + "px " + ref + "px"; 
        background_position_end += (i ? ", " : "") + random(-.25*window_width, 1.5*window_width) + "px " + (ref + (parseInt(Math.random()*10)%2?-1:1)*window_height*Math.random()*.25) + "px"; 
    }    
    for(var i = 0; i < parseInt(random(5, 30)); i++){
        var _t1 = (times-2 + Math.random()) * 100 - 50, 
            _t2 = _t1 + random(0, 100),
            _t3 = _t2 + random(0, 100),
            _l1 = (Math.random()*100),
            _l2 = _l1 + (i%2 ? +1 : -1) * Math.random() * 5,
            _l3 = _l2 + (i%2 ? -1 : +1) * Math.random() * 5;
        fireworks += "<div class='element fireworks fireworks_" + parseInt(random(0, 5))+ "' \
                        data-" + parseInt(_t1) + "p='transform:scale(0);bottom:" + random(-500, -400) + "px;left:" + _l1 + "%;opacity:0;' \
                        data-" + parseInt(_t2) + "p='transform:scale(.25);bottom:" + random(-10, 30) + "px;left:" + _l2 + "%;opacity:1;' \
                        data-" + parseInt(_t3) + "p='transform:scale(.15);bottom:" + random(-50, 30) + "px;left:" + _l3 + "%;opacity:0;' \
                      ></div>";
    }
    $("body")
        .attr("data-0", "background-position:" + background_position_start + ";background-size:" + background_size_start)
        .attr("data-" + last, "background-position:" + background_position_end + ";background-size:" + background_size_end)
        .css({"background-image": background_images})
        .find("#background")
            .append(fireworks)
            .attr("data-0", "background-position: 0% 100%, 0% 150%, 0% 100%, 0% 100%, 0% 100%")
            .attr("data-" + last, "background-position: -90% 100%, 0% 100%, -100% 100%, -140% 100%, -120% 100%")
            .find("#plane")
                .attr("data-100p", "left:-90px; top: " + plane_start + "px; transform:rotate(" + deg + "deg) scale(" + random(.75, 1) + ")")
                .attr("data-300p", "left:" + (window_width + 90) + "px; top: " + plane_end + "px; transform:rotate(" + deg + "deg) scale(" + random(.15, .5) + ")")
                .end()
            .find("#sun")
                .attr("data-0p", "right:0px; top: " + (window_height-400) + "px; transform:scale(" + (window_width / 1435) + ")")
                .attr("data-150p", "right:0px; top: 0px; transform:scale(" + (window_width / 1435) + ")")
                .attr("data-350p", "right:-200px; top: -200px; transform:scale(" + random(.1, .25) + ")")
                .end()
            .find("#layer")
                .attr("data-400p", "left:-" + max + "px; top:-" + max + "px;width:" + (max*2) + "px;height:" + (max*2) + "px;box-shadow: 0 0 0 5000px rgba(0,0,0,0);")
                .attr("data-" + last, "left:0px; top:0px; width: 0px; height: 0px;box-shadow: 0 0 0 5000px rgba(0,0,0,1);")
                .end()
            .end();
    */
    if(_skrollr) _skrollr.refresh();
    else _skrollr = skrollr.init();
}