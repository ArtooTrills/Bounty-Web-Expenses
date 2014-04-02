App.SummaryController = Ember.ArrayController.extend({
	content: [],
	itemController: 'summaryItem',
	actions: {
		exportToExcel: function() {
			var htmltable = document.getElementById('summary');
			var html = htmltable.outerHTML;
			window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));	
		},
		printTable: function() {
			var htmltable = document.getElementById('summary');
			newWin = window.open("");
			newWin.document.writeln("<html><head>");
			newWin.document.writeln('<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />');
			newWin.document.writeln("<link rel='stylesheet' type='text/css' href='css/style.css'>");
			newWin.document.writeln("</head><body>");
			newWin.document.writeln(htmltable.outerHTML);
			newWin.document.writeln("</body></html>");
			newWin.document.close();
			newWin.focus();
			newWin.print();
			newWin.close();
		}
	}
});
