package interfacedemo.model;

import java.util.ArrayList;
import java.util.List;

public class IncidentList {

	
	
	private List<Incident> incidents = new ArrayList<Incident>();

	public List<Incident> getIncidents() {
		return incidents;
	}

	public void setIncidents(List<Incident> incList) {
		this.incidents=incList;
	}

	public void printAll(){
		for (int i=0;i<incidents.size();i++){
			incidents.get(i).printAll();
		}
	}
}