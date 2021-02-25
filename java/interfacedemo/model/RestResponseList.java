package interfacedemo.model;

import java.util.ArrayList;
import java.util.List;

public class RestResponseList {

	private List<RestResponse> responses = new ArrayList<RestResponse>();

	public List<RestResponse> getResponses() {
		return responses;
	}

	public void setResponses(List<RestResponse> responses) {
		this.responses = responses;
	}
	
}
