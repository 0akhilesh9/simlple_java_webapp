var app = angular.module('interfacetest', []);
app.controller('myCtrl1', function($scope, $http) {

	var evaluate = function(testId) {
        angular.element(document.getElementById("testid")).scope().testid= testId;
		document.getElementById("testid").focus();
		//'http://localhost/Interfacedemo/interface/getTicketData'		
		$http.post('http://'+props.host+'/Interfacedemo/interface/getTicketData',
				testId).then(function(response) {
			$scope.json = response.data;		
			document.getElementById("ticketDetailsDiv").setAttribute('class','ticketDetailsClass');
			CreateVertTableFromJSON($scope.json,"ticketDetails",'id','tab-style');
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
	
	init = function(){
		$http.get('http://'+props.host+'/Interfacedemo/interface/getTestIds').then(function(response) {
			var json = response.data;
			var table = document.createElement("table");
			//table.setAttribute('class','table-scroll');
			table.setAttribute('id', 'tab-style' );
			var tr = table.insertRow(-1);		
				var th = document.createElement("th");
				th.innerHTML = "Test ID";
				tr.appendChild(th);		
			for (var j = 0; j < json.length; j++) {
				tr = table.insertRow(-1);
				var tabCell = tr.insertCell(-1);
				tabCell.innerHTML = json[j];
			}
			var divContainer = document.getElementById("testIds");
			divContainer.innerHTML = "";
			divContainer.appendChild(table);			
			
			var table = document.getElementById("tab-style");
		    var rows = table.getElementsByTagName("tr");
		    
		    for (i = 1; i < rows.length; i++) {
		        var currentRow = table.rows[i];
		        var createClickHandler = 
		            function(row) 
		            {
		                return function() { 
		                                        var cell = row.getElementsByTagName("td")[0];
		                                        var id = cell.innerHTML;
		                                        alert("id:" + id);
		                                 };
		            };
		            
		            var createClickHandler1 = 
			            function(row) 
			            {
			                return function() { 
			                                        evaluate(row);
			                                 };
			            };
		            
		            
		        currentRow.onclick = createClickHandler1(currentRow.getElementsByTagName("td")[0].innerHTML);
		    }
			
		}, function myError(response) {
			json = response.statusText;
			var divContainer = document.getElementById("testIds");		
			divContainer.innerHTML = "";
			var para = document.createElement("P");                       
			var t = document.createTextNode("Test Ids Cannot be Fetched");      
			para.style.color = 'red';
			para.setAttribute("class","error");
			para.appendChild(t); 
			divContainer.appendChild(para);
		});
	}
	init();
});


app.controller('myCtrl', function($scope, $http) {
	$scope.perform = function() {
		//$http.get('http://localhost/interfacedemo/interface/getTicket/{testid}')
		$http.post('http://'+props.host+'/Interfacedemo/interface/getTicketPrediction',
				$scope.testid).then(function(response) {
			$scope.json = response.data;
			CreateHorizTableFromJSON($scope.json[1],"predictionData",'id','table-style');
			CreateVertTableFromJSON($scope.json[0],"ticketDetails",'id','tab-style');
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
						
			divContainer = document.getElementById("predictionData");
			divContainer.innerHTML = "<span class='error'>Failed to get data</span>";
			para = document.createElement("P");                       
			t = document.createTextNode("Error Message : "+$scope.json);      
			para.style.color = 'red';
			para.appendChild(t); 
			divContainer.appendChild(para);
		});
	}
	
$scope.performAnomaly = function() {	
		$http.post('http://'+props.host+'/Interfacedemo/interface/getAnomalyDetection',
				$scope.testid).then(function(response) {
			$scope.json = response.data;	
			CreateVertTableFromJSON($scope.json[0],"ticketDetails",'id','tab-style');
			CreateHorizTableFromJSONAnomaly($scope.json[1],"predictionData",'id','table-style');
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

function getScope(ctrlName) {
	var sel = 'div[ng-controller="' + ctrlName + '"]';
	return angular.element(sel).scope();
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

	for ( var key in myObjs) {
		if (col.indexOf(key) === -1) {
			col.push(key);
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
	
	var divContainer = document.getElementById(divName);
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
}