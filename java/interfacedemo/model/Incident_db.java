package interfacedemo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.Proxy;

@Entity
@Proxy(lazy = false)
@Table(name = "iap_ams_l2_incident")
public class Incident_db {
	@Id
	@Column(name = "incident_key")
	long incident_key;
	@Column(name = "portfolio_id")
	long portfolio_id;
	@Column(name = "incident_id")
	String incident_id;
	@Column(name = "assignee_class")
	String assignee_class;
	@Column(name = "incident_type")
	String incident_type;
	@Column(name = "category")
	String category;
	@Column(name = "sub_category")
	String sub_category;
	@Column(name = "application_name")
	String application_name;
	@Column(name = "status")
	String status;
	@Column(name = "priority")
	String priority;
	@Column(name = "summary")
	String summary;
	@Column(name = "notes")
	String notes;
	@Column(name = "resolution")
	String resolution;
	@Column(name = "active_model_id")
	long active_model_id;
	@Column(name = "submit_date")
	java.sql.Timestamp submit_date;
	@Column(name = "closed_date")
	java.sql.Timestamp closed_date;
	@Column(name = "last_modified_date")
	java.sql.Timestamp last_modified_date;

	public long getIncident_key() {
		return incident_key;
	}

	public void setIncident_key(long incident_key) {
		this.incident_key = incident_key;
	}

	public long getActive_model_id() {
		return active_model_id;
	}

	public void setActive_model_id(long active_model_id) {
		this.active_model_id = active_model_id;
	}

	public long getPortfolio_id() {
		return this.portfolio_id;
	}

	public void setPortfolio_id(long l) {
		this.portfolio_id = l;
	}

	public String getIncident_id() {
		return this.incident_id;
	}

	public void setIncident_id(String s) {
		this.incident_id = s;
	}

	public String getAssignee_class() {
		return this.assignee_class;
	}

	public void setAssignee_class(String s) {
		this.assignee_class = s;
	}

	public String getIncident_type() {
		return this.incident_type;
	}

	public void setIncident_type(String s) {
		this.incident_type = s;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String s) {
		this.category = s;
	}

	public String getSub_category() {
		return this.sub_category;
	}

	public void setSub_category(String s) {
		this.sub_category = s;
	}

	public String getApplication_name() {
		return this.application_name;
	}

	public void setApplication_name(String s) {
		this.application_name = s;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String s) {
		this.status = s;
	}

	public String getPriority() {
		return this.priority;
	}

	public void setPriority(String s) {
		this.priority = s;
	}

	public String getSummary() {
		return this.summary;
	}

	public void setSummary(String s) {
		this.summary = s;
	}

	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String s) {
		this.notes = s;
	}

	public String getResolution() {
		return this.resolution;
	}

	public void setResolution(String s) {
		this.resolution = s;
	}

	public java.sql.Timestamp getSubmit_date() {
		return this.submit_date;
	}

	public void setSubmit_date(java.sql.Timestamp d) {
		this.submit_date = d;
	}

	public java.sql.Timestamp getClosed_date() {
		return this.closed_date;
	}

	public void setClosed_date(java.sql.Timestamp d) {
		this.closed_date = d;
	}

	public java.sql.Timestamp getLast_modified_date() {
		return this.last_modified_date;
	}

	public void setLast_modified_date(java.sql.Timestamp d) {
		this.last_modified_date = d;
	}
}