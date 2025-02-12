package inventory.app.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "category", schema = BaseEntity.SCHEMA_NAME)
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_seq")
    @SequenceGenerator(name = "category_seq", sequenceName = "category_seq", schema = BaseEntity.SCHEMA_NAME, allocationSize = 1)
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "active")
    private int active;

    @Column(name = "optlock", nullable = false)
    private Integer optLock;
}
