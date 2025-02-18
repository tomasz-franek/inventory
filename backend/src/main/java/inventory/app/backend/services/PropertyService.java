package inventory.app.backend.services;

import inventory.app.api.model.Property;
import inventory.app.backend.entities.PropertyEntity;

public interface PropertyService {

    Property getPropertyByUserId(Long idUser);
}
