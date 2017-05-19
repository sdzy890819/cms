/*!
 * ngImgCrop v0.3.2
 * https://github.com/alexk111/ngImgCrop
 *
 * Copyright (c) 2014 Alex Kaul
 * License: MIT
 *
 * Generated at Wednesday, December 3rd, 2014, 3:54:12 PM
 */
!function(){"use strict";var crop=angular.module("ngImgCrop",[]);crop.factory("cropAreaCircle",["cropArea",function(CropArea){var CropAreaCircle=function(){CropArea.apply(this,arguments),this._boxResizeBaseSize=20,this._boxResizeNormalRatio=.9,this._boxResizeHoverRatio=1.2,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._boxResizeNormalSize=this._boxResizeBaseSize*this._boxResizeNormalRatio,this._boxResizeHoverSize=this._boxResizeBaseSize*this._boxResizeHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize=0,this._boxResizeIsHover=!1,this._areaIsHover=!1,this._boxResizeIsDragging=!1,this._areaIsDragging=!1};return CropAreaCircle.prototype=new CropArea,CropAreaCircle.prototype._calcCirclePerimeterCoords=function(angleDegrees){var hSize=this._size/2,angleRadians=angleDegrees*(Math.PI/180);return[this._x+hSize*Math.cos(angleRadians),this._y+hSize*Math.sin(angleRadians)]},CropAreaCircle.prototype._calcResizeIconCenterCoords=function(){return this._calcCirclePerimeterCoords(-45)},CropAreaCircle.prototype._isCoordWithinArea=function(coord){return Math.sqrt((coord[0]-this._x)*(coord[0]-this._x)+(coord[1]-this._y)*(coord[1]-this._y))<this._size/2},CropAreaCircle.prototype._isCoordWithinBoxResize=function(coord){var resizeIconCenterCoords=this._calcResizeIconCenterCoords(),hSize=this._boxResizeHoverSize/2;return coord[0]>resizeIconCenterCoords[0]-hSize&&coord[0]<resizeIconCenterCoords[0]+hSize&&coord[1]>resizeIconCenterCoords[1]-hSize&&coord[1]<resizeIconCenterCoords[1]+hSize},CropAreaCircle.prototype._drawArea=function(ctx,centerCoords,size){ctx.arc(centerCoords[0],centerCoords[1],size/2,0,2*Math.PI)},CropAreaCircle.prototype.draw=function(){CropArea.prototype.draw.apply(this,arguments),this._cropCanvas.drawIconMove([this._x,this._y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio),this._cropCanvas.drawIconResizeBoxNESW(this._calcResizeIconCenterCoords(),this._boxResizeBaseSize,this._boxResizeIsHover?this._boxResizeHoverRatio:this._boxResizeNormalRatio)},CropAreaCircle.prototype.processMouseMove=function(mouseCurX,mouseCurY){var cursor="default",res=!1;if(this._boxResizeIsHover=!1,this._areaIsHover=!1,this._areaIsDragging)this._x=mouseCurX-this._posDragStartX,this._y=mouseCurY-this._posDragStartY,this._areaIsHover=!0,cursor="move",res=!0,this._events.trigger("area-move");else if(this._boxResizeIsDragging){cursor="nesw-resize";var iFR,iFX,iFY;iFX=mouseCurX-this._posResizeStartX,iFY=this._posResizeStartY-mouseCurY,iFR=iFX>iFY?this._posResizeStartSize+2*iFY:this._posResizeStartSize+2*iFX,this._size=Math.max(this._minSize,iFR),this._boxResizeIsHover=!0,res=!0,this._events.trigger("area-resize")}else this._isCoordWithinBoxResize([mouseCurX,mouseCurY])?(cursor="nesw-resize",this._areaIsHover=!1,this._boxResizeIsHover=!0,res=!0):this._isCoordWithinArea([mouseCurX,mouseCurY])&&(cursor="move",this._areaIsHover=!0,res=!0);return this._dontDragOutside(),angular.element(this._ctx.canvas).css({cursor:cursor}),res},CropAreaCircle.prototype.processMouseDown=function(mouseDownX,mouseDownY){this._isCoordWithinBoxResize([mouseDownX,mouseDownY])?(this._areaIsDragging=!1,this._areaIsHover=!1,this._boxResizeIsDragging=!0,this._boxResizeIsHover=!0,this._posResizeStartX=mouseDownX,this._posResizeStartY=mouseDownY,this._posResizeStartSize=this._size,this._events.trigger("area-resize-start")):this._isCoordWithinArea([mouseDownX,mouseDownY])&&(this._areaIsDragging=!0,this._areaIsHover=!0,this._boxResizeIsDragging=!1,this._boxResizeIsHover=!1,this._posDragStartX=mouseDownX-this._x,this._posDragStartY=mouseDownY-this._y,this._events.trigger("area-move-start"))},CropAreaCircle.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._boxResizeIsDragging&&(this._boxResizeIsDragging=!1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._boxResizeIsHover=!1,this._posDragStartX=0,this._posDragStartY=0},CropAreaCircle}]),crop.factory("cropAreaSquare",["cropArea",function(CropArea){var CropAreaSquare=function(){CropArea.apply(this,arguments),this._resizeCtrlBaseRadius=10,this._resizeCtrlNormalRatio=.75,this._resizeCtrlHoverRatio=1,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._resizeCtrlNormalRadius=this._resizeCtrlBaseRadius*this._resizeCtrlNormalRatio,this._resizeCtrlHoverRadius=this._resizeCtrlBaseRadius*this._resizeCtrlHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize=0,this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._resizeCtrlIsDragging=-1,this._areaIsDragging=!1};return CropAreaSquare.prototype=new CropArea,CropAreaSquare.prototype._calcSquareCorners=function(){var hSize=this._size/2;return[[this._x-hSize,this._y-hSize],[this._x+hSize,this._y-hSize],[this._x-hSize,this._y+hSize],[this._x+hSize,this._y+hSize]]},CropAreaSquare.prototype._calcSquareDimensions=function(){var hSize=this._size/2;return{left:this._x-hSize,top:this._y-hSize,right:this._x+hSize,bottom:this._y+hSize}},CropAreaSquare.prototype._isCoordWithinArea=function(coord){var squareDimensions=this._calcSquareDimensions();return coord[0]>=squareDimensions.left&&coord[0]<=squareDimensions.right&&coord[1]>=squareDimensions.top&&coord[1]<=squareDimensions.bottom},CropAreaSquare.prototype._isCoordWithinResizeCtrl=function(coord){for(var resizeIconsCenterCoords=this._calcSquareCorners(),res=-1,i=0,len=resizeIconsCenterCoords.length;i<len;i++){var resizeIconCenterCoords=resizeIconsCenterCoords[i];if(coord[0]>resizeIconCenterCoords[0]-this._resizeCtrlHoverRadius&&coord[0]<resizeIconCenterCoords[0]+this._resizeCtrlHoverRadius&&coord[1]>resizeIconCenterCoords[1]-this._resizeCtrlHoverRadius&&coord[1]<resizeIconCenterCoords[1]+this._resizeCtrlHoverRadius){res=i;break}}return res},CropAreaSquare.prototype._drawArea=function(ctx,centerCoords,size){var hSize=size/2;ctx.rect(centerCoords[0]-hSize,centerCoords[1]-hSize,size,size)},CropAreaSquare.prototype.draw=function(){CropArea.prototype.draw.apply(this,arguments),this._cropCanvas.drawIconMove([this._x,this._y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio);for(var resizeIconsCenterCoords=this._calcSquareCorners(),i=0,len=resizeIconsCenterCoords.length;i<len;i++){var resizeIconCenterCoords=resizeIconsCenterCoords[i];this._cropCanvas.drawIconResizeCircle(resizeIconCenterCoords,this._resizeCtrlBaseRadius,this._resizeCtrlIsHover===i?this._resizeCtrlHoverRatio:this._resizeCtrlNormalRatio)}},CropAreaSquare.prototype.processMouseMove=function(mouseCurX,mouseCurY){var cursor="default",res=!1;if(this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._areaIsDragging)this._x=mouseCurX-this._posDragStartX,this._y=mouseCurY-this._posDragStartY,this._areaIsHover=!0,cursor="move",res=!0,this._events.trigger("area-move");else if(this._resizeCtrlIsDragging>-1){var xMulti,yMulti;switch(this._resizeCtrlIsDragging){case 0:xMulti=-1,yMulti=-1,cursor="nwse-resize";break;case 1:xMulti=1,yMulti=-1,cursor="nesw-resize";break;case 2:xMulti=-1,yMulti=1,cursor="nesw-resize";break;case 3:xMulti=1,yMulti=1,cursor="nwse-resize"}var iFR,iFX=(mouseCurX-this._posResizeStartX)*xMulti,iFY=(mouseCurY-this._posResizeStartY)*yMulti;iFR=iFX>iFY?this._posResizeStartSize+iFY:this._posResizeStartSize+iFX;var wasSize=this._size;this._size=Math.max(this._minSize,iFR);var posModifier=(this._size-wasSize)/2;this._x+=posModifier*xMulti,this._y+=posModifier*yMulti,this._resizeCtrlIsHover=this._resizeCtrlIsDragging,res=!0,this._events.trigger("area-resize")}else{var hoveredResizeBox=this._isCoordWithinResizeCtrl([mouseCurX,mouseCurY]);if(hoveredResizeBox>-1){switch(hoveredResizeBox){case 0:cursor="nwse-resize";break;case 1:case 2:cursor="nesw-resize";break;case 3:cursor="nwse-resize"}this._areaIsHover=!1,this._resizeCtrlIsHover=hoveredResizeBox,res=!0}else this._isCoordWithinArea([mouseCurX,mouseCurY])&&(cursor="move",this._areaIsHover=!0,res=!0)}return this._dontDragOutside(),angular.element(this._ctx.canvas).css({cursor:cursor}),res},CropAreaSquare.prototype.processMouseDown=function(mouseDownX,mouseDownY){var isWithinResizeCtrl=this._isCoordWithinResizeCtrl([mouseDownX,mouseDownY]);isWithinResizeCtrl>-1?(this._areaIsDragging=!1,this._areaIsHover=!1,this._resizeCtrlIsDragging=isWithinResizeCtrl,this._resizeCtrlIsHover=isWithinResizeCtrl,this._posResizeStartX=mouseDownX,this._posResizeStartY=mouseDownY,this._posResizeStartSize=this._size,this._events.trigger("area-resize-start")):this._isCoordWithinArea([mouseDownX,mouseDownY])&&(this._areaIsDragging=!0,this._areaIsHover=!0,this._resizeCtrlIsDragging=-1,this._resizeCtrlIsHover=-1,this._posDragStartX=mouseDownX-this._x,this._posDragStartY=mouseDownY-this._y,this._events.trigger("area-move-start"))},CropAreaSquare.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._resizeCtrlIsDragging>-1&&(this._resizeCtrlIsDragging=-1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._resizeCtrlIsHover=-1,this._posDragStartX=0,this._posDragStartY=0},CropAreaSquare}]),crop.factory("cropArea",["cropCanvas",function(CropCanvas){var CropArea=function(ctx,events){this._ctx=ctx,this._events=events,this._minSize=80,this._cropCanvas=new CropCanvas(ctx),this._image=new Image,this._x=0,this._y=0,this._size=200};return CropArea.prototype.getImage=function(){return this._image},CropArea.prototype.setImage=function(image){this._image=image},CropArea.prototype.getX=function(){return this._x},CropArea.prototype.setX=function(x){this._x=x,this._dontDragOutside()},CropArea.prototype.getY=function(){return this._y},CropArea.prototype.setY=function(y){this._y=y,this._dontDragOutside()},CropArea.prototype.getSize=function(){return this._size},CropArea.prototype.setSize=function(size){this._size=Math.max(this._minSize,size),this._dontDragOutside()},CropArea.prototype.getMinSize=function(){return this._minSize},CropArea.prototype.setMinSize=function(size){this._minSize=size,this._size=Math.max(this._minSize,this._size),this._dontDragOutside()},CropArea.prototype._dontDragOutside=function(){var h=this._ctx.canvas.height,w=this._ctx.canvas.width;this._size>w&&(this._size=w),this._size>h&&(this._size=h),this._x<this._size/2&&(this._x=this._size/2),this._x>w-this._size/2&&(this._x=w-this._size/2),this._y<this._size/2&&(this._y=this._size/2),this._y>h-this._size/2&&(this._y=h-this._size/2)},CropArea.prototype._drawArea=function(){},CropArea.prototype.draw=function(){this._cropCanvas.drawCropArea(this._image,[this._x,this._y],this._size,this._drawArea)},CropArea.prototype.processMouseMove=function(){},CropArea.prototype.processMouseDown=function(){},CropArea.prototype.processMouseUp=function(){},CropArea}]),crop.factory("cropCanvas",[function(){var shapeArrowNW=[[-.5,-2],[-3,-4.5],[-.5,-7],[-7,-7],[-7,-.5],[-4.5,-3],[-2,-.5]],shapeArrowNE=[[.5,-2],[3,-4.5],[.5,-7],[7,-7],[7,-.5],[4.5,-3],[2,-.5]],shapeArrowSW=[[-.5,2],[-3,4.5],[-.5,7],[-7,7],[-7,.5],[-4.5,3],[-2,.5]],shapeArrowSE=[[.5,2],[3,4.5],[.5,7],[7,7],[7,.5],[4.5,3],[2,.5]],shapeArrowN=[[-1.5,-2.5],[-1.5,-6],[-5,-6],[0,-11],[5,-6],[1.5,-6],[1.5,-2.5]],shapeArrowW=[[-2.5,-1.5],[-6,-1.5],[-6,-5],[-11,0],[-6,5],[-6,1.5],[-2.5,1.5]],shapeArrowS=[[-1.5,2.5],[-1.5,6],[-5,6],[0,11],[5,6],[1.5,6],[1.5,2.5]],shapeArrowE=[[2.5,-1.5],[6,-1.5],[6,-5],[11,0],[6,5],[6,1.5],[2.5,1.5]],colors={areaOutline:"#fff",resizeBoxStroke:"#fff",resizeBoxFill:"#444",resizeBoxArrowFill:"#fff",resizeCircleStroke:"#fff",resizeCircleFill:"#444",moveIconFill:"#fff"};return function(ctx){var calcPoint=function(point,offset,scale){return[scale*point[0]+offset[0],scale*point[1]+offset[1]]},drawFilledPolygon=function(shape,fillStyle,centerCoords,scale){ctx.save(),ctx.fillStyle=fillStyle,ctx.beginPath();var pc,pc0=calcPoint(shape[0],centerCoords,scale);ctx.moveTo(pc0[0],pc0[1]);for(var p in shape)p>0&&(pc=calcPoint(shape[p],centerCoords,scale),ctx.lineTo(pc[0],pc[1]));ctx.lineTo(pc0[0],pc0[1]),ctx.fill(),ctx.closePath(),ctx.restore()};this.drawIconMove=function(centerCoords,scale){drawFilledPolygon(shapeArrowN,colors.moveIconFill,centerCoords,scale),drawFilledPolygon(shapeArrowW,colors.moveIconFill,centerCoords,scale),drawFilledPolygon(shapeArrowS,colors.moveIconFill,centerCoords,scale),drawFilledPolygon(shapeArrowE,colors.moveIconFill,centerCoords,scale)},this.drawIconResizeCircle=function(centerCoords,circleRadius,scale){var scaledCircleRadius=circleRadius*scale;ctx.save(),ctx.strokeStyle=colors.resizeCircleStroke,ctx.lineWidth=2,ctx.fillStyle=colors.resizeCircleFill,ctx.beginPath(),ctx.arc(centerCoords[0],centerCoords[1],scaledCircleRadius,0,2*Math.PI),ctx.fill(),ctx.stroke(),ctx.closePath(),ctx.restore()},this.drawIconResizeBoxBase=function(centerCoords,boxSize,scale){var scaledBoxSize=boxSize*scale;ctx.save(),ctx.strokeStyle=colors.resizeBoxStroke,ctx.lineWidth=2,ctx.fillStyle=colors.resizeBoxFill,ctx.fillRect(centerCoords[0]-scaledBoxSize/2,centerCoords[1]-scaledBoxSize/2,scaledBoxSize,scaledBoxSize),ctx.strokeRect(centerCoords[0]-scaledBoxSize/2,centerCoords[1]-scaledBoxSize/2,scaledBoxSize,scaledBoxSize),ctx.restore()},this.drawIconResizeBoxNESW=function(centerCoords,boxSize,scale){this.drawIconResizeBoxBase(centerCoords,boxSize,scale),drawFilledPolygon(shapeArrowNE,colors.resizeBoxArrowFill,centerCoords,scale),drawFilledPolygon(shapeArrowSW,colors.resizeBoxArrowFill,centerCoords,scale)},this.drawIconResizeBoxNWSE=function(centerCoords,boxSize,scale){this.drawIconResizeBoxBase(centerCoords,boxSize,scale),drawFilledPolygon(shapeArrowNW,colors.resizeBoxArrowFill,centerCoords,scale),drawFilledPolygon(shapeArrowSE,colors.resizeBoxArrowFill,centerCoords,scale)},this.drawCropArea=function(image,centerCoords,size,fnDrawClipPath){var xRatio=image.width/ctx.canvas.width,yRatio=image.height/ctx.canvas.height,xLeft=centerCoords[0]-size/2,yTop=centerCoords[1]-size/2;ctx.save(),ctx.strokeStyle=colors.areaOutline,ctx.lineWidth=2,ctx.beginPath(),fnDrawClipPath(ctx,centerCoords,size),ctx.stroke(),ctx.clip(),size>0&&ctx.drawImage(image,xLeft*xRatio,yTop*yRatio,size*xRatio,size*yRatio,xLeft,yTop,size,size),ctx.beginPath(),fnDrawClipPath(ctx,centerCoords,size),ctx.stroke(),ctx.clip(),ctx.restore()}}}]),crop.service("cropEXIF",[function(){function imageHasData(img){return!!img.exifdata}function base64ToArrayBuffer(base64,contentType){contentType=contentType||base64.match(/^data\:([^\;]+)\;base64,/im)[1]||"",base64=base64.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var binary=atob(base64),len=binary.length,buffer=new ArrayBuffer(len),view=new Uint8Array(buffer),i=0;i<len;i++)view[i]=binary.charCodeAt(i);return buffer}function objectURLToBlob(url,callback){var http=new XMLHttpRequest;http.open("GET",url,!0),http.responseType="blob",http.onload=function(e){200!=this.status&&0!==this.status||callback(this.response)},http.send()}function getImageData(img,callback){function handleBinaryFile(binFile){var data=findEXIFinJPEG(binFile),iptcdata=findIPTCinJPEG(binFile);img.exifdata=data||{},img.iptcdata=iptcdata||{},callback&&callback.call(img)}if(img.src)if(/^data\:/i.test(img.src)){var arrayBuffer=base64ToArrayBuffer(img.src);handleBinaryFile(arrayBuffer)}else if(/^blob\:/i.test(img.src)){var fileReader=new FileReader;fileReader.onload=function(e){handleBinaryFile(e.target.result)},objectURLToBlob(img.src,function(blob){fileReader.readAsArrayBuffer(blob)})}else{var http=new XMLHttpRequest;http.onload=function(){if(200!=this.status&&0!==this.status)throw"Could not load image";handleBinaryFile(http.response),http=null},http.open("GET",img.src,!0),http.responseType="arraybuffer",http.send(null)}else if(window.FileReader&&(img instanceof window.Blob||img instanceof window.File)){var fileReader=new FileReader;fileReader.onload=function(e){debug&&console.log("Got file of length "+e.target.result.byteLength),handleBinaryFile(e.target.result)},fileReader.readAsArrayBuffer(img)}}function findEXIFinJPEG(file){var dataView=new DataView(file);if(debug&&console.log("Got file of length "+file.byteLength),255!=dataView.getUint8(0)||216!=dataView.getUint8(1))return debug&&console.log("Not a valid JPEG"),!1;for(var marker,offset=2,length=file.byteLength;offset<length;){if(255!=dataView.getUint8(offset))return debug&&console.log("Not a valid marker at offset "+offset+", found: "+dataView.getUint8(offset)),!1;if(marker=dataView.getUint8(offset+1),debug&&console.log(marker),225==marker)return debug&&console.log("Found 0xFFE1 marker"),readEXIFData(dataView,offset+4,dataView.getUint16(offset+2));offset+=2+dataView.getUint16(offset+2)}}function findIPTCinJPEG(file){var dataView=new DataView(file);if(debug&&console.log("Got file of length "+file.byteLength),255!=dataView.getUint8(0)||216!=dataView.getUint8(1))return debug&&console.log("Not a valid JPEG"),!1;for(var offset=2,length=file.byteLength;offset<length;){if(function(dataView,offset){return 56===dataView.getUint8(offset)&&66===dataView.getUint8(offset+1)&&73===dataView.getUint8(offset+2)&&77===dataView.getUint8(offset+3)&&4===dataView.getUint8(offset+4)&&4===dataView.getUint8(offset+5)}(dataView,offset)){var nameHeaderLength=dataView.getUint8(offset+7);nameHeaderLength%2!=0&&(nameHeaderLength+=1),0===nameHeaderLength&&(nameHeaderLength=4);return readIPTCData(file,offset+8+nameHeaderLength,dataView.getUint16(offset+6+nameHeaderLength))}offset++}}function readIPTCData(file,startOffset,sectionLength){for(var fieldValue,fieldName,dataSize,segmentType,dataView=new DataView(file),data={},segmentStartPos=startOffset;segmentStartPos<startOffset+sectionLength;)28===dataView.getUint8(segmentStartPos)&&2===dataView.getUint8(segmentStartPos+1)&&(segmentType=dataView.getUint8(segmentStartPos+2))in IptcFieldMap&&(dataSize=dataView.getInt16(segmentStartPos+3),dataSize+5,fieldName=IptcFieldMap[segmentType],fieldValue=getStringFromDB(dataView,segmentStartPos+5,dataSize),data.hasOwnProperty(fieldName)?data[fieldName]instanceof Array?data[fieldName].push(fieldValue):data[fieldName]=[data[fieldName],fieldValue]:data[fieldName]=fieldValue),segmentStartPos++;return data}function readTags(file,tiffStart,dirStart,strings,bigEnd){var entryOffset,tag,i,entries=file.getUint16(dirStart,!bigEnd),tags={};for(i=0;i<entries;i++)entryOffset=dirStart+12*i+2,tag=strings[file.getUint16(entryOffset,!bigEnd)],!tag&&debug&&console.log("Unknown tag: "+file.getUint16(entryOffset,!bigEnd)),tags[tag]=readTagValue(file,entryOffset,tiffStart,dirStart,bigEnd);return tags}function readTagValue(file,entryOffset,tiffStart,dirStart,bigEnd){var offset,vals,val,n,numerator,denominator,type=file.getUint16(entryOffset+2,!bigEnd),numValues=file.getUint32(entryOffset+4,!bigEnd),valueOffset=file.getUint32(entryOffset+8,!bigEnd)+tiffStart;switch(type){case 1:case 7:if(1==numValues)return file.getUint8(entryOffset+8,!bigEnd);for(offset=numValues>4?valueOffset:entryOffset+8,vals=[],n=0;n<numValues;n++)vals[n]=file.getUint8(offset+n);return vals;case 2:return offset=numValues>4?valueOffset:entryOffset+8,getStringFromDB(file,offset,numValues-1);case 3:if(1==numValues)return file.getUint16(entryOffset+8,!bigEnd);for(offset=numValues>2?valueOffset:entryOffset+8,vals=[],n=0;n<numValues;n++)vals[n]=file.getUint16(offset+2*n,!bigEnd);return vals;case 4:if(1==numValues)return file.getUint32(entryOffset+8,!bigEnd);for(vals=[],n=0;n<numValues;n++)vals[n]=file.getUint32(valueOffset+4*n,!bigEnd);return vals;case 5:if(1==numValues)return numerator=file.getUint32(valueOffset,!bigEnd),denominator=file.getUint32(valueOffset+4,!bigEnd),val=new Number(numerator/denominator),val.numerator=numerator,val.denominator=denominator,val;for(vals=[],n=0;n<numValues;n++)numerator=file.getUint32(valueOffset+8*n,!bigEnd),denominator=file.getUint32(valueOffset+4+8*n,!bigEnd),vals[n]=new Number(numerator/denominator),vals[n].numerator=numerator,vals[n].denominator=denominator;return vals;case 9:if(1==numValues)return file.getInt32(entryOffset+8,!bigEnd);for(vals=[],n=0;n<numValues;n++)vals[n]=file.getInt32(valueOffset+4*n,!bigEnd);return vals;case 10:if(1==numValues)return file.getInt32(valueOffset,!bigEnd)/file.getInt32(valueOffset+4,!bigEnd);for(vals=[],n=0;n<numValues;n++)vals[n]=file.getInt32(valueOffset+8*n,!bigEnd)/file.getInt32(valueOffset+4+8*n,!bigEnd);return vals}}function getStringFromDB(buffer,start,length){for(var outstr="",n=start;n<start+length;n++)outstr+=String.fromCharCode(buffer.getUint8(n));return outstr}function readEXIFData(file,start){if("Exif"!=getStringFromDB(file,start,4))return debug&&console.log("Not valid EXIF data! "+getStringFromDB(file,start,4)),!1;var bigEnd,tags,tag,exifData,gpsData,tiffOffset=start+6;if(18761==file.getUint16(tiffOffset))bigEnd=!1;else{if(19789!=file.getUint16(tiffOffset))return debug&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;bigEnd=!0}if(42!=file.getUint16(tiffOffset+2,!bigEnd))return debug&&console.log("Not valid TIFF data! (no 0x002A)"),!1;var firstIFDOffset=file.getUint32(tiffOffset+4,!bigEnd);if(firstIFDOffset<8)return debug&&console.log("Not valid TIFF data! (First offset less than 8)",file.getUint32(tiffOffset+4,!bigEnd)),!1;if(tags=readTags(file,tiffOffset,tiffOffset+firstIFDOffset,TiffTags,bigEnd),tags.ExifIFDPointer){exifData=readTags(file,tiffOffset,tiffOffset+tags.ExifIFDPointer,ExifTags,bigEnd);for(tag in exifData){switch(tag){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":exifData[tag]=StringValues[tag][exifData[tag]];break;case"ExifVersion":case"FlashpixVersion":exifData[tag]=String.fromCharCode(exifData[tag][0],exifData[tag][1],exifData[tag][2],exifData[tag][3]);break;case"ComponentsConfiguration":exifData[tag]=StringValues.Components[exifData[tag][0]]+StringValues.Components[exifData[tag][1]]+StringValues.Components[exifData[tag][2]]+StringValues.Components[exifData[tag][3]]}tags[tag]=exifData[tag]}}if(tags.GPSInfoIFDPointer){gpsData=readTags(file,tiffOffset,tiffOffset+tags.GPSInfoIFDPointer,GPSTags,bigEnd);for(tag in gpsData){switch(tag){case"GPSVersionID":gpsData[tag]=gpsData[tag][0]+"."+gpsData[tag][1]+"."+gpsData[tag][2]+"."+gpsData[tag][3]}tags[tag]=gpsData[tag]}}return tags}var debug=!1,ExifTags=this.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},TiffTags=this.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},GPSTags=this.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},StringValues=this.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},IptcFieldMap={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};this.getData=function(img,callback){return!((img instanceof Image||img instanceof HTMLImageElement)&&!img.complete)&&(imageHasData(img)?callback&&callback.call(img):getImageData(img,callback),!0)},this.getTag=function(img,tag){if(imageHasData(img))return img.exifdata[tag]},this.getAllTags=function(img){if(!imageHasData(img))return{};var a,data=img.exifdata,tags={};for(a in data)data.hasOwnProperty(a)&&(tags[a]=data[a]);return tags},this.pretty=function(img){if(!imageHasData(img))return"";var a,data=img.exifdata,strPretty="";for(a in data)data.hasOwnProperty(a)&&("object"==typeof data[a]?data[a]instanceof Number?strPretty+=a+" : "+data[a]+" ["+data[a].numerator+"/"+data[a].denominator+"]\r\n":strPretty+=a+" : ["+data[a].length+" values]\r\n":strPretty+=a+" : "+data[a]+"\r\n");return strPretty},this.readFromBinaryFile=function(file){return findEXIFinJPEG(file)}}]),crop.factory("cropHost",["$document","cropAreaCircle","cropAreaSquare","cropEXIF",function($document,CropAreaCircle,CropAreaSquare,cropEXIF){var getElementOffset=function(elem){var box=elem.getBoundingClientRect(),body=document.body,docElem=document.documentElement,scrollTop=window.pageYOffset||docElem.scrollTop||body.scrollTop,scrollLeft=window.pageXOffset||docElem.scrollLeft||body.scrollLeft,clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,top=box.top+scrollTop-clientTop,left=box.left+scrollLeft-clientLeft;return{top:Math.round(top),left:Math.round(left)}};return function(elCanvas,opts,events){function drawScene(){ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height),null!==image&&(ctx.drawImage(image,0,0,ctx.canvas.width,ctx.canvas.height),ctx.save(),ctx.fillStyle="rgba(0, 0, 0, 0.65)",ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height),ctx.restore(),theArea.draw())}var ctx=null,image=null,theArea=null,minCanvasDims=[100,100],maxCanvasDims=[300,300],resImgSize=200,resImgFormat="image/png",resImgQuality=null,resetCropHost=function(){if(null!==image){theArea.setImage(image);var imageDims=[image.width,image.height],imageRatio=image.width/image.height,canvasDims=imageDims;canvasDims[0]>maxCanvasDims[0]?(canvasDims[0]=maxCanvasDims[0],canvasDims[1]=canvasDims[0]/imageRatio):canvasDims[0]<minCanvasDims[0]&&(canvasDims[0]=minCanvasDims[0],canvasDims[1]=canvasDims[0]/imageRatio),canvasDims[1]>maxCanvasDims[1]?(canvasDims[1]=maxCanvasDims[1],canvasDims[0]=canvasDims[1]*imageRatio):canvasDims[1]<minCanvasDims[1]&&(canvasDims[1]=minCanvasDims[1],canvasDims[0]=canvasDims[1]*imageRatio),elCanvas.prop("width",canvasDims[0]).prop("height",canvasDims[1]).css({"margin-left":-canvasDims[0]/2+"px","margin-top":-canvasDims[1]/2+"px"}),theArea.setX(ctx.canvas.width/2),theArea.setY(ctx.canvas.height/2),theArea.setSize(Math.min(200,ctx.canvas.width/2,ctx.canvas.height/2))}else elCanvas.prop("width",0).prop("height",0).css({"margin-top":0});drawScene()},getChangedTouches=function(event){return angular.isDefined(event.changedTouches)?event.changedTouches:event.originalEvent.changedTouches},onMouseMove=function(e){if(null!==image){var pageX,pageY,offset=getElementOffset(ctx.canvas);"touchmove"===e.type?(pageX=getChangedTouches(e)[0].pageX,pageY=getChangedTouches(e)[0].pageY):(pageX=e.pageX,pageY=e.pageY),theArea.processMouseMove(pageX-offset.left,pageY-offset.top),drawScene()}},onMouseDown=function(e){if(e.preventDefault(),e.stopPropagation(),null!==image){var pageX,pageY,offset=getElementOffset(ctx.canvas);"touchstart"===e.type?(pageX=getChangedTouches(e)[0].pageX,pageY=getChangedTouches(e)[0].pageY):(pageX=e.pageX,pageY=e.pageY),theArea.processMouseDown(pageX-offset.left,pageY-offset.top),drawScene()}},onMouseUp=function(e){if(null!==image){var pageX,pageY,offset=getElementOffset(ctx.canvas);"touchend"===e.type?(pageX=getChangedTouches(e)[0].pageX,pageY=getChangedTouches(e)[0].pageY):(pageX=e.pageX,pageY=e.pageY),theArea.processMouseUp(pageX-offset.left,pageY-offset.top),
drawScene()}};this.getResultImageDataURI=function(){var temp_ctx,temp_canvas;return temp_canvas=angular.element("<canvas></canvas>")[0],temp_ctx=temp_canvas.getContext("2d"),temp_canvas.width=resImgSize,temp_canvas.height=resImgSize,null!==image&&temp_ctx.drawImage(image,(theArea.getX()-theArea.getSize()/2)*(image.width/ctx.canvas.width),(theArea.getY()-theArea.getSize()/2)*(image.height/ctx.canvas.height),theArea.getSize()*(image.width/ctx.canvas.width),theArea.getSize()*(image.height/ctx.canvas.height),0,0,resImgSize,resImgSize),null!==resImgQuality?temp_canvas.toDataURL(resImgFormat,resImgQuality):temp_canvas.toDataURL(resImgFormat)},this.setNewImageSource=function(imageSource){if(image=null,resetCropHost(),events.trigger("image-updated"),imageSource){var newImage=new Image;"http"===imageSource.substring(0,4).toLowerCase()&&(newImage.crossOrigin="anonymous"),newImage.onload=function(){events.trigger("load-done"),cropEXIF.getData(newImage,function(){var orientation=cropEXIF.getTag(newImage,"Orientation");if([3,6,8].indexOf(orientation)>-1){var canvas=document.createElement("canvas"),ctx=canvas.getContext("2d"),cw=newImage.width,ch=newImage.height,cx=0,cy=0,deg=0;switch(orientation){case 3:cx=-newImage.width,cy=-newImage.height,deg=180;break;case 6:cw=newImage.height,ch=newImage.width,cy=-newImage.height,deg=90;break;case 8:cw=newImage.height,ch=newImage.width,cx=-newImage.width,deg=270}canvas.width=cw,canvas.height=ch,ctx.rotate(deg*Math.PI/180),ctx.drawImage(newImage,cx,cy),image=new Image,image.src=canvas.toDataURL("image/png")}else image=newImage;resetCropHost(),events.trigger("image-updated")})},newImage.onerror=function(){events.trigger("load-error")},events.trigger("load-start"),newImage.src=imageSource}},this.setMaxDimensions=function(width,height){if(maxCanvasDims=[width,height],null!==image){var curWidth=ctx.canvas.width,curHeight=ctx.canvas.height,imageDims=[image.width,image.height],imageRatio=image.width/image.height,canvasDims=imageDims;canvasDims[0]>maxCanvasDims[0]?(canvasDims[0]=maxCanvasDims[0],canvasDims[1]=canvasDims[0]/imageRatio):canvasDims[0]<minCanvasDims[0]&&(canvasDims[0]=minCanvasDims[0],canvasDims[1]=canvasDims[0]/imageRatio),canvasDims[1]>maxCanvasDims[1]?(canvasDims[1]=maxCanvasDims[1],canvasDims[0]=canvasDims[1]*imageRatio):canvasDims[1]<minCanvasDims[1]&&(canvasDims[1]=minCanvasDims[1],canvasDims[0]=canvasDims[1]*imageRatio),elCanvas.prop("width",canvasDims[0]).prop("height",canvasDims[1]).css({"margin-left":-canvasDims[0]/2+"px","margin-top":-canvasDims[1]/2+"px"});var ratioNewCurWidth=ctx.canvas.width/curWidth,ratioNewCurHeight=ctx.canvas.height/curHeight,ratioMin=Math.min(ratioNewCurWidth,ratioNewCurHeight);theArea.setX(theArea.getX()*ratioNewCurWidth),theArea.setY(theArea.getY()*ratioNewCurHeight),theArea.setSize(theArea.getSize()*ratioMin)}else elCanvas.prop("width",0).prop("height",0).css({"margin-top":0});drawScene()},this.setAreaMinSize=function(size){size=parseInt(size,10),isNaN(size)||(theArea.setMinSize(size),drawScene())},this.setResultImageSize=function(size){size=parseInt(size,10),isNaN(size)||(resImgSize=size)},this.setResultImageFormat=function(format){resImgFormat=format},this.setResultImageQuality=function(quality){quality=parseFloat(quality),!isNaN(quality)&&quality>=0&&quality<=1&&(resImgQuality=quality)},this.setAreaType=function(type){var curSize=theArea.getSize(),curMinSize=theArea.getMinSize(),curX=theArea.getX(),curY=theArea.getY(),AreaClass=CropAreaCircle;"square"===type&&(AreaClass=CropAreaSquare),theArea=new AreaClass(ctx,events),theArea.setMinSize(curMinSize),theArea.setSize(curSize),theArea.setX(curX),theArea.setY(curY),null!==image&&theArea.setImage(image),drawScene()},ctx=elCanvas[0].getContext("2d"),theArea=new CropAreaCircle(ctx,events),$document.on("mousemove",onMouseMove),elCanvas.on("mousedown",onMouseDown),$document.on("mouseup",onMouseUp),$document.on("touchmove",onMouseMove),elCanvas.on("touchstart",onMouseDown),$document.on("touchend",onMouseUp),this.destroy=function(){$document.off("mousemove",onMouseMove),elCanvas.off("mousedown",onMouseDown),$document.off("mouseup",onMouseMove),$document.off("touchmove",onMouseMove),elCanvas.off("touchstart",onMouseDown),$document.off("touchend",onMouseMove),elCanvas.remove()}}}]),crop.factory("cropPubSub",[function(){return function(){var events={};this.on=function(names,handler){return names.split(" ").forEach(function(name){events[name]||(events[name]=[]),events[name].push(handler)}),this},this.trigger=function(name,args){return angular.forEach(events[name],function(handler){handler.call(null,args)}),this}}}]),crop.directive("imgCrop",["$timeout","cropHost","cropPubSub",function($timeout,CropHost,CropPubSub){return{restrict:"E",scope:{image:"=",resultImage:"=",changeOnFly:"=",areaType:"@",areaMinSize:"=",resultImageSize:"=",resultImageFormat:"@",resultImageQuality:"=",onChange:"&",onLoadBegin:"&",onLoadDone:"&",onLoadError:"&"},template:"<canvas></canvas>",controller:["$scope",function($scope){$scope.events=new CropPubSub}],link:function(scope,element){var storedResultImage,events=scope.events,cropHost=new CropHost(element.find("canvas"),{},events),updateResultImage=function(scope){var resultImage=cropHost.getResultImageDataURI();storedResultImage!==resultImage&&(storedResultImage=resultImage,angular.isDefined(scope.resultImage)&&(scope.resultImage=resultImage),scope.onChange({$dataURI:scope.resultImage}))},fnSafeApply=function(fn){return function(){$timeout(function(){scope.$apply(function(scope){fn(scope)})})}};events.on("load-start",fnSafeApply(function(scope){scope.onLoadBegin({})})).on("load-done",fnSafeApply(function(scope){scope.onLoadDone({})})).on("load-error",fnSafeApply(function(scope){scope.onLoadError({})})).on("area-move area-resize",fnSafeApply(function(scope){scope.changeOnFly&&updateResultImage(scope)})).on("area-move-end area-resize-end image-updated",fnSafeApply(function(scope){updateResultImage(scope)})),scope.$watch("image",function(){cropHost.setNewImageSource(scope.image)}),scope.$watch("areaType",function(){cropHost.setAreaType(scope.areaType),updateResultImage(scope)}),scope.$watch("areaMinSize",function(){cropHost.setAreaMinSize(scope.areaMinSize),updateResultImage(scope)}),scope.$watch("resultImageSize",function(){cropHost.setResultImageSize(scope.resultImageSize),updateResultImage(scope)}),scope.$watch("resultImageFormat",function(){cropHost.setResultImageFormat(scope.resultImageFormat),updateResultImage(scope)}),scope.$watch("resultImageQuality",function(){cropHost.setResultImageQuality(scope.resultImageQuality),updateResultImage(scope)}),scope.$watch(function(){return[element[0].clientWidth,element[0].clientHeight]},function(value){cropHost.setMaxDimensions(value[0],value[1]),updateResultImage(scope)},!0),scope.$on("$destroy",function(){cropHost.destroy()})}}}])}();