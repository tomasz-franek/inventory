package inventory.app.backend.repositories;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import inventory.app.backend.entities.StorageEntity;

public interface StorageRepository extends CrudRepository<StorageEntity,Long>,
    JpaSpecificationExecutor<StorageEntity> {

}
