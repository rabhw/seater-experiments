'use strict';

/* Directives */


angular.module('seater.directives', [])
.directive('droppable',function(){
    return {
      restrict:'A',
      link:function($scope,element,attrs){
        element.droppable({
          tolerance: 'fit',
          drop:function(event,ui){

          }
        });
      }
    };
}).directive('draggable', function() {
    return {
        restrict:'A',
        link:function($scope,element,attrs){
           element.draggable({
              containment: $('#canvas'),
              revert: 'invalid',
              appendTo: $('#canvas'),
              stack: ".table-wrap",
              zIndex: 2700,
              start : function(event, ui) {
                $('.ui-tooltip').fadeOut('fast');
              },
              stop : function(event, ui) {
                var canvasWidth = $(window).width();
                var canvasHeight = $(window).height();
                var tablePosX = ((event.target.offsetLeft / canvasWidth)*100)+'%';
                var tablePosY = ((event.target.offsetTop / canvasHeight)*100)+'%';

                $scope.table.xPos = tablePosX;
                $scope.table.yPos = tablePosY;
                $scope.table.update();
              }
           });


          // Generator case (If dragged from objects panel) - Create new object then
          if (attrs.generator) {

            // Set options appropriately for a generator object
            element.draggable( "option", "helper", "clone" );
            element.draggable( "option", "zIndex", 40000 );

            element.draggable( "option", "start", function(event, ui) {
              $scope.showPalette = false;
              $scope.$apply();
            });

            element.draggable( "option", "stop", function(event, ui) {

                              var canvasWidth = $(window).width();
                var canvasHeight = $(window).height();
                var tablePosX = ((ui.position.left / canvasWidth)*100)+'%';
                var tablePosY = ((ui.position.top / canvasHeight)*100)+'%';

            // Show editing modal
            $scope.editTable();
            $scope.editingTable.shape = attrs.tableShape;
            $scope.editingTable.xPos = tablePosX;
            $scope.editingTable.yPos = tablePosY;
            $scope.$apply();
            });
          }

        }
    };
}).directive('resizable',function(){
    return{
      restrict:'A',
      link:function($scope,element,attrs){
        element.resizable();
      }
    };
}).directive('editSeat',function(){
    return{
      restrict:'E',
      templateUrl: 'views/edit-seat.html',
      transclude: true,
      replace: true,
      controller: function($scope, $element) {
        $scope.saveSeat = function() {
          $scope.clearSeat($scope.editingSeat.guestId);
          $scope.editingSeat.table.seats[$scope.editingSeat.seatIndex].guestId = $scope.editingSeat.guestId;
          $scope.editingSeat.table.update();
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

        return function postLink($scope, iElement, iAttrs) {

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