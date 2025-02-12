package inventory.app.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "unit", schema = BaseEntity.SCHEMA_NAME)
public class UnitEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "unit_seq")
    @SequenceGenerator(name = "unit_seq", sequenceName = "unit_seq", schema = BaseEntity.SCHEMA_NAME, allocationSize = 1)
    private Long id;

    @Column(name = "name", length = 45, nullable = false)
    private String name;

    @Column(name = "symbol", length = 5, nullable = false)
    private String symbol;

    @Column(name = "rounding")
    private Integer rounding;

    @Column(name = "optlock", nullable = false)
    private Integer optLock;
}
