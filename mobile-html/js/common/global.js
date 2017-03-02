//import '../../css/htmlLoadding.scss';
var T = {
    body : $('body'),
    loadding : function( b ){
        if(!T.loadHtml){
            T.loadHtml = $('<div class="load-mask"><div class="loadding"></div></div>')
        }
        if(b){
            T.loadHtml.appendTo($('body'));
        }else{
            T.loadHtml.remove();
        }
        
    },
    getParams( name ){
        var reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i");
        var r = encodeURI(window.location.search||window.location.href).substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    pop : function( val , cls  , time , callback ){
        cls = cls||'';
        time = time || 3;
        if(!T.popHtml){
            T.popHtml = $("<div class='pop-tip'></div>").appendTo($('body'))
        }
        T.popHtml.removeClass('error');
        T.popHtml.addClass(cls);
        setTimeout(function(){
            var height = parseInt($(window).height()/2);
            T.popHtml.html(val);
            T.popHtml.css({opacity:1});
            T.popHtml.css({'transform':'translateY('+height+'px)'})
            T.popHtml.css({'-webkit-transform':'translateY('+height+'px)'})
            setTimeout(function(){
                T.popHtml.css({opacity:0});
                T.popHtml.css({'transform':'translateY(0)'})
                T.popHtml.css({'-webkit-transform':'translateY(0)'});
                callback && setTimeout(callback,50)
            },time*1000)
        },50)
    },
    ajax : function( obj ){
        obj.type = obj.type || 'get';
        obj.dataType = obj.dataType || 'json';
        T.loadding(true);
        $.ajax({
            url : obj.url , 
            type : obj.type,
            dataType : obj.dataType,
            data : obj.data,
            success : function( _data ){
                T.loadding();
                if(_data.code == 0 ){
                    obj.success(_data);
                }else{
                    if(obj.alert==false){
                        obj.success(_data);
                        return;
                    };
                    if(_data.code == -110 ){//未登录
                        router.push('/login')
                        return;
                    }
                    require.ensure([], function(require) {
                        var Pop = require('../widgets/pop.js');
                        var pop = new Pop({
                            title: '提示',
                            content: _data.message,
                            width: '70%',
                            cancelBtn: false,
                            okTxt: '确定',
                            timing: 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                        });
                    });
                }
            },
            error : function(){}
        })
    }
    ,init : function( obj ){
        obj.loadding = obj.loadding || {
            timing : 'spinner-loader', //加载 spinner , spinner-loader , loadingbar , lightLoader , square ,circles,circles1,circles2,circles3,circles4,line' 
            fillColor : 'rgba(150,213,0,1)',
            imgs : [],
            callback:function(){}
        }
        $.extend( T , obj )
        T.setImgSize();
        T.mobile();
        T.load();
        T.getAppInfo();
        window.onresize = T.setImgSize;
    }
    ,requestAnimationFrame : window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame || 
        window.oRequestAnimationFrame ||
        window.setImmediate ||
        window.msSetIntermediate || 
        function(callback){setInterval(callback,1000/60)
    }
    ,mobile : function(){
        var ua = navigator.userAgent,
            uaLower = ua.toLowerCase(),
            IS_IPAD = ua.match(/iPad/i) != null,
            IS_IPHONE = !IS_IPAD && ((ua.match(/iPhone/i) != null) || (ua.match(/iPod/i) != null)),
            IS_IOS = IS_IPAD || IS_IPHONE,
            IS_ANDROID = !IS_IOS && ua.match(/android/i) != null,
            IS_MOBILE = IS_IOS || IS_ANDROID ;
            
        T.Iphone = IS_IOS;
        T.Android = IS_ANDROID;
        T.Mobile = IS_MOBILE
        
        function is_weixin() {
            var ua = uaLower;
            if (ua.match(/micromessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        }
        function is_weixin_ios() {
            var ua = uaLower;
            if (ua.match(/micromessenger/i) == "micromessenger" && T.Iphone )
            { return true; } else { return false; }
        };
        function is_weibo() {
            var ua = uaLower;
            if (ua.match(/Weibo/i) == "weibo")
            { return true; } else { return false; }
        };
        function is_qq() {
            var ua = uaLower;
            if (ua.match(/QQ\//i) == "qq/")
            { return true; } else { return false; }
        };  
        T.weixin = is_weixin();
        T.ios_weixin = is_weixin_ios();
        T.weibo = is_weibo();
        T.qq = is_qq();
    }
    ,getEvent : function(e, def , p){
        e = e || window.event;
        if(!def){
            e.stopPropagation()
        }
        if(!p){
            e.preventDefault()
        }
        e = e.touches ? e.touches[0] : e;
        return e;
    }
    ,myAddListener : function(ele, type, fn){
        if(T.Mobile){
            var mapping = {
                mousedown   : 'touchstart',
                mouseup     : 'touchend',
                mousemove   : 'touchmove'
            };
            type = mapping[type] || type;
        }
        ele.each(function(){
            this.removeEventListener(type, fn, false);
            this.addEventListener(type, fn, false);
        });
    }
    ,getMS : function() {
        var z = new Date();
        return (z.getMinutes() * 60 + z.getSeconds()) * 1000 + z.getMilliseconds()
    }
    ,getQueryString : function( name ){
        var reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i");
        var r = encodeURI(window.location.search||window.location.href||window.location.hash).substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    ,update : function(){
        T.width = T.body.width();
        T.height = T.body.height();
    }
    ,setImgSize : function(){
        T.update();
        var  originWidth = 375
            ,ratio = T.width/originWidth;

        $('.img-size').each(function(){
            var self = $(this);
            $.each(['height','width','left','right','bottom','top' , 'paddingTop' ,'lineHeight' , 'paddingLeft' , 'paddingRight' , 'paddingBottom','marginTop', 'marginLeft' , 'marginRight' , 'marginBottom'],function( i , str ){
                var num = self.attr('data-'+str); 
                if( num ){
                    num = num*ratio/2+'px';
                    self.css(str,num)
                }
            });
        });
    }
    ,load : function( ){
        var timing = T.loadding.timing,
            fillColor = T.loadding.fillColor,
            demo = $('<div id="Loading"><div class="loadIcon"></div><div class="loadText"></div></div>') , 
            loadIcon = demo.find('.loadIcon') , 
            text = demo.find('.loadText'),
            loadDemo = '' , 
            count = 0,
            canvasDemo = null,
            timer = null,
            margin = 0,
            img = T.loadding.imgs.concat($('.load-img')),
            len = img.length;

        if(timing == 'spinner-loader'){//win8 系统
            loadDemo = "<div class='spinner-loader'></div>"
        }else if( timing =='loadingbar'){ //5个竖条
            loadDemo = '<div class="loadingbar">'
                  +'<div class="loading-bar"></div>'
                  +'<div class="loading-bar"></div>'
                  +'<div class="loading-bar"></div>'
                  +'<div class="loading-bar"></div>'
                  +'<div class="loading-bar"></div>'
                +'</div>'
        }else if(timing == 'spinner'){ //10个圆旋转
            loadDemo = "<div class='spinner'></div>"
        }else if(timing=='lightLoader'){
            loadDemo = "<canvas id='loadCavans' class='"+timing+"'></canvas>"
        }
        loadIcon.html(loadDemo);
        T.body.append(demo);
        demo.click(function(e){ e.stopPropagation();})
        if(timing=='lightLoader'){ //进度条
            require.ensure([],()=>{
                 const lightLoader = require('../widgets/loadding/lightLoader.js')
                 var c = document.getElementById('loadCavans');
                  c.width = T.width/1.5;
                  c.height = 100;
                  canvasDemo = new lightLoader(c, c.width, c.height);
                  canvasDemo.init();
            });
            text.css({marginTop:'-30px'});
        }else if( timing =='square' || timing=='circles' || timing=='circles1' || timing=='circles2' || timing=='circles3' || timing=='circles4' || timing=='line' ){ //距形 圆 圆1 圆3 圆4 线
            require.ensure([],()=>{
                const Sonic = require('../widgets/loadding/sonic.js');
                var option = {} , 
                    width = 50 , height = 50,
                    half = width/2;

                if(timing =='square'){
                    margin = -20;
                    option = {
                        width: width,
                        height: height,

                        stepsPerFrame: 2,
                        trailLength: .3,
                        pointDistance: .1,
                        padding: 10,

                        fillColor: fillColor,
                        strokeColor: fillColor,

                        setup: function() {
                            this._.lineWidth = 20;
                        },
                        path: [
                            ['line', 0, 0, 30, 0],
                            ['line', 30, 0, 30, 30],
                            ['line', 30, 30, 0, 30],
                            ['line', 0, 30, 0, 0]
                        ]
                    }
                }else if(timing =='circles'){
                    option = {
                        width: width,
                        height: height,

                        stepsPerFrame: 1,
                        trailLength: 1,
                        pointDistance: .025,

                        strokeColor: fillColor,

                        fps: 20,

                        setup: function() {
                            this._.lineWidth = 2;
                        },
                        step: function(point, index) {

                            var cx = this.padding + half,
                                cy = this.padding + half,
                                _ = this._,
                                angle = (Math.PI/180) * (point.progress * 360);

                            this._.globalAlpha = Math.max(.5, this.alpha);

                            _.beginPath();
                            _.moveTo(point.x, point.y);
                            _.lineTo(
                                (Math.cos(angle) * 25) + cx,
                                (Math.sin(angle) * 25) + cy
                            );
                            _.closePath();
                            _.stroke();

                            _.beginPath();
                            _.moveTo(
                                (Math.cos(-angle) * 25) + cx,
                                (Math.sin(-angle) * 25) + cy
                            );
                            _.lineTo(
                                (Math.cos(-angle) * 19) + cx,
                                (Math.sin(-angle) * 19) + cy
                            );
                            _.closePath();
                            _.stroke();

                        },
                        path: [
                            ['arc', half, half, 12, 0, 360]
                        ]
                    }
                }else if(timing =='circles1'){
                    option = {
                        width: width,
                        height: height,

                        stepsPerFrame: 1,
                        trailLength: 1,
                        pointDistance: .05,
                        fillColor: fillColor,
                        strokeColor: fillColor,

                        fps: 20,

                        setup: function() {
                            this._.lineWidth = 2;
                        },
                        step: function(point, index) {

                            var cx = this.padding + half,
                                cy = this.padding + half,
                                _ = this._,
                                angle = (Math.PI/180) * (point.progress * 360),
                                innerRadius = index === 1 ? 10 : 25;

                            _.beginPath();
                            _.moveTo(point.x, point.y);
                            _.lineTo(
                                (Math.cos(angle) * innerRadius) + cx,
                                (Math.sin(angle) * innerRadius) + cy
                            );
                            _.closePath();
                            _.stroke();

                        },
                        path: [
                            ['arc', half, half, 10, 0, 360]
                        ]
                    }
                }else if(timing =='circles2'){
                    option = {
                        width: width,
                        height: height,

                        stepsPerFrame: 1,
                        trailLength: 1,
                        pointDistance: .02,
                        fps: 30,

                        fillColor: fillColor,

                        step: function(point, index) {
                            
                            this._.beginPath();
                            this._.moveTo(point.x, point.y);
                            this._.arc(point.x, point.y, index * 3, 0, Math.PI*2, false);
                            this._.closePath();
                            this._.fill();

                        },

                        path: [
                            ['arc', half, half, 17, 0, 360]
                        ]
                    }
                }else if(timing =='circles3'){
                    option = {
                        width: width,
                        height: height,

                        stepsPerFrame: 3,
                        trailLength: 1,
                        pointDistance: .01,
                        fps: 30,
                        step: 'fader',
                        fillColor: fillColor,
                        strokeColor: fillColor,

                        setup: function() {
                            this._.lineWidth = 6;
                        },

                        path: [
                            ['arc', half, half, 20, 360, 0]
                        ]
                    }
                }else if(timing =='circles4'){
                    option = {
                        width: 100,
                        height: 100,

                        stepsPerFrame: 4,
                        trailLength: 1,
                        pointDistance: .01,
                        fps: 25,

                        fillColor: fillColor,

                        setup: function() {
                            this._.lineWidth = 10;
                        },

                        step: function(point, i, f) {

                            var progress = point.progress,
                                degAngle = 360 * progress,
                                angle = Math.PI/180 * degAngle,
                                angleB = Math.PI/180 * (degAngle - 180),
                                size = i*5;

                            this._.fillRect(
                                Math.cos(angle) * 25 + (50-size/2),
                                Math.sin(angle) * 15 + (50-size/2),
                                size,
                                size
                            );

                            this._.fillStyle = '#63D3FF';

                            this._.fillRect(
                                Math.cos(angleB) * 15 + (50-size/2),
                                Math.sin(angleB) * 25 + (50-size/2),
                                size,
                                size
                            );

                            if (point.progress == 1) {

                                this._.globalAlpha = f < .5 ? 1-f : f;

                                this._.fillStyle = '#EEE';

                                this._.beginPath();
                                this._.arc(50, 50, 5, 0, 360, 0);
                                this._.closePath();
                                this._.fill();

                            }
                        },
                         path: [
                            ['line', 40, 10, 60, 90]
                        ]
                    }
                }else if(timing =='line'){
                    margin = -30;
                    option = {
                        width: 100,
                        height: 50,

                        stepsPerFrame: 1,
                        trailLength: 1,
                        pointDistance: .1,
                        fps: 15,
                        padding: 10,
                        //step: 'fader',

                        fillColor: fillColor,

                        setup: function() {
                            this._.lineWidth = 20;
                        },

                        path: [
                            ['line', 0, 20, 100, 20],
                            ['line', 100, 20, 0, 20]
                        ]
                    }
                }
                canvasDemo = new Sonic(option);
                loadIcon.append(canvasDemo.canvas);
                canvasDemo.play();
                text.css({marginTop:margin+'px'});
            });
        }
        if (len) {
            T.body.css({height:T.height+'px'});
            img.map(function( div ){
                var  oImage = new Image()
                    ,src = '';

                if(typeof div == 'string'){
                    src = div;
                }else{
                    src = $(div).attr('src');
                }
                oImage.src = src;
                text.html('Loading&nbsp;0%');
                oImage.onload = function () {
                    count++;
                    if(timing=='lightLoader'){ //进度条
                        canvasDemo.progress = Math.round(count / len * 100);
                    }
                    text.html('Loading&nbsp;' + Math.round(count / len * 100) + '%');
                    if (count == len) {
                        canvasDemo && canvasDemo.stop();
                        
                        demo.remove();
                        $('.remove-hide').remove();
                        T.body.css({ 'height': '100%', 'overflowY': 'auto' });
                        T.loadding.callback();
                   }
               }
               oImage.onerror = function(){
                    console.log('错误的地址：'+src);
               }
            });
        } else {
            T.loadding.callback();
            demo.remove();
            $('.remove-hide').remove();
        }
    }
}
export default T;