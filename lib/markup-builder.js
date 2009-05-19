/*!
 * markup-builder 0.1
 * http://github.com/dburrows/markup-builder
 *
 * Copyright (c) 2009 David Burrows
 * Licensed under the MIT licenses.
 *
 */
function markupBuilder() {

var SINGLETAGS = ",area,base,basefont,br,hr,input,img,link,meta,"; 
  
this.build = function(tag,data) {
  if ( data.length == 0 ) {
    return simpleTag(tag)  
  } else {
    tag_data = data[0];
    markup = "";
    for (var i=1;i<data.length;i++) {
      markup += data[i];
    }
    if (typeof tag_data == "string") {
      return simpleTag(tag,data[0],markup);
    } else if (tag_data instanceof Array) {
      return markupFromArray(tag,data[0],markup); 
    } else if (typeof tag_data == "object") {
      return tagWithAttributes(tag,data[0],markup);
    } else {
      console.log("function signature wrong, check argument syntax")
    }
  } 
}


this.simpleTag = function(tag,content,markup) {
  if (markup==undefined) markup = "";
  if (content==undefined) content = "";
  var m = "";
  if ( SINGLETAGS.indexOf("," + tag + ",")  > 0) {
    m = "<" + tag + " />";
  } else {
    m = "<" + tag + ">"+ content + markup +  "</" + tag + ">";
  }
  return m;
}

this.markupFromArray = function(tag,contentArray,markup) {
  if (markup==undefined) markup = "";
  if (content==undefined) content = "";
  m = "";
  for (i=0;i<contentArray.length;i++) {
    m += "<" + tag + ">"+ contentArray[i] + markup + "</" + tag + ">";
  }
  return m;
}

this.tagWithAttributes = function(tag,attributes,markup) {
  if (markup==undefined) markup = "";
  if (content==undefined) content = "";
  txt = "";
  if (attributes.text) {
    txt = attributes.text;
    delete attributes.text;
  }
  m = "";
  if ( SINGLETAGS.indexOf("," + tag + ",")  > 0) {
    m = "<" + tag;
    for (var prop in attributes) {
      m += " " + prop + '="' + attributes[prop] + '"';
    }
    m += " />";
  } else {
    m = "<" + tag;
    for (var prop in attributes) {
      m += " " + prop + '="' + attributes[prop] + '"';
    }
    m += " >" + txt + markup + '</' + tag + '>';
  }
  return m;
}

p= {};
p.table = function() {
  return build("table", arguments );
},
p.tr = function() {
  return build("tr",arguments );
},
p.td  = function() {
  return build("td",arguments);
}
p.div = function() {
  return build("div", arguments);
}
p.span = function() {
  return build("span", arguments);
}
p.p = function() {
  return build("p", arguments);
}
p.ul = function() {
  return build("ul", arguments);
}
p.li = function() {
  return build("li", arguments);
}
p.img = function() {
  return build("img", arguments);
}
p.br = function(){
  return build("br", arguments)
}
return p;
};
