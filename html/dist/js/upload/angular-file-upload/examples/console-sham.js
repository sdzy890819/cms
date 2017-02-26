/**
 * Fixed error: "console" is undefined in IE<10 if dev tools are not open
 */
!function(window){window.console||(window.console=function(){for(var key,methods="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),noop=function(){},object={};key=methods.pop();)object[key]=noop;return object}())}(window);