App.SummaryController = Ember.ArrayController.extend({
	content: [],
	itemController: 'summaryItem',
	payments: new Array(),
	isComputing: false,
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
		},
		computePayments: function() {
			var owes = new Array();
			var owed = new Array();
			var payments = this.get('payments');
			this.get('model').forEach(function(summaryRecord) {
				var balance = parseFloat(summaryRecord.get('balance'));
				if(balance >= 0) {
					owed.push({id: summaryRecord.get('id'), name: summaryRecord.get('name'), bal: balance});
				}
				else {
					owes.push({id: summaryRecord.get('id'), name: summaryRecord.get('name'), bal: parseFloat(-balance)});
				}
			});
			owes.sort(function(a, b) {
				return -b.bal + a.bal;
			});

			owed.sort(function(a, b) {
				return b.bal - a.bal;
			});

			while (owes.filter(function(item) {
				if (item.bal > 0)
					return true;	
				}).length != 0) {
				var count = 0;
				var owesObj = owes[count];
				while (owesObj.bal == 0) 
					owesObj = owes[++ count];
				count = 0;
				var owedObj = owed[count];
				while (owedObj.bal == 0)
					owedObj = owed[++ count];
				var owesAmount = owesObj.bal;
				var owedAmount = owedObj.bal;
				if(owesAmount >= owedAmount) {
					owesObj.bal = owesAmount - owedAmount;
					owedObj.bal = 0;
					payments.push({owesId: owesObj.id, owesName: owesObj.name, owedId: owedObj.id, owedName: owedObj.name, amount: owedAmount});
				}
				else {
					owesObj.bal = 0;
					owedObj.bal = owedAmount - owesAmount;
					payments.push({owesId: owesObj.id, owesName: owesObj.name, owedId: owedObj.id, owedName: owedObj.name, amount: owesAmount});
				}
				if (owed.filter(function(item) {
					if(item.bal > 0)
						return true;
					}).length == 0)
					break;
			}
			this.set('payments', payments);
			this.set('isComputing', true);
		}
	}
});
