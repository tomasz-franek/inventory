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
@Table(name = "item", schema = BaseEntity.SCHEMA_NAME)
public class ItemEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_seq")
    @SequenceGenerator(name = "item_seq", sequenceName = "item_seq", schema = BaseEntity.SCHEMA_NAME, allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "storage_id", nullable = false)
    private StorageEntity storage;

    @ManyToOne
    @JoinColumn(name = "inventory_id")
    private InventoryEntity inventory;

    @Column(name = "insert_date", nullable = false)
    private LocalDate insertDate;

    @Column(name = "valid_date")
    private LocalDate validDate;

    @Column(name = "used", nullable = false)
    private BigDecimal used;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "optlock", nullable = false)
    private Integer optLock;
}
