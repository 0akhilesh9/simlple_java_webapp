package interfacedemo.model;

public class RestResponse {
	private String incidentId;
	private long portfolioId;
	private long incidentKey;
	private String assigneeClass1;
	private Double assigneeClass1Probability;
	private String priority1;
	private Double priority1Probability;
	private String assigneeClass2;
	private Double assigneeClass2Probability;
	private String priority2;
	private Double priority2Probability;
	private String assigneeClass3;
	private Double assigneeClass3Probability;
	private String priority3;	
	private Double priority3Probability;
		
	public RestResponse() {

	}
	public void printAll() {
		System.out.println("Incident ID: " + incidentId);
		System.out.println("Portfolio ID: " + portfolioId);
		System.out.println(assigneeClass1);
		System.out.println(assigneeClass2);
		System.out.println(assigneeClass3);
		System.out.println(priority1);
		System.out.println(priority2);
		System.out.println(priority3);
		System.out.println(assigneeClass1Probability);
		System.out.println(assigneeClass2Probability);
		System.out.println(assigneeClass3Probability);
		System.out.println(priority1Probability);
		System.out.println(priority2Probability);
		System.out.println(priority3Probability);
		System.out.println(incidentKey);
	}

	public RestResponse(Incident i) {
		incidentId = i.getIncidentId();
		portfolioId = i.getPortfolioId();
		assigneeClass1 = "AssigneeClass1";
		assigneeClass2 = "AssigneeClass2";
		assigneeClass3 = "AssigneeClass3";
		priority1 = "Priority1";
		priority2 = "Priority2";
		priority3 = "Priority3";
		assigneeClass1Probability = 0.1;
		assigneeClass2Probability = 0.2;
		assigneeClass3Probability = 0.3;
		priority1Probability = 0.1;
		priority2Probability = 0.2;
		priority3Probability = 0.3;
		incidentKey = 1;
	}

	public String getAssigneeClass1() {
		return assigneeClass1;
	}

	public void setAssigneeClass1(String assigneeClass1) {
		this.assigneeClass1 = assigneeClass1;
	}

	public Double getAssigneeClass1Probability() {
		return assigneeClass1Probability;
	}

	public void setAssigneeClass1Probability(Double assigneeClass1Probability) {
		this.assigneeClass1Probability = assigneeClass1Probability;
	}

	public String getPriority1() {
		return priority1;
	}

	public void setPriority1(String priority1) {
		this.priority1 = priority1;
	}

	public Double getPriority1Probability() {
		return priority1Probability;
	}

	public void setPriority1Probability(Double priority1Probability) {
		this.priority1Probability = priority1Probability;
	}

	public String getAssigneeClass2() {
		return assigneeClass2;
	}

	public void setAssigneeClass2(String assigneeClass2) {
		this.assigneeClass2 = assigneeClass2;
	}

	public Double getAssigneeClass2Probability() {
		return assigneeClass2Probability;
	}

	public void setAssigneeClass2Probability(Double assigneeClass2Probability) {
		this.assigneeClass2Probability = assigneeClass2Probability;
	}

	public String getPriority2() {
		return priority2;
	}

	public void setPriority2(String priority2) {
		this.priority2 = priority2;
	}

	public Double getPriority2Probability() {
		return priority2Probability;
	}

	public void setPriority2Probability(Double priority2Probability) {
		this.priority2Probability = priority2Probability;
	}

	public String getAssigneeClass3() {
		return assigneeClass3;
	}

	public void setAssigneeClass3(String assigneeClass3) {
		this.assigneeClass3 = assigneeClass3;
	}

	public Double getAssigneeClass3Probability() {
		return assigneeClass3Probability;
	}

	public void setAssigneeClass3Probability(Double assigneeClass3Probability) {
		this.assigneeClass3Probability = assigneeClass3Probability;
	}

	public String getPriority3() {
		return priority3;
	}

	public void setPriority3(String priority3) {
		this.priority3 = priority3;
	}

	public Double getPriority3Probability() {
		return priority3Probability;
	}

	public void setPriority3Probability(Double priority3Probability) {
		this.priority3Probability = priority3Probability;
	}

	public String getIncidentId() {
		return incidentId;
	}

	public void setIncidentId(String incidentId) {
		this.incidentId = incidentId;
	}

	public long getPortfolioId() {
		return portfolioId;
	}

	public void setPortfolioId(long portfolioId) {
		this.portfolioId = portfolioId;
	}

	public long getIncidentKey() {
		return incidentKey;
	}

	public void setIncidentKey(long incidentKey) {
		this.incidentKey = incidentKey;
	}


}
