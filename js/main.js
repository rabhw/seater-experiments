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


	$('.seat').on('click', function(e) {
		$.fancybox( $('#edit-seat') );
	});

});