webpackJsonp([10],{42:function(t,i,s){"use strict";!function(){function i(t){this.converter=t.converter,this.data=t.path||t.data,this.imageData=[],this.multiplier=t.multiplier||1,this.padding=t.padding||0,this.fps=t.fps||25,this.stepsPerFrame=~~t.stepsPerFrame||1,this.trailLength=t.trailLength||1,this.pointDistance=t.pointDistance||.05,this.domClass=t.domClass||"sonic",this.backgroundColor=t.backgroundColor||"rgba(0,0,0,0)",this.fillColor=t.fillColor,this.strokeColor=t.strokeColor,this.stepMethod="string"==typeof t.step?l[t.step]:t.step||l.square,this._setup=t.setup||s,this._teardown=t.teardown||s,this._preStep=t.preStep||s,this.pixelRatio=t.pixelRatio||null,this.width=t.width,this.height=t.height,this.fullWidth=this.width+2*this.padding,this.fullHeight=this.height+2*this.padding,this.domClass=t.domClass||"sonic",this.setup()}var s=function(){},e=i.argTypes={DIM:1,DEGREE:2,RADIUS:3,OTHER:0},h=i.argSignatures={arc:[1,1,3,2,2,0],bezier:[1,1,1,1,1,1,1,1],line:[1,1,1,1]},a=i.pathMethods={bezier:function(t,i,s,e,h,a,l,r,o){t=1-t;var n=1-t,p=t*t,c=n*n,u=p*t,f=3*p*n,d=3*t*c,g=c*n;return[u*i+f*a+d*r+g*e,u*s+f*l+d*o+g*h]},arc:function(t,i,s,e,h,a){var l=(a-h)*t+h,r=[Math.cos(l)*e+i,Math.sin(l)*e+s];return r.angle=l,r.t=t,r},line:function(t,i,s,e,h){return[(e-i)*t+i,(h-s)*t+s]}},l=i.stepMethods={square:function(t,i,s,e,h){this._.fillRect(t.x-3,t.y-3,6,6)},fader:function(t,i,s,e,h){this._.beginPath(),this._last&&this._.moveTo(this._last.x,this._last.y),this._.lineTo(t.x,t.y),this._.closePath(),this._.stroke(),this._last=t}};i.prototype={calculatePixelRatio:function(){var t=window.devicePixelRatio||1,i=this._.webkitBackingStorePixelRatio||this._.mozBackingStorePixelRatio||this._.msBackingStorePixelRatio||this._.oBackingStorePixelRatio||this._.backingStorePixelRatio||1;return t/i},setup:function(){var t,i,s,l,r=this.data;this.canvas=document.createElement("canvas"),this._=this.canvas.getContext("2d"),null==this.pixelRatio&&(this.pixelRatio=this.calculatePixelRatio()),this.canvas.className=this.domClass,1!=this.pixelRatio?(this.canvas.style.height=this.fullHeight+"px",this.canvas.style.width=this.fullWidth+"px",this.fullHeight*=this.pixelRatio,this.fullWidth*=this.pixelRatio,this.canvas.height=this.fullHeight,this.canvas.width=this.fullWidth,this._.scale(this.pixelRatio,this.pixelRatio)):(this.canvas.height=this.fullHeight,this.canvas.width=this.fullWidth),this.points=[];for(var o=-1,n=r.length;++o<n;){if(t=r[o].slice(1),s=r[o][0],s in h)for(var p=-1,c=t.length;++p<c;){switch(i=h[s][p],l=t[p],i){case e.RADIUS:l*=this.multiplier;break;case e.DIM:l*=this.multiplier,l+=this.padding;break;case e.DEGREE:l*=Math.PI/180}t[p]=l}t.unshift(0);for(var u,f=this.pointDistance,d=f;d<=1;d+=f)d=Math.round(1*d/f)/(1/f),t[0]=d,u=a[s].apply(null,t),this.points.push({x:u[0],y:u[1],progress:d})}this.frame=0,this.converter&&this.converter.setup&&this.converter.setup(this)},prep:function(t){if(!(t in this.imageData)){this._.clearRect(0,0,this.fullWidth,this.fullHeight),this._.fillStyle=this.backgroundColor,this._.fillRect(0,0,this.fullWidth,this.fullHeight);var i,s,e,h,a=this.points,l=a.length;this.pointDistance;this._setup();for(var r=-1,o=l*this.trailLength;++r<o&&!this.stopped;)s=t+r,i=a[s]||a[s-l],i&&(this.alpha=Math.round(1e3*(r/(o-1)))/1e3,this._.globalAlpha=this.alpha,this.fillColor&&(this._.fillStyle=this.fillColor),this.strokeColor&&(this._.strokeStyle=this.strokeColor),e=t/(this.points.length-1),h=r/(o-1),this._preStep(i,h,e),this.stepMethod(i,h,e));return this._teardown(),this.imageData[t]=this._.getImageData(0,0,this.fullWidth,this.fullWidth),!0}},draw:function(){this.prep(this.frame)||(this._.clearRect(0,0,this.fullWidth,this.fullWidth),this._.putImageData(this.imageData[this.frame],0,0)),this.converter&&this.converter.step&&this.converter.step(this),this.iterateFrame()||this.converter&&this.converter.teardown&&(this.converter.teardown(this),this.converter=null)},iterateFrame:function(){return this.frame+=this.stepsPerFrame,!(this.frame>=this.points.length)||(this.frame=0,!1)},play:function(){this.stopped=!1;var t=this;this.timer=setInterval(function(){t.draw()},1e3/this.fps)},stop:function(){this.stopped=!0,this.timer&&clearInterval(this.timer)}},t.exports=i}()}});