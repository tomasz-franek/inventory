package inventory.app.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "inventory", schema = BaseEntity.SCHEMA_NAME)
public class InventoryEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inventory_seq")
    @SequenceGenerator(name = "inventory_seq", sequenceName = "inventory_seq", schema = BaseEntity.SCHEMA_NAME, allocationSize = 1)
    private Long id;

    @Column(name = "name", length = 45, nullable = false)
    private String name;

    @Column(name = "description", length = 200)
    private String description;

    @Column(name = "active")
    private int active;

    @Column(name = "optlock", nullable = false)
    private Integer optLock;
}
