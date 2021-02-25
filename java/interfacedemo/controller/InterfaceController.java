package interfacedemo.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import interfacedemo.model.TestIncident;
import interfacedemo.model.Incident;
import interfacedemo.model.IncidentList;
import interfacedemo.model.RestAnomalyResponse;
import interfacedemo.model.RestResponse;
import interfacedemo.model.RestResponseList;
import interfacedemo.service.InterfaceService;
import interfacedemo.utility.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class InterfaceController {

	public InterfaceController() throws IOException {
		System.out.println("################################");
		new Utility().utilityDesc();
	}

	@Autowired
	InterfaceService interfaceService;

	@RequestMapping(value = "/getTicketData", method = RequestMethod.POST)
	public TestIncident getTicketDataById(@RequestBody Long id) {
		return interfaceService.getTestIncidentTicket(id);
	}

	@RequestMapping(value = "/getTestIds", method = RequestMethod.GET, headers = "Accept=application/json")
	public List<Long> getTestIds() throws IOException {
		return interfaceService.getTestIds();
	}

	@RequestMapping(value = "/getIncidentKeys", method = RequestMethod.GET, headers = "Accept=application/json")
	public List<Long> getIncidentKeys() {
		return interfaceService.getIncidentKeys();
	}
	
	/*
	 * @RequestMapping(value = "/getTicket", method = RequestMethod.GET) public
	 * RestResponse getTicketById(@RequestParam(value="id") long id) { Incident
	 * inc = new Incident(countryService.getCountry(id)); RestTemplate
	 * restTemplate = new RestTemplate(); String url =
	 * "http://localhost:8080/interfacedemo/interface/testRest"; //String url =
	 * "http://localhost:8080/Classifier/classify"; RestResponse result= new
	 * RestResponse(); try { result = restTemplate.postForObject(url,inc,
	 * RestResponse.class); } catch(Exception e) { e.printStackTrace();
	 * System.out.println("error occured"); } return result; }
	 */

	@RequestMapping(value = "/getTicketDataForm", method = { RequestMethod.POST })
	public List<Object> getTicketPredictionfromForm(@RequestBody Incident incident) {
		RestTemplate restTemplate = new RestTemplate();
		String url = Utility.prop.getProperty("predictionTestUrl");
		// String url = "http://localhost:8080/Classifier/classify";
		// String url = "http://10.177.120.69:8080/Classifier/classify";
		RestResponse result = new RestResponse();
		try {
			result = restTemplate.postForObject(url, incident, RestResponse.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<Object> res = new ArrayList<Object>();
		res.add(incident);
		res.add(result);
		return res;
	}

	@RequestMapping(value = "/getTicketPrediction", method = { RequestMethod.POST })
	public List<Object> getTicketPredictionById(HttpServletRequest request, @RequestBody Long id) {
		Incident inc = new Incident(interfaceService.getTestIncidentTicket(id));
		RestTemplate restTemplate = new RestTemplate();
		String url = Utility.prop.getProperty("predictionTestUrl");
		// String url = "http://localhost:8080/Classifier/classify";
		// String url = "http://10.177.120.69:8080/Classifier/classify";

		RestResponse result = new RestResponse();
		try {		
			result = restTemplate.postForObject(url, inc, RestResponse.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<Object> res = new ArrayList<Object>();
		res.add(inc);
		res.add(result);
		return res;
	}

	@RequestMapping(value = "/testRest", method = RequestMethod.POST, headers = "Accept=application/json")
	public RestResponse testResponse(@RequestBody Incident incident) {
		return (new RestResponse(incident));
	}

	@RequestMapping(value = "/getAnomalyDataForm", method = { RequestMethod.POST })
	public List<Object> getAnomalyPredictionfromForm(@RequestBody Incident incident) throws IOException {
		RestTemplate restTemplate = new RestTemplate();
		String url = Utility.prop.getProperty("anomalyTestUrl");
		// String url = "http://localhost:8080/Classifier/classify";
		// String url = "http://10.177.120.69:8080/Classifier/classify";

		RestAnomalyResponse result = new RestAnomalyResponse();
		try {
			result = restTemplate.postForObject(url, incident, RestAnomalyResponse.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<Object> res = new ArrayList<Object>();
		res.add(incident);
		res.add(result);
		return res;
	}

	@RequestMapping(value = "/getAnomalyDetection", method = { RequestMethod.POST })
	public List<Object> getAnomalyDetectionById(HttpServletRequest request, @RequestBody Long id) {
		Incident inc = new Incident(interfaceService.getTestIncidentTicket(id));
		RestTemplate restTemplate = new RestTemplate();
		String url = Utility.prop.getProperty("anomalyTestUrl");
		// String url = "http://localhost:8080/Classifier/classify";
		// String url = "http://10.177.120.69:8080/Classifier/classify";

		RestAnomalyResponse result = new RestAnomalyResponse();
		try {
			result = restTemplate.postForObject(url, inc, RestAnomalyResponse.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<Object> res = new ArrayList<Object>();
		res.add(inc);
		res.add(result);
		return res;
	}

	
	@RequestMapping(value = "/testRestAnomaly", method = RequestMethod.POST, headers = "Accept=application/json")
	public RestAnomalyResponse testResponseAnomaly(@RequestBody Incident incident) {
		return (new RestAnomalyResponse(incident));
	}

	@RequestMapping(value = "/getMultiTicketPrediction", method = { RequestMethod.POST })
	public List<Object> getMultiTicketPredictionById(HttpServletRequest request, @RequestBody String idList) {
		String[] idArray=idList.split("~~~~");
		IncidentList incClassList = new IncidentList ();
		List<Incident> incList = new ArrayList<Incident>();
		for(int i=0;i<idArray.length;i++){
			if(idArray[i].isEmpty()){
				continue;
			}				
		incList.add(new Incident(interfaceService.getTestIncidentTicket(Long.parseLong(idArray[i]))));
		}
		incClassList.setIncidents(incList);
		RestTemplate restTemplate = new RestTemplate();
		String url = Utility.prop.getProperty("multiPredictionTestUrl");
		// String url = "http://localhost:8080/Classifier/classify";
		// String url = "http://10.177.120.69:8080/Classifier/classify";
		List<RestResponse> result = new ArrayList<RestResponse>();
		//List<RestResponse> result = new ArrayList<RestResponse>();
	
		try {
			result =  restTemplate.postForObject(url, incClassList, List.class);		
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<Object> res = new ArrayList<Object>();
		res.add(result);
		return res;
	}

	@RequestMapping(value = "/testMultiRestPrediction", method = RequestMethod.POST, headers = "Accept=application/json")
	public List<RestResponse> testMultiPrediction(@RequestBody IncidentList incClassList) {
		List<RestResponse> resList = new ArrayList<RestResponse>();
		List<Incident> incList = incClassList.getIncidents();
		for(int i=0;i<incList.size();i++){
			resList.add(new RestResponse(incList.get(i)));
		}
			 //RestResponseList resClassList = new RestResponseList();
			 //resClassList.setResponses(resList);
		
		return resList;
	}
	
	@RequestMapping(value = "/testMultiRestPrediction1", method = RequestMethod.POST, headers = "Accept=application/json")
	public RestResponseList testMultiPrediction1(@RequestBody IncidentList incClassList) {
		List<RestResponse> resList = new ArrayList<RestResponse>();
		List<Incident> incList = incClassList.getIncidents();
		for(int i=0;i<incList.size();i++){
			resList.add(new RestResponse(incList.get(i)));
		}
			 RestResponseList resClassList = new RestResponseList();
			 resClassList.setResponses(resList);
		
		return resClassList;
	}
	
	// @RequestMapping(value = "/addCountry", method = RequestMethod.POST,
	// headers = "Accept=application/json")
	// public void addCountry(@RequestBody Country country) {
	// countryService.addCountry(country);
	//
	// }
	//
	// @RequestMapping(value = "/updateCountry", method = RequestMethod.PUT,
	// headers = "Accept=application/json")
	// public void updateCountry(@RequestBody Country country) {
	// countryService.updateCountry(country);
	// }

	// @RequestMapping(value = "/getTicket", method = RequestMethod.POST,
	// headers = "Accept=application/json")
	// public void getTicket(@RequestBody String testId) {
	// System.out.println("Received Test ID : "+testId);
	//
	// }
}
