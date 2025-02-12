package inventory.app.backend.repositories;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import inventory.app.backend.entities.ItemEntity;

public interface ItemRepository extends CrudRepository<ItemEntity,Long>,
    JpaSpecificationExecutor<ItemEntity> {

}
