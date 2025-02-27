package inventory.app.backend.repositories;

import inventory.app.api.model.InventoryReportData;
import inventory.app.backend.entities.StorageEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StorageRepository extends CrudRepository<StorageEntity,Long>,
    JpaSpecificationExecutor<StorageEntity> {

    @Query("SELECT new inventory.app.api.model.InventoryReportData( p.id, count(i.id), p.name, s.validDate) " +
            "FROM StorageEntity s " +
            "JOIN s.product p " +
            "JOIN s.itemsList i " +
            "WHERE s.endDate is NULL " +
            "AND i.endDate is NULL " +
            "AND (i.inventory.id = :idInventory OR :idInventory is NULL ) " +
            "GROUP BY p.id, p.name, s.validDate " +
            "ORDER BY p.name, s.validDate ")
    List<InventoryReportData> getInventoryReportData(@Param("idInventory") Long idInventory);
}
