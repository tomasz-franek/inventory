package inventory.app.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "product", schema = BaseEntity.SCHEMA_NAME)
public class ProductEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_seq")
    @SequenceGenerator(name = "product_seq", sequenceName = "product_seq", schema = BaseEntity.SCHEMA_NAME, allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;

    @Column(name = "name", length = 45, nullable = false)
    private String name;

    @Column(name = "active")
    private int active;

    @Column(name = "fragile")
    private int fragile;

    @Column(name = "limit_max", nullable = false)
    private int limitMax;
    @Column(name = "limit_med", nullable = false)
    private int limitMed;
    @Column(name = "limit_min", nullable = false)
    private int limitMin;

    @Column(name = "optlock", nullable = false)
    private Integer optLock;
}
