package inventory.app.backend.controllers;

import inventory.app.api.PropertiesApi;
import inventory.app.api.model.Property;
import inventory.app.backend.services.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class PropertyController implements PropertiesApi {
    private final PropertyService propertyService;

    @Override
    public ResponseEntity<Property> getProperty(Long userId) {
        return ResponseEntity.ok(propertyService.getPropertyByUserId(userId));
    }

    @Override
    public ResponseEntity<Void> updateProperty(Long userId, Property property) {
        propertyService.updateProperty(userId, property);
        return ResponseEntity.noContent().build();
    }
}
