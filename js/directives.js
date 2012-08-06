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
              start : function(event, ui) {
                $('.ui-tooltip').fadeOut('fast');
              },
              stop : function(event, ui) {

                $scope.table.xPos = event.target.offsetLeft+'px';
                $scope.table.yPos = event.target.offsetTop+'px';

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

              // Show editing modal
            $scope.showEditTable = true;
              $scope.editTableId = null;
              $scope.editTableShape = attrs.tableShape;
              $scope.editTableX = ui.position.left+'px';
              $scope.editTableY = ui.position.top+'px';
              $scope.editTableNumSeats = 6; // default table size of 6
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
}).directive('canvas',function(){
    return{
      restrict:'A',
      link:function($scope,element,attrs){

        var windowHeight = $(window).outerHeight(),
            headerHeight = $('header').outerHeight(),
            canvasHeight = (windowHeight - headerHeight)*0.96;

        element.css({'height' : canvasHeight+'px'});

        $(window).resize(function() {
          //@TODO : DEBOUNCE
          setCanvasHeight();
        });

        function setCanvasHeight() {
          windowHeight = $(window).outerHeight();
          canvasHeight = (windowHeight - headerHeight)*0.96;
          element.css({'height' : canvasHeight+'px'})
        }

        
      }
    };
}).directive('palette',function(){
    return{
      restrict:'A',
      link:function($scope,element,attrs){
      }
    };
}).directive('editSeat',function(){
    return{
      restrict:'E',
      templateUrl: 'views/edit-seat.html',
      transclude: true,
      replace: true,
      controller: function($scope, $element, planService) {
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