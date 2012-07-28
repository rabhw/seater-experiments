'use strict';

/* Directives */


angular.module('seater.directives', []).directive('draggable', function($document) {
  var startX=0, startY=0, x=0, y=0;
  return function(scope, element, attr) {
    element.css({
      'position':'relative',
      'border':'solid 1px red',
      'background-color':'lightgrey',
      'cursor':'pointer',
    });
    element.on('mousedown', function(e) {
      startX = e.screenX - x;
      startY = e.screenY - y;
      $document.on('mousemove', function(e) {
        y = e.screenY - startY;
        x = e.screenX - startX;
        element.css({
          'top': y+'px',
          'left': x+'px',
        });
      });
      $document.on('mouseup', function(e) {
        $document.off('mousemove');
        $document.off('mouseup');
      });
    })
  };
});