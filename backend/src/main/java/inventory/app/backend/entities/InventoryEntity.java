package inventory.app.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
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
    private boolean active;

    @Column(name = "opt_lock", nullable = false)
    private Integer optLock;
}
