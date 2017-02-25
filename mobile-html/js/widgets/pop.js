import '../../css/pop.scss';
import T from '../common/global.js';
const body = $('body');
module.exports = class Pop{
	constructor( obj ){
		var self = this;
		this.config = {
			title : '',
			content : null,
			okBtn : true,
			okCls : '',
			nextBtn : false,
			cancelBtn : true,
			cancelCls : '',
			width : null,
			okTxt:'确定',
			nextTxt:'下一步',
			cancelTxt : '取消',
			history : true, //是否使用历史记录
			okCallback : function(){self.close();},
			nextCallback : function(){self.close();},
			cancelCallback : function(){ self.close();},
			close : true,
			closeCallback : function(){},
			windowClose : true ,
			superClass : '',
			class : '' ,
			time : .5,
			mask : false,
			maskTiming : 'mask',
			timing : 'rotate3d',  // rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
			timingTime : 0,
			openDone : function(){} //加载完成
		};
		$.extend( this.config , obj);
		this.init();
	}
	init( ){
		var timing = this.config.timing;
		if(timing=='rotate3d'||timing=='slideOutUp'||timing=='fadeIn'||timing=='slideOutDown'){
			this.config.timingTime = 50;
		}
		if(this.config.mask == true ){
			this.config.timing = '';
		}else{
			this.config.maskTiming = '';
		}
		var ele = $("<div class='pop "+this.config.maskTiming+"'>"
				+"<div class='pop-cnt "+this.config.timing+"'>"
					+"<div class='close'><div class='v-line'></div><div class='h-line'></div></div>"
					+"<div class='title'></div>"
					+"<div class='content'></div>"
					+"<div class='error'></div>"
					+"<div class='submit'><div class='btn okbtn'></div><div class='btn next'></div><div class='btn unbind'></div></div>"
				+"</div>"
			+"</div>");

		this.element = {
			 elem : ele
			,title : ele.find('.title')
			,close : ele.find('.close')
			,bg : ele.find('.pop-cnt')
			,content : ele.find('.content')
			,submit : ele.find('.submit')
			,okbtn : ele.find('.okbtn')
			,nextbtn : ele.find('.next')
			,cancelbtn : ele.find('.unbind')
			,error : ele.find('.error')
		};
		this.updateElement();
	}
	updateElement(){
		var elem = this.element , 
			config = this.config,
			time = config.time+'s';
		elem.okbtn.addClass(config.okCls).html(config.okTxt);
		elem.nextbtn.html(config.nextTxt);
		elem.cancelbtn.addClass(config.cancelCls).html(config.cancelTxt);

		if(config.mask==true){
			this.add("<div class='loading'></div>")
		}

		elem.title.html(config.title);
		if(config.content) this.add(function(){ return config.content });

		elem.elem.addClass(config.superClass)
		elem.bg.addClass(config.class);
		elem.bg.css({'transition-duration':time,'animation-duration':time})
		elem.bg.css({'-webkit-transition-duration':time,'-webkit-animation-duration':time})
		


		if(config.width){
			elem.bg.css({width:config.width});
		}
		if(config.title.length<2){
			elem.title.remove();
		}
		if(config.okBtn==false){
			elem.okbtn.remove();
		}
		if(config.nextBtn==false){
			elem.nextbtn.remove();
		}
		if(config.cancelBtn==false){
			elem.cancelbtn.remove();
		}
		if(config.okBtn==false && config.cancelBtn == false ){
			elem.submit.remove();
		}
		if(config.close == false){
			elem.close.remove();
		}
	}
	add( fn ){
		var ele = this.element , 
			self = this;
		if(!ele.elem.parent().length){
			body.append(ele.elem);
			ele.elem.addClass('cur')
			this.addContent(fn);
			setTimeout(()=>{
				ele.bg.addClass('cur');
			},self.config.timingTime);
			T.body.css({overflowY:'hidden'});
			this.updateEvent();
			self.history();
			setTimeout(self.config.openDone,self.config.time+20)
		}else{
			ele.closeElement(self.add);
		}
		return ele.content;
	}
	addContent( fn ){
		var ele = this.element.content;
		if( fn && typeof fn=='function' ){
			ele.html(fn.call(ele));
		}else{
			ele.html(fn);
		}
	}
	history(){
		var self = this;
		if(self.config.history){
			history.pushState({status:'mask'},'');
			if(!window.maskSelf){
				window.maskSelf = [];
			}
			maskSelf.push(self);
			window.onpopstate = function(e){
				if(maskSelf.length){
					maskSelf[maskSelf.length-1].back();
					maskSelf.pop();
				}
			}
		}
	}
	unbind( btn , callback , txt , time ){
		var self = this , text = btn.text();
		txt = txt || text;
		time = time || 3;
		function bind(){
			btn.removeClass('unbind').text(text);
			self.unbind( btn , callback , txt , time );
		}
		btn.unbind().click(function(){
			btn.unbind().addClass('unbind').text(txt);
			callback();
			setTimeout(bind,time*1000)
		})
	}
	updateEvent(){
		var self = this ,
			elem = this.element , 
			config = this.config;

		elem.close.click((event)=>{
			self.close();
			event.stopPropagation();
		});
		elem.elem.click((e)=>{
			e.stopPropagation();
			if(config.windowClose){
				self.close();
			}
		});
		elem.bg.click((e)=>e.stopPropagation());

		if(config.okBtn==true){
			//self.unbind(elem.okbtn,config.okCallback)
			elem.okbtn.click(()=>{
				config.okCallback.call(self);
			});
		}
		if(config.nextBtn==true){
			//self.unbind(elem.nextbtn,config.nextCallback);
			elem.nextbtn.click(()=>{
				config.nextCallback.call(self);
			});
		}
		if(config.cancelBtn==true){
			elem.cancelbtn.click(()=>{
				config.cancelCallback.call(self);
			})
		}
	}
	error( txt , h ){
		var self = this,
			error = this.element.error , 
			bg = this.element.bg,
			time = this.config.time;

		bg.addClass('errorcur');
		error.html(txt).addClass('cur');
		setTimeout(function(){
			bg.removeClass('errorcur');
			bg.css({'animation-duration':'0s'})
			bg.css({'-webkit-animation-duration':'0s'});
			setTimeout(function(){
				bg.css({'animation-duration':time+'s'})
				bg.css({'-webkit-animation-duration':time+'s'});
			}, (time*1000+10));
		},time*1000+10);
	}
	hideError(){
		this.element.error.html('').removeClass('cur succee');
		this.element.bg.removeClass('errorcur');
	}
	succee(obj){
		var t = obj.time || .1;
		var self = this,
			error = this.element.error , 
			time = this.config.time;

		error.html(obj.txt).addClass('cur succee');
		setTimeout(function(){
			self.hideError();
			obj.callback && obj.callback();
		},time*1000+t*1000);
	}
	close(){
		if(this.config.history){
			history.back();
		}else{
			this.back();
		}
		this.config.closeCallback();
	}
	back( fn ){
		var ele = this.element;
		ele.elem.removeClass('cur');
		ele.bg.removeClass('cur');
		setTimeout(()=>{
			ele.elem.remove();
			if( fn && $.type(fn)=='function' && fn() );
			T.body.css({overflowY:'auto'});
		},510);
	}
}