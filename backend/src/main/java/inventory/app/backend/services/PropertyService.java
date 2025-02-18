package inventory.app.backend.services;

import inventory.app.api.model.Property;

public interface PropertyService {

    Property getPropertyByUserId(Long idUser);
}
