package inventory.app.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import inventory.app.api.UnitsApi;
import inventory.app.api.model.Unit;
import inventory.app.api.model.UnitDefault;
import inventory.app.backend.services.UnitDefaultService;
import inventory.app.backend.services.UnitService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class UnitController implements UnitsApi {

    private final UnitService unitService;

    private final UnitDefaultService unitDefaultService;

    @Override
    public ResponseEntity<List<UnitDefault>> getAllUnitDefaults() {
        return ResponseEntity.ok(unitDefaultService.findAll());
    }

    @Override
    public ResponseEntity<List<Unit>> getAllUnits() {
        return ResponseEntity.ok(unitService.findAll());
    }

    @Override
    public ResponseEntity<Unit> getUnit(Long unitId) {
        return ResponseEntity.ok(unitService.get(unitId));
    }
}
