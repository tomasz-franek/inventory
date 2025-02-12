package inventory.app.backend.exceptions;

import lombok.Getter;
import inventory.app.backend.validation.ValidationResult;

@Getter
public class ValidationException extends RuntimeException {

    private final ValidationResult validationResult;

    public ValidationException(String message, ValidationResult validationResult) {
        super(message);
        this.validationResult = validationResult;
    }
}
