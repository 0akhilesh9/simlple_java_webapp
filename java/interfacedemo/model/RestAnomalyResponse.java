package interfacedemo.model;

public class RestAnomalyResponse {
	private String reqIncidentId;
	private long reqPortfolioId;
	private String reqSummary;
	private String reqActualResolution;
	private String matchIncidentIdList;
	private String matchSummaryList;
	private String matchResolutionList;
	private String matchPercentageList;

	public RestAnomalyResponse() {

	}

	public RestAnomalyResponse(Incident i) {
		reqIncidentId = i.getIncidentId();
		reqPortfolioId = i.getPortfolioId();
		reqSummary = i.getSummary();
		reqActualResolution = i.getResolution();
		matchIncidentIdList = "INC1~INC2~INC3";
		matchSummaryList = "summary1~summary2~summary3";
		matchResolutionList = "res1~res2~res3";
		matchPercentageList = "0.2~0.8~0.4";
	}

	public String getReqIncidentId() {
		return reqIncidentId;
	}

	public void setReqIncidentId(String reqIncidentId) {
		this.reqIncidentId = reqIncidentId;
	}

	public long getReqPortfolioId() {
		return reqPortfolioId;
	}

	public void setReqPortfolioId(long reqPortfolioId) {
		this.reqPortfolioId = reqPortfolioId;
	}

	public String getReqSummary() {
		return reqSummary;
	}

	public void setReqSummary(String reqSummary) {
		this.reqSummary = reqSummary;
	}

	public String getReqActualResolution() {
		return reqActualResolution;
	}

	public void setReqActualResolution(String reqActualResolution) {
		this.reqActualResolution = reqActualResolution;
	}

	public String getMatchIncidentIdList() {
		return matchIncidentIdList;
	}

	public void setMatchIncidentIdList(String matchIncidentIdString) {
		this.matchIncidentIdList = matchIncidentIdString;
	}

	public String getMatchSummaryList() {
		return matchSummaryList;
	}

	public void setMatchSummaryList(String matchSummaryString) {
		this.matchSummaryList = matchSummaryString;
	}

	public String getMatchResolutionList() {
		return matchResolutionList;
	}

	public void setMatchResolutionList(String matchResolutionString) {
		this.matchResolutionList = matchResolutionString;
	}

	public String getMatchPercentageList() {
		return matchPercentageList;
	}

	public void setMatchPercentageList(String matchPercentageString) {
		this.matchPercentageList = matchPercentageString;
	}
}
