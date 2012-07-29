'use strict';

/* Directives */


angular.module('seater.directives', []).directive('draggable', function() {
    return {
        restrict:'A',
        link:function(scope,element,attrs){
           element.draggable({
              containment: "parent",
              stack: ".table-wrap",
              start : function(event, ui) {
                $('.ui-tooltip').fadeOut('fast');
              },
              stop : function(event, ui) {
                scope.table.xPos = event.target.offsetLeft+'px';
                scope.table.yPos = event.target.offsetTop+'px';
              }
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
}).directive('resizable',function(){
    return{
      restrict:'A',
      link:function(scope,element,attrs){
        console.log('got it');
        element.resizable();
      }
    };
}).directive('tableControls',function(){
    return{
      restrict:'A',
      link:function(scope,element,attrs){
      }
    };
}).directive('editSeat',function(){
    return{
      restrict:'E',
      templateUrl: 'views/edit-seat.html',
      replace: true,
      controller: function editSeatCtrl($scope, $element, planService) {
        $scope.saveSeat = function() {
          planService.saveSeat($scope.editTable, $scope.editSeat, $scope.editGuest);
          $($element).parents('.ui-tooltip').fadeOut('fast');
        }
      },
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
            tElement.qtip('option', {
              'position.target': $(this)
            });
            api.show();
          });

        }
      }
    };
});