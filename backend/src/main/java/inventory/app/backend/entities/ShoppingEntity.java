package inventory.app.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "shopping", schema = BaseEntity.SCHEMA_NAME)
public class ShoppingEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shopping_seq")
    @SequenceGenerator(name = "shopping_seq", sequenceName = "shopping_seq", schema = BaseEntity.SCHEMA_NAME, allocationSize = 1)
    private Long id;

    @Column(name = "name", length = 45, nullable = false)
    private String name;

    @Column(name = "items", nullable = false)
    private int items;

    @Column(name = "count", nullable = false)
    private BigDecimal count;

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private UnitEntity unit;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @Column(name = "optlock", nullable = false)
    private Integer optLock;
}
