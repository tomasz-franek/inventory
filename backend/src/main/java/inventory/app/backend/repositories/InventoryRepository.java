package inventory.app.backend.repositories;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import inventory.app.backend.entities.InventoryEntity;

public interface InventoryRepository extends CrudRepository<InventoryEntity, Long>,
        JpaSpecificationExecutor<InventoryEntity> {

}
