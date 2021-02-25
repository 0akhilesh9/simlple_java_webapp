var app = angular.module('interfacetest', []);
app.controller('myCtrl', function($scope, $http) {
	
$scope.validationPrediction = function(){
	var flag = true;
	var inc = document.getElementById('incidentid');
	var por = document.getElementById('portfolioid');
	var pri = document.getElementById('priority');
	var summ = document.getElementById('summary');
	var assi = document.getElementById('assigneeclass');
	if(empty(inc.value)|| empty(por.value) || empty(pri.value) || empty(assi.value)){
		flag = false;
	}
	if(summ.value.length<10){
		flag = false;
	}
	 return flag;	 
 };
	
$scope.validationAnomaly = function(){
		var flag = true;
		var res = document.getElementById('resolution');
		if(empty(res.value) || $scope.validationPrediction() == false || res.value.length<10){
			flag = false;
		}
		return flag;	 
};
 
$scope.performAnomaly = function() {
		$scope.reqdata = {
				"incidentId" : document.getElementById('incidentid').value,
				"portfolioId" : document.getElementById('portfolioid').value,
				 "assigneeClass" : document.getElementById('assigneeclass').value,
				 "incidentType" : "incidenttype",
				 "category" : "category",
				 "subCategory" : "subcategory",
				 "applicationName" : "applicationname",
				 "submitDate" : "2010-12-01",
				 "closedDate" : "2010-12-02",
				 "lastModifiedDate" : "2010-12-01",
				 "status" : "status",
				 "priority" : document.getElementById('priority').value,
				 "summary" : document.getElementById('summary').value,
				 "notes" : "notes",
				 "resolution" : document.getElementById('resolution').value
				};

	
		$http.post('http://'+props.host+'/Interfacedemo/interface/getAnomalyDataForm',
				$scope.reqdata).then(function(response) {
			$scope.json = response.data;	
			CreateVertTableFromJSON($scope.json[0],"ticketDetails",'id','table-style');
			CreateHorizTableFromJSONAnomaly($scope.json[1],"predictionData",'id','table-style');
		}, function myError(response) {
			$scope.json = response.statusText;
			var divContainer = document.getElementById("ticketDetails");			
			divContainer.innerHTML = "";
			var para = document.createElement("P");                       
			var t = document.createTextNode("Anomaly Details Not Found");      
			para.style.color = 'red';
			para.setAttribute("class","error");
			para.appendChild(t); 
			divContainer.appendChild(para);
		});
	}
 
$scope.performPrediction = function() {
		/*$scope.reqdata = {
		"incidentid" : document.getElementById('incidentid').value,
		"porfolioid" : document.getElementById('porfolioid').value,
		 "assigneeClass" : document.getElementById('assigneeclass').value,
		 "incidentType" : document.getElementById('incidenttype').value,
		 "category" : document.getElementById('category').value,
		 "subCategory" : document.getElementById('subcategory').value,
		 "applicationName" : document.getElementById('applicationname').value,
		 "submitDate" : document.getElementById('submitdate').value,
		 "closedDate" : document.getElementById('closeddate').value,
		 "lastModifiedDate" : document.getElementById('lastmodifieddate').value,
		 "status" : document.getElementById('status').value,
		 "priority" : document.getElementById('priority').value,
		 "summary" : document.getElementById('summary').value,
		 "notes" : document.getElementById('notes').value,
		 "resolution" : document.getElementById('resolution').value
		};*/
		
		
		$scope.reqdata = {
				"incidentId" : document.getElementById('incidentid').value,
				"portfolioId" : document.getElementById('portfolioid').value,
				 "assigneeClass" : document.getElementById('assigneeclass').value,
				 "incidentType" : "incidenttype",
				 "category" : "category",
				 "subCategory" : "subcategory",
				 "applicationName" : "applicationname",
				 "submitDate" : "2010-12-01",
				 "closedDate" : "2010-12-02",
				 "lastModifiedDate" : "2010-12-01",
				 "status" : "status",
				 "priority" : document.getElementById('priority').value,
				 "summary" : document.getElementById('summary').value,
				 "notes" : "notes",
				 "resolution" : "resolution"
				};

	
		$http.post('http://'+props.host+'/Interfacedemo/interface/getTicketDataForm',
				$scope.reqdata).then(function(response) {
			$scope.json = response.data;		
			CreateVertTableFromJSON($scope.json[0],"ticketDetails",'id','table-style');
			CreateHorizTableFromJSON($scope.json[1],"predictionData",'id','table-style');
		}, function myError(response) {
			$scope.json = response.statusText;
			var divContainer = document.getElementById("ticketDetails");			
			divContainer.innerHTML = "";
			var para = document.createElement("P");                       
			var t = document.createTextNode("Ticket Details Not Found");      
			para.style.color = 'red';
			para.setAttribute("class","error");
			para.appendChild(t); 
			divContainer.appendChild(para);
		});
	}
		
	});

