package inventory.app.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundEntityException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public NotFoundEntityException(Class<?> type, Long id) {
        super(String.format("%s with id = '%d' not found.", type.getSimpleName(), id));
    }
}
