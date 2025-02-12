package inventory.app.backend.repositories;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import inventory.app.backend.entities.UnitEntity;

public interface UnitRepository extends CrudRepository<UnitEntity,Long>,
    JpaSpecificationExecutor<UnitEntity> {

}
