!function(){function e(e,o){return r(e||self.document.URL||self.location.href,o||t())}function t(){var e=document.getElementsByTagName("script");return e[e.length-1].src}function r(e,t){var r=t;return/^(\/|\\\\)/.test(t)?r=/^.+?\w(\/|\\\\)/.exec(e)[0]+t.replace(/^(\/|\\\\)/,""):/^[a-z]+:/i.test(t)||(r=(e=e.split("#")[0].split("?")[0].replace(/[^\\\/]+$/,""))+""+t),o(r)}function o(e){var t=/^[a-z]+:\/\//.exec(e)[0],r=null,o=[];for((e=(e=e.replace(t,"").split("?")[0].split("#")[0]).replace(/\\/g,"/").split(/\//))[e.length-1]="";e.length;)".."===(r=e.shift())?o.pop():"."!==r&&o.push(r);return t+o.join("/")}var l=window.UEDITOR_HOME_URL||e();window.UEDITOR_CONFIG={UEDITOR_HOME_URL:l,serverUrl:"/webapi/upload/controller",toolbars:[["fullscreen","source","|","undo","redo","|","bold","italic","underline","fontborder","strikethrough","superscript","subscript","removeformat","formatmatch","autotypeset","blockquote","pasteplain","|","forecolor","backcolor","insertorderedlist","insertunorderedlist","selectall","cleardoc","|","rowspacingtop","rowspacingbottom","lineheight","|","customstyle","paragraph","fontfamily","fontsize","|","directionalityltr","directionalityrtl","indent","|","justifyleft","justifycenter","justifyright","justifyjustify","|","touppercase","tolowercase","|","link","unlink","anchor","|","simpleupload","insertimage","attachment","emotion","scrawl","insertvideo","map","pagebreak","template","|","horizontal","date","time","|","inserttable","deletetable","insertparagraphbeforetable","insertrow","deleterow","insertcol","deletecol","mergecells","mergeright","mergedown","splittocells","splittorows","splittocols","|","stock"]]},window.UE={getUEBasePath:e}}();