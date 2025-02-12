package inventory.app.backend.services;

import inventory.app.api.model.Unit;

import java.util.List;

public interface UnitService {
    List<Unit> findAll();

    Unit get(Long unitId);
    
}
