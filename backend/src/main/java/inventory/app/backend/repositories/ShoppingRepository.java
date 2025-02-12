package inventory.app.backend.repositories;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import inventory.app.backend.entities.ShoppingEntity;

public interface ShoppingRepository extends CrudRepository<ShoppingEntity,Long>,
    JpaSpecificationExecutor<ShoppingEntity> {

}
