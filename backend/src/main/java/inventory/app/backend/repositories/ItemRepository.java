package inventory.app.backend.repositories;

import inventory.app.api.model.ConsumeProduct;
import inventory.app.api.model.StorageValueHistoryData;
import inventory.app.backend.entities.ItemEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends CrudRepository<ItemEntity,Long>,
    JpaSpecificationExecutor<ItemEntity> {


    @Query("SELECT i " +
            "FROM ItemEntity i " +
            "JOIN FETCH i.storage s " +
            "JOIN FETCH s.product p " +
            "WHERE i.inventory.id IS NULL ")
    List<ItemEntity> itemsWithoutInventory();

    @Query("SELECT new inventory.app.api.model.ConsumeProduct(" +
            "   i.id," +
            "   p.id," +
            "   i.validDate," +
            "   i.endDate," +
            "   i.insertDate," +
            "   p.name," +
            "   in.name," +
            "   i.used," +
            "   s.price) " +
            "FROM ItemEntity i " +
            "JOIN i.storage s " +
            "JOIN s.product p " +
            "JOIN i.inventory in " +
            "WHERE (:idCategory IS NULL OR p.category.id = :idCategory)" +
            "AND (:idProduct IS NULL OR p.id = :idProduct)" +
            "AND (:idInventory IS NULL OR in.id = :idInventory)" +
            "AND i.endDate IS NULL " +
            "ORDER BY p.name ASC, i.used DESC, i.validDate ASC, i.insertDate ASC")
    List<ConsumeProduct> getConsumeProductListInventoryCategory(
            @Param("idInventory") Long idInventory,
            @Param("idCategory") Long idCategory,
            @Param("idProduct") Long idProduct);

    @Query("SELECT i " +
            "FROM ItemEntity i " +
            "JOIN FETCH i.storage s " +
            "JOIN FETCH s.product p " +
            "WHERE p.id =:idProduct ")
    List<ItemEntity> findByProductId(@Param("idProduct") Long idProduct);

    @Query("SELECT new inventory.app.api.model.StorageValueHistoryData (" +
            "   tx.price, " +
            "   tx.id, " +
            "   tx.insertDate " +
            ") " +
            "FROM ( " +
            "   SELECT s.price AS price, i.id as id, i.insertDate AS insertDate " +
            "   FROM ItemEntity i " +
            "   JOIN i.storage s " +
            "   JOIN s.product p " +
            "   WHERE " +
            "   (:idInventory IS NULL OR i.inventory.id = :idInventory) " +
            "   AND s.price > 0 " +

            "   UNION ALL " +

            "   SELECT -s.price, i.id, i.endDate " +
            "   FROM ItemEntity i " +
            "   JOIN i.storage s " +
            "   JOIN s.product p " +
            "   WHERE " +
            "   i.endDate IS NOT NULL " +
            "   AND (:idInventory IS NULL OR i.inventory.id = :idInventory) " +
            "   AND s.price > 0 " +

            "   UNION ALL " +

            "   SELECT -s.price * i.used * 0.01, i.id, now " +
            "   FROM ItemEntity i " +
            "   JOIN i.storage s " +
            "   JOIN s.product p " +
            "   WHERE " +
            "   (:idInventory IS NULL OR i.inventory.id = :idInventory) " +
            "   AND s.price > 0" +
            ") as tx ")
    List<StorageValueHistoryData> getStorageValueHistory(@Param("idInventory") Long idInventory);
}
