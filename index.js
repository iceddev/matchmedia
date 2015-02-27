'use strict';

var staticMatch = require('css-mediaquery').match;
var dynamicMatch = typeof window !== 'undefined' ? window.matchMedia : null;

// our fake MediaQueryList
function Mql(query, values){
  if(dynamicMatch){
    var mql = dynamicMatch(query);
    this.matches = mql.matches;
    this.media = mql.media;
  } else {
    this.matches = staticMatch(query, values);
    this.media = query;
  }

  this.addListener = addListener;
  this.removeListener = removeListener;

  function addListener(listener){
    if(mql){
      mql.addListener(listener);
    }
  }

  function removeListener(listener){
    if(mql){
      mql.removeListener(listener);
    }
  }
}

function matchMedia(query, values){
  return new Mql(query, values);
}

module.exports = matchMedia;
