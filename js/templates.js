Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["confirmDelete"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"modal-header\">\n	<button type=\"button\" class=\"close\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">&times;</button>\n	<h3>Delete Persons</h3>\n</div>\n<div>\n<form ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmDelete", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n<div class=\"modal-body\">\n	Are you sure you want to delete the selected persons?\n</div>\n<div class=\"modal-footer\">\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" value=\"Cancel\"/>\n        <input type=\"submit\" class=\"btn btn-primary\" value=\"Confirm Delete\"/>\n</div>\n</form>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["editExpense"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"modal-header\">\n	<button type=\"button\" class=\"close\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">&times;</button>\n	<h3>Edit Expense</h3>\n</div>\n<div>\n<form ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n<div class=\"modal-body\">\n	<table class=\"table modaltable\">\n		<tr>\n			<td><label for=\"date\">Date </label></td>\n			<td>");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.DateField", {hash:{
    'dateBinding': ("date"),
    'id': ("date")
  },hashTypes:{'dateBinding': "STRING",'id': "STRING"},hashContexts:{'dateBinding': depth0,'id': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label for=\"description\">Description </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("description"),
    'id': ("description")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label>Who Paid? </label></td>\n			<td>\n			");
  data.buffer.push(escapeExpression((helper = helpers['radio-component'] || (depth0 && depth0['radio-component']),options={hash:{
    'content': ("controllers.persons.content"),
    'value': ("selectedPayer")
  },hashTypes:{'content': "ID",'value': "ID"},hashContexts:{'content': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "radio-component", options))));
  data.buffer.push("\n			</td>\n		</tr>\n		<tr>\n			<td><label for=\"amount\">Amount </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("amount"),
    'id': ("amount")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label>For Whom? </label></td>\n			<td>\n			");
  data.buffer.push(escapeExpression((helper = helpers['checkbox-component'] || (depth0 && depth0['checkbox-component']),options={hash:{
    'content': ("controllers.persons.content"),
    'value': ("selectedPayees")
  },hashTypes:{'content': "ID",'value': "ID"},hashContexts:{'content': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "checkbox-component", options))));
  data.buffer.push("\n			");
  stack1 = helpers._triageMustache.call(depth0, "controllers.persons.content.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</td>\n		</tr>	\n	</table>\n</div>\n<div class=\"modal-footer\">\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" value=\"Cancel\"/>\n        <input type=\"submit\" class=\"btn btn-primary\" value=\"Save\"/>\n</div>\n</form>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["editPerson"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"modal-header\">\n	<button type=\"button\" class=\"close\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">&times;</button>\n	<h3>Edit Person</h3>\n</div>\n<div>\n<form ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n<div class=\"modal-body\">\n	<table class=\"table\">\n		<tr>\n			<td><label for=\"name\">Person Name </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("name"),
    'id': ("name")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label for=\"displayName\">Display Name </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("displayName"),
    'id': ("displayName")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label for=\"comment\">Comment </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("comment"),
    'id': ("comment")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n	</table>\n</div>\n<div class=\"modal-footer\">\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" value=\"Cancel\"/>\n        <input type=\"submit\" class=\"btn btn-primary\" value=\"Save changes\"/>\n</div>\n</form>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["expenses"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push(" Compute Payments >> ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n			<tr>\n				<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checked': ("isChecked")
  },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n				<td class=\"edit\"><button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editExpense", "expense", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-sm\">Edit</button></td>\n				<td> ");
  data.buffer.push(escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "date", "DD-MM-YYYY", options) : helperMissing.call(depth0, "formatDate", "date", "DD-MM-YYYY", options))));
  data.buffer.push(" </td>\n				<td> ");
  stack1 = helpers._triageMustache.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n				<td> ");
  stack1 = helpers._triageMustache.call(depth0, "payer.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n				<td> ");
  stack1 = helpers._triageMustache.call(depth0, "amount", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n				<td>\n				<ul class='payees'>\n				");
  stack1 = helpers.each.call(depth0, "person", "in", "payees", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</ul>\n				</td>\n			</tr>\n			");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n					<li>");
  stack1 = helpers._triageMustache.call(depth0, "person.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n				");
  return buffer;
  }

  data.buffer.push("<div class=\"main\">\n	<div>\n		<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addExpense", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Add Expense [+]</button>\n		<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteExpenses", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Delete Selected</button>\n		");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary btn-xs")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "summary", options) : helperMissing.call(depth0, "link-to", "summary", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		<br/><br/>\n		<table class=\"table table-hover table-bordered\">\n			<tr>\n				<th>all</th>\n				<th></th>\n				<th>Date</th>\n				<th>Description</th>\n				<th>Who paid?</th>\n				<th>Amount</th>\n				<th>For whom?</th>\n			</tr>\n			");
  stack1 = helpers.each.call(depth0, "expense", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</table>\n	</div>\n	");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "modal", options) : helperMissing.call(depth0, "outlet", "modal", options))));
  data.buffer.push("\n</div>\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<div class=\"modal-backdrop fade\">&nbsp;</div>\n<div class=\"modal fade show\">\n<div class=\"modal-dialog\">\n<div class=\"modal-content\">\n");
  stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n</div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["newExpense"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"modal-header\">\n	<button type=\"button\" class=\"close\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">&times;</button>\n	<h3>New Expense</h3>\n</div>\n<div>\n<form ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", "expensesMaxId", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n<div class=\"modal-body\">\n	<table class=\"table modaltable\">\n		<tr>\n			<td><label for=\"date\">Date </label></td>\n			<td>");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.DateField", {hash:{
    'dateBinding': ("expenseDate"),
    'id': ("date")
  },hashTypes:{'dateBinding': "STRING",'id': "STRING"},hashContexts:{'dateBinding': depth0,'id': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label for=\"description\">Description </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("description"),
    'id': ("description")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label>Who Paid? </label></td>\n			<td>\n			");
  data.buffer.push(escapeExpression((helper = helpers['radio-component'] || (depth0 && depth0['radio-component']),options={hash:{
    'content': ("controllers.persons.content"),
    'value': ("selectedPayer")
  },hashTypes:{'content': "ID",'value': "ID"},hashContexts:{'content': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "radio-component", options))));
  data.buffer.push("\n			</td>\n		</tr>\n		<tr>\n			<td><label for=\"amount\">Amount </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("amount"),
    'id': ("amount")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label>For Whom? </label></td>\n			<td>\n			");
  data.buffer.push(escapeExpression((helper = helpers['checkbox-component'] || (depth0 && depth0['checkbox-component']),options={hash:{
    'content': ("controllers.persons.content"),
    'value': ("selectedPayees")
  },hashTypes:{'content': "ID",'value': "ID"},hashContexts:{'content': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "checkbox-component", options))));
  data.buffer.push("\n			");
  stack1 = helpers._triageMustache.call(depth0, "controllers.persons.content.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</td>\n		</tr>	\n	</table>\n</div>\n<div class=\"modal-footer\">\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveAndNew", "personsMaxId", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" value=\"Save and New\"/>\n        <input type=\"submit\" class=\"btn btn-primary\" value=\"Save\"/>\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" value=\"Cancel\"/>\n</div>\n</form>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["newPerson"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"modal-header\">\n	<button type=\"button\" class=\"close\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">&times;</button>\n	<h3>New Person</h3>\n</div>\n<div>\n<form ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", "personsMaxId", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n<div class=\"modal-body\">\n	<table class=\"table\">\n		<tr>\n			<td><label for=\"name\">Person Name </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("name"),
    'id': ("name")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label for=\"displayName\">Display Name </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("displayName"),
    'id': ("displayName")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label for=\"comment\">Comment </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("comment"),
    'id': ("comment")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n	</table>\n</div>\n<div class=\"modal-footer\">\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveAndNew", "personsMaxId", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" value=\"Save and New\"/>\n        <input type=\"submit\" class=\"btn btn-primary\" value=\"Save\"/>\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" value=\"Cancel\"/>\n</div>\n</form>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["persons"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push(" Enter Expenses >> ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n			<tr>\n				<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checked': ("isChecked")
  },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n				<td class=\"edit\"><button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editPerson", "person", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-sm\">Edit</button></td>\n				<td> ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n				<td> ");
  stack1 = helpers._triageMustache.call(depth0, "displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n				<td> ");
  stack1 = helpers._triageMustache.call(depth0, "comment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n			</tr>\n			");
  return buffer;
  }

  data.buffer.push("<div class=\"main\">\n	<div>\n		<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addPerson", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Add Person [+]</button>\n		<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deletePersons", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Delete Selected</button>\n		");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary btn-xs")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "expenses", options) : helperMissing.call(depth0, "link-to", "expenses", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		<br/><br/>\n		<table class=\"table table-hover table-bordered\">\n			<tr>\n				<th>all</th>\n				<th></th>\n				<th>Person Name</th>\n				<th>Display Name</th>\n				<th>Description or Comment</th>\n			</tr>\n			");
  stack1 = helpers.each.call(depth0, "person", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</table>\n	</div>\n	");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "modal", options) : helperMissing.call(depth0, "outlet", "modal", options))));
  data.buffer.push("\n</div>\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["summary"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n		<tr>\n			<td> ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n			<td> ");
  stack1 = helpers._triageMustache.call(depth0, "spent", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n			<td> ");
  stack1 = helpers._triageMustache.call(depth0, "owes", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n			<td> ");
  stack1 = helpers._triageMustache.call(depth0, "owed", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n			<td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("balanceColor")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> ");
  stack1 = helpers._triageMustache.call(depth0, "balance", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n		</tr>\n		");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n		It would take ");
  stack1 = helpers._triageMustache.call(depth0, "payments.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" payments to even out all debts:\n		<br/>\n		<table id=\"payments\">\n		");
  stack1 = helpers.each.call(depth0, "payment", "in", "payments", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n		<tr>\n			<td class=\"negative\">");
  stack1 = helpers._triageMustache.call(depth0, "payment.owesName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n			<td>\n				<div class=\"arrow\">\n				<span class=\"line\"></span>\n				<span class=\"point\"></span>\n				</div>\n			</td>\n			<td>");
  stack1 = helpers._triageMustache.call(depth0, "payment.amount", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n			<td>\n				<div class=\"arrow\">\n				<span class=\"line\"></span>\n				<span class=\"point\"></span>\n				</div>\n			</td>\n			<td class=\"positive\">");
  stack1 = helpers._triageMustache.call(depth0, "payment.owedName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n		</tr>\n		");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\n			<li> No payments to be done... </li>\n		");
  }

  data.buffer.push("<div class=\"main\">\n	<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "exportToExcel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Export to Excel</button>\n	<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "printTable", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Print Table</button>\n	<br/><br/>\n	<table class=\"table table-hover table-bordered\" id=\"summary\">\n		<tr>\n			<th>Name</th>\n			<th>Total Spent</th>\n			<th>Owes</th>\n			<th>Is Owed</th>\n			<th>Balance</th>\n		</tr>\n		");
  stack1 = helpers.each.call(depth0, "summaryItem", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	</table>\n	<br/>\n	<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "computePayments", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Compute Payments</button>\n	<br/><br/>\n	");
  stack1 = helpers['if'].call(depth0, "isComputing", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["components/checkbox-component"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n<li>\n	");
  data.buffer.push(escapeExpression((helper = helpers['check-box'] || (depth0 && depth0['check-box']),options={hash:{
    'value': ("id"),
    'name': ("view.name"),
    'checkedVals': ("view.value")
  },hashTypes:{'value': "ID",'name': "ID",'checkedVals': "ID"},hashContexts:{'value': depth0,'name': depth0,'checkedVals': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "check-box", options))));
  data.buffer.push("\n	<label>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</label>\n</li>\n");
  return buffer;
  }

  data.buffer.push("<ul>\n");
  stack1 = helpers.each.call(depth0, "content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["components/radio-component"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n<li>\n	");
  data.buffer.push(escapeExpression((helper = helpers['radio-button'] || (depth0 && depth0['radio-button']),options={hash:{
    'value': ("id"),
    'name': ("view.name"),
    'selection': ("view.value")
  },hashTypes:{'value': "ID",'name': "ID",'selection': "ID"},hashContexts:{'value': depth0,'name': depth0,'selection': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "radio-button", options))));
  data.buffer.push("\n	<label>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</label>\n</li>\n");
  return buffer;
  }

  data.buffer.push("<ul>\n");
  stack1 = helpers.each.call(depth0, "content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n\n");
  return buffer;
  
});