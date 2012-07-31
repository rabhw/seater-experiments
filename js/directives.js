'use strict';

/* Directives */


angular.module('seater.directives', [])
.directive('droppable',function(){
    return {
      controller: function($scope, $element) {

      },
      restrict:'A',
      link:function(scope,element,attrs,controller){
        element.droppable({
          drop:function(event,ui){

          }
        });
      }
    };
}).directive('draggable', function() {
    return {
        require: '^droppable',
        restrict:'A',
        link:function(scope,element,attrs, controller){
           element.draggable({
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
}).directive('resizable',function(){
    return{
      restrict:'A',
      link:function(scope,element,attrs){
        element.resizable();
      }
    };
}).directive('canvas',function(){
    return{
      restrict:'A',
      link:function(scope,element,attrs){

        var windowHeight = $(window).outerHeight(),
            headerHeight = $('header').outerHeight(),
            footerHeight = $('footer').outerHeight(),
            canvasHeight = (windowHeight - headerHeight - footerHeight)*0.95;

        element.css({'height' : canvasHeight+'px'});

        $(window).resize(function() {
          setCanvasHeight();
        });

        function setCanvasHeight() {
          windowHeight = $(window).outerHeight();
          canvasHeight = (windowHeight - headerHeight - footerHeight)*0.95;
          element.css({'height' : canvasHeight+'px'})
        }

        
      }
    };
}).directive('palette',function(){
    return{
      restrict:'A',
      link:function(scope,element,attrs){
        var height = element.outerHeight();
        var pullTab = element.find('.pull-tab');
        element.css({ 'top': '-'+height+'px' }); // hide by default
        pullTab.toggle(
          function() {
              element.animate({ 'top': '0' });
          },
          function() {
              element.animate({ 'top': '-'+height+'px'});
          });
      }
    };
}).directive('editSeat',function(){
    return{
      restrict:'E',
      templateUrl: 'views/edit-seat.html',
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