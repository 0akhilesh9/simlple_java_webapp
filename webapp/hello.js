 window.onload = function(){ 
	 init();
 };

var app = angular.module('interfacetest', []);
app.controller('myCtrl1', function($scope, $http) {

	var evaluate = function(testId) {
		//'http://localhost/Interfacedemo/interface/getTicketData'		
		$http.post('http://'+props.host+'/Interfacedemo/interface/getTicketData',
				testId).then(function(response) {
			$scope.json = response.data;		
			CreateVertTableFromJSON($scope.json,"ticketDetails",'id','table-style');
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
});

app.controller('myCtrl', function($scope, $http) {
	$scope.perform = function() {
		//$http.get('http://localhost/interfacedemo/interface/getTicket/{testid}')
		$http.post('http://'+props.host+'/Interfacedemo/interface/getTicketPrediction',
				$scope.testid).then(function(response) {
			$scope.json = response.data;
			CreateHorizTableFromJSON($scope.json[1],"predictionData",'id','table-style');
			CreateVertTableFromJSON($scope.json[0],"ticketDetails",'id','table-style');
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
