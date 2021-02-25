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
			CreateVertTableFromJSON($scope.json,"ticketDetails",'class','tab-style1');
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
			table.setAttribute("ondrop","drop(event)");
			table.setAttribute("ondragover","allowDrop(event)");
			var tr = table.insertRow(-1);		
				var th = document.createElement("th");
				th.innerHTML = "Test ID";
				tr.appendChild(th);		
				for (var j = 0; j < json.length; j++) {	
				tr = table.insertRow(-1);
				var tabCell = tr.insertCell(-1);			
				tabCell.setAttribute("draggable","true");
				tabCell.setAttribute("ondragstart","drag(event)");
				tabCell.setAttribute("id",json[j]);
				tabCell.innerHTML = json[j];
			}
			var divContainer = document.getElementById("testIds");
			divContainer.innerHTML = "";
			divContainer.appendChild(table);			
			
			var table = document.getElementById("tab-style");
		    var rows = table.getElementsByTagName("tr");
		    
		    for (var i = 1; i < rows.length; i++) {
		        var currentRow = table.rows[i];	            
		        currentRow.onclick = createClickHandler(currentRow);
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
	
	var createClickHandler = 
        function(row) 
        {
            return function() { 			                			
            						if(row.getElementsByTagName("td")[0].classList.contains("dragTableCell")){
            							row.getElementsByTagName("td")[0].classList.remove("dragTableCell");
            						}
            						else{
            						row.getElementsByTagName("td")[0].setAttribute("class","dragTableCell");
            						}
            						evaluate(row.getElementsByTagName("td")[0].innerHTML);
                             };
        };
	
	allowDrop = function(evn){
		evn.preventDefault();
	}
	drag = function (ev) {	
		var elem = document.getElementsByClassName("dragTableCell");
		var transferData="";
		for(i=0;i<elem.length;i++){
			transferData+=elem[i].id+"~~~~";
		}
	    ev.dataTransfer.setData("text", transferData);
	}
	drop = function(evn){
		var receiveData = evn.dataTransfer.getData("text").split("~~~~");
		for(var i=0;i<receiveData.length;i++){
			if(receiveData[i].length>0){
				if(document.getElementById(receiveData[i]).classList.contains("dragTableCell")){
					document.getElementById(receiveData[i]).classList.remove("dragTableCell");
				}
			//evn.target.appendChild(document.getElementById(receiveData[i]));
				var celldata=document.getElementById(receiveData[i]);
				var rowdata = document.createElement('tr');
				rowdata.appendChild(celldata);
				rowdata.onclick = createClickHandler(rowdata);
				document.getElementById("tab-style").appendChild(rowdata);
			}
		}
	}
	init();
});

