package interfacedemo.dao;

import java.util.List;

import interfacedemo.model.Incident_db;
import interfacedemo.model.TestIncident;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class InterfaceDAO {

	@Autowired
	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sf) {
		this.sessionFactory = sf;
	}

	public TestIncident getTestIncident(long id) {
		Session session = this.sessionFactory.getCurrentSession();
		TestIncident ti = (TestIncident) session.load(TestIncident.class, id);
		return ti;
	}

	public Incident_db getIncident(long key){
		Session session = this.sessionFactory.getCurrentSession();
		Incident_db idb = (Incident_db) session.load(Incident_db.class, key);
		return idb;
	}
	
	public List<Long> getTestIds() {
		Session session = this.sessionFactory.getCurrentSession();
		List<Long> result = session.createQuery("select test_id from TestIncident test ").list();
		return result;
	}
	
	public List<Long> getIncidentKeys() {
		Session session = this.sessionFactory.getCurrentSession();
		List<Long> result = session.createQuery("select incident_key from Incident_db idb ").list();
		return result;
	}
	
}
