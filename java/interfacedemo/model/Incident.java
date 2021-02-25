package interfacedemo.model;

import java.sql.Timestamp;

public class Incident  {

	private String incidentId;
	private long portfolioId;
	private String assigneeClass;
	private String incidentType;
	private String category;
	private String subCategory;
	private String applicationName;
	private Timestamp submitDate;
	private Timestamp closedDate;
	private Timestamp lastModifiedDate;
	private String status;
	private String priority;
	private String summary;
	private String notes;
	private String resolution;

	public void printAll() {
		System.out.println("Incident ID: " + incidentId);
		System.out.println("Portfolio ID: " + portfolioId);
		System.out.println(assigneeClass);
		System.out.println(incidentType);
		System.out.println(category);
		System.out.println(subCategory);
		System.out.println(applicationName);
		System.out.println(submitDate);
		System.out.println(closedDate);
		System.out.println(lastModifiedDate);
		System.out.println(status);
		System.out.println(priority);
		System.out.println(summary);
		System.out.println(notes);
		System.out.println(resolution);
	}



	public Incident() {

	}

	public Incident(TestIncident c) {
		incidentId = c.incident_id;
		portfolioId = c.portfolio_id;
		assigneeClass = c.assignee_class;
		incidentType = c.incident_type;
		category = c.category;
		subCategory = c.sub_category;
		applicationName = c.application_name;
		submitDate = c.submit_date;
		closedDate = c.closed_date;
		lastModifiedDate = c.last_modified_date;
		status = c.status;
		priority = c.priority;
		summary = c.summary;
		notes = c.notes;
		resolution = c.resolution;
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

	public String getAssigneeClass() {
		return assigneeClass;
	}

	public void setAssigneeClass(String assigneeClass) {
		this.assigneeClass = assigneeClass;
	}

	public String getIncidentType() {
		return incidentType;
	}

	public void setIncidentType(String incidentType) {
		this.incidentType = incidentType;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}

	public String getApplicationName() {
		return applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	public Timestamp getSubmitDate() {
		return submitDate;
	}

	public void setSubmitDate(Timestamp submitDate) {
		this.submitDate = submitDate;
	}

	public Timestamp getClosedDate() {
		return closedDate;
	}

	public void setClosedDate(Timestamp closedDate) {
		this.closedDate = closedDate;
	}

	public Timestamp getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Timestamp lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getResolution() {
		return resolution;
	}

	public void setResolution(String resolution) {
		this.resolution = resolution;
	}

}