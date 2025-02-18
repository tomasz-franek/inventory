package inventory.app.backend.repositories;

import inventory.app.backend.entities.PropertyEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PropertyRepository extends CrudRepository<PropertyEntity, Long>,
        JpaSpecificationExecutor<PropertyEntity> {

    Optional<PropertyEntity> findByIdUser(Long idUser);
}
