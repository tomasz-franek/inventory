package inventory.app.backend.repositories;

import inventory.app.backend.entities.ItemEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ItemRepository extends CrudRepository<ItemEntity,Long>,
    JpaSpecificationExecutor<ItemEntity> {


    @Query("SELECT i " +
            "FROM ItemEntity i " +
            "JOIN FETCH i.storage s " +
            "JOIN FETCH s.product p " +
            "WHERE i.inventory IS NULL ")
    List<ItemEntity> itemsWithoutInventory();
}
