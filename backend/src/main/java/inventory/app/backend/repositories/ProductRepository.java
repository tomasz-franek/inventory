package inventory.app.backend.repositories;

import inventory.app.api.model.ProductPrice;
import inventory.app.api.model.ProductPriceHistoryData;
import inventory.app.backend.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends CrudRepository<ProductEntity,Long>,
    JpaSpecificationExecutor<ProductEntity> {

    @Query("SELECT new inventory.app.api.model.ProductPriceHistoryData(" +
            "   s.price, " +
            "   s.insertDate " +
            ") " +
            "FROM StorageEntity s " +
            "JOIN s.product p " +
            "WHERE p.id = :idProduct " +
            "ORDER BY s.insertDate, s.price ")
    List<ProductPriceHistoryData> getProductPriceHistory(@Param("idProduct") Long idProduct);

    @Query("SELECT new inventory.app.api.model.ProductPrice(" +
            "   p.id, " +
            "   CAST(max(s.price) AS BigDecimal), " +
            "   CAST(min(s.price) AS BigDecimal), " +
            "   CAST((SELECT smax.price FROM StorageEntity smax WHERE smax.product.id = :idProduct ORDER BY smax.insertDate LIMIT 1 ) AS BigDecimal),  " +
            "   CAST( round(avg(s.price), 4) AS BigDecimal) " +
            ") " +
            "FROM StorageEntity s " +
            "JOIN s.product p " +
            "WHERE p.id = :idProduct " +
            "AND s.endDate IS NULL " +
            "AND s.price > 0.0" +
            "GROUP BY p.id ")
    ProductPrice getProductPrice(@Param("idProduct") Long idProduct);
}
