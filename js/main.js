/* Author:

*/


$(document).ready(function() {



	$('.rotate-table').on('click', function(e) {

		var $this = $(this);
		var $table = $this.parent().parent().find('.table');

		if ($this.hasClass('cw')) {
			$table.transition({ rotate: '+=45deg' });
		}

		else {
			$table.transition({ rotate: '-=45deg' });
		}

		e.preventDefault();
	});

	$.extend($.fancybox.defaults, {
		autoSize : 'false',
		width: '100%',
		minWidth : 800,
		maxWidth : 940,
		padding : 40,
		helpers:  {
		    overlay : {
		    	opacity: 0.3,
		        css : {
		            //'background-color' : '#000'
		        }
		    }
		}
	});


	$('.seat').on('click', function(e) {
		$.fancybox( $('#edit-seat') );
	});

});