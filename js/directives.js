'use strict';

/* Directives */


angular.module('seater.directives', []).directive('draggable', function() {
    return {
        restrict:'A',
        link:function(scope,element,attrs){
           element.draggable({
          containment: "parent",
            stack: ".table-wrap"
           });
        }
    };
}).directive('droppable',function(){
    return{
      restrict:'A',
      link:function(scope,element,attrs){
        element.droppable({
          drop:function(event,ui){
            // do stuff when dropped (store position / convert values to %)
          }
        });
      }
    };
}).directive('editSeat',function(){
    return{
      restrict:'E',
      templateUrl: 'views/edit-seat.html',
      replace: true,
      compile: function compile(tElement, tAttrs) {

        tElement.qtip({
          content: {
            text: tElement
          },
          position: {
            my: 'left center',
            at:'right center',
            viewport: $('#canvas')
          },
          hide: false
        }).hide();

        return function postLink(scope, iElement, iAttrs) {
          var api = tElement.qtip('api');
          $('.seat a').live('click', function(e) {
            console.log(e);
            tElement.qtip('option', {
              'position.target': $(this)
            });
            api.show();
          });

        }
      }
    };
});