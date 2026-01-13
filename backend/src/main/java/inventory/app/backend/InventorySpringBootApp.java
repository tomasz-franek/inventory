package inventory.app.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;

@SpringBootApplication
@EntityScan("inventory.app")
@RequiredArgsConstructor
public class InventorySpringBootApp {
    public static void main(String[] args) {
        SpringApplication.run(InventorySpringBootApp.class, args);
    }
}
