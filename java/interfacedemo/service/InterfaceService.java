package interfacedemo.service;

import interfacedemo.dao.InterfaceDAO;
import interfacedemo.model.Incident_db;
import interfacedemo.model.TestIncident;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("countryService")
public class InterfaceService {

	@Autowired
	InterfaceDAO interfaceDao;

	@Transactional
	public TestIncident getTestIncidentTicket(long id) {
		return interfaceDao.getTestIncident(id);
	}

	@Transactional
	public List<Long> getTestIds() {
		return interfaceDao.getTestIds();
	}
	
	@Transactional
	public Incident_db getIncidentTicket(long key) {
		return interfaceDao.getIncident(key);
	}
	
	@Transactional
	public List<Long> getIncidentKeys() {
		return interfaceDao.getIncidentKeys();
	}
}