function empty(e) {
	  switch (e) {
	    case "":
	    case 0:
	    case "0":
	    case null:
	    case false:
	    case typeof this == "undefined":
	      return true;
	    default:
	      return false;
	  }
	}

function getScope(ctrlName) {
	var sel = 'div[ng-controller="' + ctrlName + '"]';
	return angular.element(sel).scope();
}


CreateHorizTableFromJSONAnomaly = function(myObjs, divName, styleAttr, styleValue) {
	var col = [];
	var n =4;
	for ( var key in myObjs) {
		if (col.indexOf(key) === -1) {
			col.push(key);
		}
	}
	var table = document.createElement("table");
	table.setAttribute(styleAttr, styleValue );
	var tr = table.insertRow(-1);
	
	for (var i = 0; i < n; i++) {
		var th = document.createElement("th");
		th.innerHTML = col[i+n];
		tr.appendChild(th);
	}

/*	tr = table.insertRow(-1);
	for (var j = 0; j < n; j++) {
		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = myObjs[col[j+n]];
	}*/
	if (myObjs[col[n]] == null) {
		tr = table.insertRow(-1);
		for (var j = 0; j < n; j++) {
			var tabCell = tr.insertCell(-1);
			tabCell.innerHTML = myObjs[col[j + n]];// .substring(p,myObjs[col[j+n]].length);
		}
	} else if (myObjs[col[n]] != null) {
	var p=0;
	var q=0;
	while(myObjs[col[n]].indexOf('~')>0){
		
	tr = table.insertRow(-1);

	for (var j = 0; j < n; j++) {
		p=0;
		var tabCell = tr.insertCell(-1);
		q = myObjs[col[j+n]].indexOf('~');
		tabCell.innerHTML = myObjs[col[j+n]].substring(p,q);		
		p=q+1;
		myObjs[col[j+n]] = myObjs[col[j+n]].substring(p,myObjs[col[j+n]].length);
	}
	}
	tr = table.insertRow(-1);

	for (var j = 0; j < n; j++) {
		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = myObjs[col[j+n]];//.substring(p,myObjs[col[j+n]].length);
	}
	}
	var divContainer = document.getElementById(divName);
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
}

CreateHorizTableFromJSON = function(myObjs, divName, styleAttr, styleValue) {
	var col = [];
	for ( var key in myObjs) {
		if (col.indexOf(key) === -1) {
			col.push(key);
		}
	}
	var table = document.createElement("table");
	table.setAttribute(styleAttr, styleValue );
	var tr = table.insertRow(-1);

	for (var i = 0; i < col.length; i++) {
		var th = document.createElement("th");
		th.innerHTML = col[i];
		tr.appendChild(th);
	}

	tr = table.insertRow(-1);

	for (var j = 0; j < col.length; j++) {
		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = myObjs[col[j]];
	}
	var divContainer = document.getElementById(divName);
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
}

CreateVertTableFromJSON = function(myObjs, divName, styleAttr, styleValue) {
	var col = [];
	var ref = ["incidentId","portfolioId","priority","summary","assigneeClass"];
	for ( var key in myObjs) {
		if(ref.indexOf(key)> -1){
		if (col.indexOf(key) === -1) {
			col.push(key);
		}
		}
	}
	var table = document.createElement("table");
	table.setAttribute(styleAttr, styleValue );
	var tr = table.insertRow(-1);
	
	head = ["Column","Value"];
	for(var i=0; i<head.length;i++){
		var th = document.createElement("th");
		th.innerHTML = head[i];
		tr.appendChild(th);
	}

	for(var j=0;j<col.length;j++){
		tr = table.insertRow(-1);	
		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = col[j];
		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = myObjs[col[j]];
	}

	var divContainer = document.getElementById(divName);
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
}