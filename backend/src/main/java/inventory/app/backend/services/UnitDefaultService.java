package inventory.app.backend.services;

import inventory.app.api.model.UnitDefault;

import java.util.List;

public interface UnitDefaultService {
  List<UnitDefault> findAll();
}
