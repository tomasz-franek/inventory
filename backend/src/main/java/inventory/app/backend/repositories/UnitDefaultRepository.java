package inventory.app.backend.repositories;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import inventory.app.backend.entities.UnitDefaultEntity;

public interface UnitDefaultRepository extends CrudRepository<UnitDefaultEntity,Long>,
    JpaSpecificationExecutor<UnitDefaultEntity> {

}
