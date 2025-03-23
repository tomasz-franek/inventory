package inventory.app.backend.repositories;

import inventory.app.api.model.ExpiredReportData;
import inventory.app.api.model.InventoryReportData;
import inventory.app.api.model.LastUsedData;
import inventory.app.api.model.NextDayExpiredData;
import inventory.app.api.model.PriceCategoryData;
import inventory.app.api.model.PurchasesData;
import inventory.app.backend.entities.StorageEntity;
import inventory.app.backend.utils.DataRowElement;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface StorageRepository extends CrudRepository<StorageEntity,Long>,
    JpaSpecificationExecutor<StorageEntity> {

    @Query("SELECT new inventory.app.api.model.InventoryReportData( p.id, CAST(count(i.id) AS INTEGER), p.name, s.validDate) " +
            "FROM StorageEntity s " +
            "JOIN s.product p " +
            "JOIN s.itemsList i " +
            "WHERE s.endDate is NULL " +
            "AND i.endDate is NULL " +
            "AND (i.inventory.id = :idInventory OR :idInventory is NULL ) " +
            "GROUP BY p.id, p.name, s.validDate " +
            "ORDER BY p.name, s.validDate ")
    List<InventoryReportData> getInventoryReportData(@Param("idInventory") Long idInventory);

    @Query("SELECT new inventory.app.api.model.ExpiredReportData(" +
            "   p.id," +
            "   p.name," +
            "   s.validDate," +
            "   CAST(count(i.id) AS Integer)," +
            "   null" +
            ") " +
            "FROM StorageEntity s " +
            "JOIN s.product p " +
            "JOIN s.itemsList i " +
            "WHERE s.endDate IS NULL " +
            "AND (:idInventory IS NULL OR i.inventory.id = :idInventory) " +
            "AND i.endDate IS NULL " +
            "AND s.validDate < now() " +
            "GROUP BY p.id, p.name, s.validDate " +
            "ORDER BY p.name, s.validDate")
    List<ExpiredReportData> getExpiredInventoryReportData(@Param("idInventory") Long idInventory);

    @Query("SELECT new inventory.app.api.model.LastUsedData(" +
            "   i.endDate," +
            "   p.id," +
            "   p.name " +
            ")" +
            "FROM ItemEntity i " +
            "JOIN i.storage s " +
            "JOIN s.product p " +
            "WHERE i.endDate IS NOT NULL " +
            "AND (:idInventory IS NULL OR i.inventory.id = :idInventory)")
    List<LastUsedData> getLastUsedInventoryReportData(@Param("idInventory") Long idInventory, Pageable pageable);

    @Query("SELECT new inventory.app.api.model.NextDayExpiredData(" +
            "   p.id, " +
            "   p.name, " +
            "   inv.name, " +
            "   i.validDate, " +
            "   i.used " +
            ") " +
            "FROM ItemEntity i " +
            "JOIN i.storage s " +
            "JOIN s.product p " +
            "LEFT JOIN i.inventory inv " +
            "WHERE i.endDate IS NULL " +
            "AND i.validDate between now() and :endDate " +
            "ORDER BY i.validDate")
    List<NextDayExpiredData> getNextDaysExpired(@Param("endDate") LocalDate endDate);

    @Query("SELECT new inventory.app.api.model.PriceCategoryData(" +
            "   c.id, " +
            "   c.name, " +
            "   cast ( (sum(round(s.items * s.price * (100 - s.used) * 0.01, 2)))  AS BigDecimal ) " +
            ") " +
            "FROM StorageEntity s " +
            "JOIN s.product p " +
            "JOIN p.category c " +
            "WHERE s.used < 100 " +
            "AND s.price > 0 " +
            "GROUP BY c.id, c.name ")
    List<PriceCategoryData> getSumPricesByCategory();

    @Query("SELECT new inventory.app.api.model.PurchasesData(" +
            "   s.insertDate, " +
            "   p.name, " +
            "   s.items, " +
            "   s.price, " +
            "   cast (( s.items * s.price ) as BigDecimal ), " +
            "   s.id " +
            ") " +
            "FROM StorageEntity s " +
            "JOIN s.product p " +
            "WHERE s.insertDate > :endDate ")
    List<PurchasesData> getListRecentPurchases(@Param("endDate") LocalDate endDate);

    @Query("SELECT new inventory.app.backend.utils.DataRowElement(" +
            "   p.id, " +
            "   p.category.id, " +
            "   p.name, " +
            "   s.validDate, " +
            "   count(i.storage.id) " +
            ") " +
            "FROM ItemEntity i " +
            "JOIN i.storage s " +
            "JOIN s.product p " +
            "WHERE s.endDate IS NULL " +
            "AND i.endDate IS NULL " +
            "GROUP BY p.id, p.name, s.validDate " +
            "ORDER BY p.name, s.validDate")
    List<DataRowElement> getValidInventoryReport();

    @Query("SELECT new inventory.app.backend.utils.DataRowElement(" +
            "   p.id, " +
            "   null, " +
            "   p.name, " +
            "   s.validDate, " +
            "   count(i.id) " +
            ") " +
            "FROM ItemEntity i " +
            "JOIN i.storage s " +
            "JOIN s.product p " +
            "WHERE s.endDate IS NULL " +
            "AND i.endDate IS NULL " +
            "AND s.validDate < now() " +
            "GROUP BY p.id, p.name, s.validDate " +
            "ORDER BY p.name, s.validDate")
    List<DataRowElement> getExpiredProducts();


    @Query("SELECT new inventory.app.backend.utils.DataRowElement(" +
            "   p.id, " +
            "   null, " +
            "   p.name, " +
            "   s.validDate, " +
            "   count(i.id) " +
            ") " +
            "FROM ItemEntity i " +
            "JOIN i.storage s " +
            "JOIN s.product p " +
            "WHERE s.endDate IS NULL " +
            "AND i.endDate IS NULL " +
            "GROUP BY p.id, p.name, s.validDate " +
            "ORDER BY p.name, s.validDate")
    List<DataRowElement> getInventoryReportData();
}
