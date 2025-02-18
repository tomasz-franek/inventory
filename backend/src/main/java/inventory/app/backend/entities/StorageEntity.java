package inventory.app.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "storage", schema = BaseEntity.SCHEMA_NAME)
public class StorageEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "storage_seq")
    @SequenceGenerator(name = "storage_seq", sequenceName = "storage_seq", schema = BaseEntity.SCHEMA_NAME, allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private UnitEntity unit;

    @Column(name = "items", nullable = false)
    private int items;

    @Column(name = "insert_date", nullable = false)
    private LocalDate insertDate;

    @Column(name = "valid_date")
    private LocalDate validDate;

    @Column(name = "count")
    private BigDecimal count;

    @Column(name = "used", nullable = false)
    private BigDecimal used;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "optlock", nullable = false)
    private Integer optLock;
}
