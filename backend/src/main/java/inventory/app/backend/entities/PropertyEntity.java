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
@Table(name = "property", schema = BaseEntity.SCHEMA_NAME)
public class PropertyEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "property_seq")
    @SequenceGenerator(name = "property_seq", sequenceName = "property_seq", schema = BaseEntity.SCHEMA_NAME, allocationSize = 1)
    private Long id;

    @Column(name = "currency", length = 3, nullable = false)
    private String currency;

    @Column(name = "language", length = 2, nullable = false)
    private String language;

    @Column(name = "user_id", nullable = false)
    private Long idUser;

    @Column(name = "opt_lock", nullable = false)
    private Integer optLock;

}
