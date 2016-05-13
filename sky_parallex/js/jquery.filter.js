(function($) {
    var settings = {
        type: "negative",
        target: "img",
        animate: {
            active: false,
            time: 5000,
            lapse: 75,
            range: 10,
            linear: false
        }
    };
    $.fn.filter = function(options) {
        settings = $.extend(settings, options);
        
        var element = this.find(settings.target)[0];
        
        this.find(settings.target).show();
        
        if(!settings.animate.active){
            var data = filterImage(settings.type, element);
            replace_element(this, data, element);
        }
        else{
            var i = 0,
                _this = this,
                animate = function(){
                    setTimeout(function(){
                        var _d = 1/((parseInt(i/settings.animate.range)%2?settings.animate.range-i%settings.animate.range:i%settings.animate.range) + 1),
                            data = filterImage(settings.type, element, _d);
                            
                        replace_element(_this, data, element);
                        
                        if(i++ <= settings.animate.time/settings.animate.lapse){
                            animate();
                        }
                    }, settings.animate.lapse);
                };
            
            animate();
        }
        return this;
    };
    replace_element = function($element, new_data, target){
        var id = "jqf_" + (new Date()).getTime(),
            width = target.width,
            height = target.height,
            ctx = $element
                    .find(settings.target).hide().end()
                    .find("canvas")
                        .remove().end()
                    .append("<canvas id='" + id + "' width='" + width + "' height='" + height + "'></canvas>")
                    .find("canvas")[0]
                        .getContext('2d');
        ctx.putImageData(new_data, 0, 0);
    };
    getPixels = function(img) {
        var c = this.getCanvas(img.width, img.height);
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, c.width, c.height);
    };
    getCanvas = function(w, h) {
        var c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        return c;
    };
    filterImage = function(filter, image, var_args) {
        var args = [this.getPixels(image)];
        
        for (var i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        return eval(filter).apply(null, args);
    };
    createImageData = function(w, h) {
        var tmpCanvas = document.createElement('canvas'),
            tmpCtx = tmpCanvas.getContext('2d');
        return tmpCtx.createImageData(w, h);
    };
    
    //filters
    grayscale = function(pixels, args) {
        var d = pixels.data,
            base = [0.2126, 0.7152, 0.0722], 
            _d = 1;
        
        if(args) _d = args;
        
        for (var i = 0; i < d.length; i += 4) {
            var r = d[i],
                g = d[i + 1],
                b = d[i + 2],
                v = (base[0] * r * _d) + (base[1] * g * _d) + (base[2] * b * _d);
        
            d[i] = d[i + 1] = d[i + 2] = v;
        }
        return pixels;
    };
    brightness = function(pixels, adjustment) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] += adjustment;
            d[i + 1] += adjustment;
            d[i + 2] += adjustment;
        }
        return pixels;
    };
    negative = function(pixels) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] = 255 - d[i];
            d[i + 1] = 255 - d[i + 1];
            d[i + 2] = 255 - d[i + 2];
        }
        return pixels;
    };
    threshold = function(pixels, threshold) {
        var d = pixels.data,
            base = [0.2126, 0.7152, 0.0722];
    
        for (var i = 0; i < d.length; i += 4) {
            var r = d[i],
                g = d[i + 1],
                b = d[i + 2],
                v = ((base[0] * r) + (base[1] * g) + (base[2] * b) >= threshold) ? 255 : 0;
        
            d[i] = d[i + 1] = d[i + 2] = v;
        }
        return pixels;
    };
    convolute = function(pixels, weights, opaque) {
        var side = Math.round(Math.sqrt(weights.length)),
            halfSide = Math.floor(side / 2),
            src = pixels.data,
            sw = pixels.width,
            sh = pixels.height,
            w = sw,
            h = sh,
            output = createImageData(w, h),
            dst = output.data,
            alphaFac = opaque ? 1 : 0;
        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                var sy = y,
                    sx = x,
                    dstOff = (y * w + x) * 4;
                
                var r = 0, g = 0, b = 0, a = 0;
                for (var cy = 0; cy < side; cy++) {
                    for (var cx = 0; cx < side; cx++) {
                        var scy = sy + cy - halfSide,
                            scx = sx + cx - halfSide;
                        if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                            var srcOff = (scy * sw + scx) * 4,
                                wt = weights[cy * side + cx];
                            r += src[srcOff] * wt;
                            g += src[srcOff + 1] * wt;
                            b += src[srcOff + 2] * wt;
                            a += src[srcOff + 3] * wt;
                        }
                    }
                }
                dst[dstOff] = r;
                dst[dstOff + 1] = g;
                dst[dstOff + 2] = b;
                dst[dstOff + 3] = a + alphaFac * (255 - a);
            }
        }
        return output;
    };
}(jQuery));