app.controller('myCtrl', function($scope, $http) {
	$scope.performMany=function(){
		var reqData="~~~~";
		var tabCells = document.getElementById("tab-style1").getElementsByTagName("td");		
		for(var i=0;i<document.getElementById("tab-style1").getElementsByTagName("td").length;i++){
			reqData+=document.getElementById("tab-style1").getElementsByTagName("td")[i].innerHTML + "~~~~";
		}
		$scope.performManyOperation(reqData);
	}
	$scope.performManyOperation = function(reqData) {	
		$http.post('http://'+props.host+'/Interfacedemo/interface/getMultiTicketPrediction',
				reqData).then(function(response) {
			$scope.json = response.data;	
			//CreateVertTableFromJSON($scope.json[0],"ticketDetails",'class','tab-style1');
			CreateHorizTableFromMultiJSONPrediction($scope.json[0],"predictionData",'id','table-style');
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
	
	$scope.validMany = function(){
		var flagMany = false;
		if(document.getElementById("tab-style1").getElementsByTagName("td").length>0){			
			flagMany = true;
		}
		return flagMany;
	}

	allowDrop2 = function(evn){
		evn.preventDefault();
	}
	drag2 = function (ev) {	
		var elem = document.getElementsByClassName("dragTableCell");
		var transferData="";
		for(i=0;i<elem.length;i++){
			transferData+=elem[i].id+"~~~~";
		}
	    ev.dataTransfer.setData("text", transferData);
	}
	drop2 = function(evn){
		var receiveData = evn.dataTransfer.getData("text").split("~~~~");
		for(var i=0;i<receiveData.length;i++){
			if(receiveData[i].length>0){
			if(document.getElementById(receiveData[i]).classList.contains("dragTableCell")){
				document.getElementById(receiveData[i]).classList.remove("dragTableCell");
			}
			var celldata=document.getElementById(receiveData[i]);
			var rowdata = document.createElement('tr');
			rowdata.appendChild(celldata);
			rowdata.onclick = createDragClickHandler1(rowdata);
			document.getElementById("tab-style1").appendChild(rowdata);
			}
		}
		 $scope.$apply();
	}
	var evaluate1 = function(testId) {
        angular.element(document.getElementById("testid")).scope().testid= testId;
		document.getElementById("testid").focus();
		//'http://localhost/Interfacedemo/interface/getTicketData'		
		$http.post('http://'+props.host+'/Interfacedemo/interface/getTicketData',
				testId).then(function(response) {
			$scope.json = response.data;		
			document.getElementById("ticketDetailsDiv").setAttribute('class','ticketDetailsClass');
			CreateVertTableFromJSON($scope.json,"ticketDetails",'class','tab-style1');
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
	var createDragClickHandler1 = 
        function(row) 
        {
            return function() { 			                			
            						if(row.getElementsByTagName("td")[0].classList.contains("dragTableCell")){
            							row.getElementsByTagName("td")[0].classList.remove("dragTableCell");
            						}
            						else{
            						row.getElementsByTagName("td")[0].setAttribute("class","dragTableCell");
            						}
            						evaluate1(row.getElementsByTagName("td")[0].innerHTML);
                             };
        };

	$scope.perform = function() {
		//$http.get('http://localhost/interfacedemo/interface/getTicket/{testid}')
		if($scope.testid.indexOf("~~~~")>0){
			$scope.performManyOperation($scope.testid);
		}
		else{
		$http.post('http://'+props.host+'/Interfacedemo/interface/getTicketPrediction',
				$scope.testid).then(function(response) {
			$scope.json = response.data;
			CreateHorizTableFromJSON($scope.json[1],"predictionData",'id','table-style');
			CreateVertTableFromJSON($scope.json[0],"ticketDetails",'class','tab-style1');
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
	}
	
$scope.performAnomaly = function() {	
		$http.post('http://'+props.host+'/Interfacedemo/interface/getAnomalyDetection',
				$scope.testid).then(function(response) {
			$scope.json = response.data;	
			CreateVertTableFromJSON($scope.json[0],"ticketDetails",'class','tab-style1');
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
		if(col[j].search("date")>=0){
			tabCell.innerHTML = new Date(myObjs[col[j]]);
		}
		else{
			tabCell.innerHTML = myObjs[col[j]];
		}
	}

	var divContainer = document.getElementById(divName);
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
}

CreateHorizTableFromJSONAnomaly = function(myObjs, divName, styleAttr,styleValue) {
	var col = [];
	var n = 4;// to skip first four key value pairs
	for ( var key in myObjs) {
		if (col.indexOf(key) === -1) {
			col.push(key);
		}
	}
	var table = document.createElement("table");
	table.setAttribute(styleAttr, styleValue);
	var tr = table.insertRow(-1);

	for (var i = 0; i < n; i++) {
		var th = document.createElement("th");
		th.innerHTML = col[i + n];
		tr.appendChild(th);
	}

	/*
	 * tr = table.insertRow(-1); for (var j = 0; j < n; j++) { var tabCell =
	 * tr.insertCell(-1); tabCell.innerHTML = myObjs[col[j+n]]; }
	 */
	if (myObjs[col[n]] == null) {
		tr = table.insertRow(-1);
		for (var j = 0; j < n; j++) {
			var tabCell = tr.insertCell(-1);
			tabCell.innerHTML = myObjs[col[j + n]];// .substring(p,myObjs[col[j+n]].length);
		}
	} else if (myObjs[col[n]] != null) {
		var p = 0;
		var q = 0;
		while (myObjs[col[n]].indexOf('~') > 0) {

			tr = table.insertRow(-1);
			for (var j = 0; j < n; j++) {
				p = 0;
				var tabCell = tr.insertCell(-1);
				q = myObjs[col[j + n]].indexOf('~');
				tabCell.innerHTML = myObjs[col[j + n]].substring(p, q);
				p = q + 1;
				myObjs[col[j + n]] = myObjs[col[j + n]].substring(p,
						myObjs[col[j + n]].length);
			}
		}
		tr = table.insertRow(-1);

		for (var j = 0; j < n; j++) {
			var tabCell = tr.insertCell(-1);
			tabCell.innerHTML = myObjs[col[j + n]];// .substring(p,myObjs[col[j+n]].length);
		}
	}
	var divContainer = document.getElementById(divName);
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
}

CreateHorizTableFromMultiJSONPrediction = function(myObjs, divName, styleAttr,styleValue) {
	var col = [];
	var headCount = 0;

	if (myObjs.length > 0) {
		for ( var key in myObjs[0]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
				headCount++;
			}
		}
		var table = document.createElement("table");
		table.setAttribute(styleAttr, styleValue);
		var tr = table.insertRow(-1);

		for (var i = 0; i < headCount; i++) {
			var th = document.createElement("th");
			th.innerHTML = col[i];
			tr.appendChild(th);
		}

		for (var k = 0; k < myObjs.length; k++) {
			tr = table.insertRow(-1);
			for (var j = 0; j < headCount; j++) {
				var tabCell = tr.insertCell(-1);
				tabCell.innerHTML = myObjs[k][col[j]];
			}
		}

		var divContainer = document.getElementById(divName);
		divContainer.innerHTML = "";
		divContainer.appendChild(table);
	}
}