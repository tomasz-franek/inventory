package inventory.app.backend.services;

import inventory.app.api.model.ResponseId;
import inventory.app.api.model.Storage;

import java.util.List;

public interface StorageService {
    List<Storage> findAll();

    Storage get(Long storageId);

    void update(Long storageId, Storage storage);

    ResponseId save(Storage storage);
}
