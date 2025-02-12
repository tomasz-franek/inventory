package inventory.app.backend.validation;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import inventory.app.backend.validation.ValidationResult.Context;
import inventory.app.backend.validation.ValidationResult.FieldContext;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

@Component
@RequiredArgsConstructor
public class Validators {

    public <T> ValidationResult validate(ValidationResult result, Validator... validators) {
        Arrays.stream(validators).forEach(v -> v.validate(result));
        return result;
    }


    public <T> Validator notNullValue(T value, Supplier<Context> contextSupplier, String fieldName,
                                      String errorMessage) {
        return (result) -> {
            if (value == null) {
                result.addFieldError(fieldName, errorMessage);
            }
            return result;
        };
    }

    public Validator validateTextDataLength(Object entity) {
        return (result) -> {
            if (entity != null && entity.getClass().getAnnotation(Entity.class) != null) {
                Arrays.stream(entity.getClass().getDeclaredFields()).sequential()
                        .filter(field ->
                                String.class.equals(field.getType()) &&
                                        field.getAnnotation(Column.class) != null)
                        .forEach(field -> {
                            Optional<Method> method = getGetterMethodForField(entity, field);

                            if (method.isPresent()) {
                                try {
                                    Column column = field.getAnnotation(Column.class);
                                    String value = (String) method.get().invoke(entity);
                                    if (value != null && value.length() > column.length()) {
                                        result.addError(new FieldContext(List.of(field.getName())), String.format(
                                                "Column '%s' can contain a maximum of %d character(s) but it contains %d",
                                                field.getName(), column.length(), value.length()));
                                    }
                                } catch (IllegalAccessException | InvocationTargetException ignored) {
                                }
                            }
                        });
            }
            return result;
        };
    }

    public Validator validateValuesInNotNullColumns(Object entity,
                                                    Supplier<Context> contextSupplier) {
        return (result) -> {
            if (entity != null && entity.getClass().getAnnotation(Entity.class) != null) {
                Arrays.stream(entity.getClass().getDeclaredFields()).sequential().forEach(field -> {
                    Column column = field.getAnnotation(Column.class);
                    if (column != null) {
                        Optional<Method> method = getGetterMethodForField(entity, field);
                        if (method.isPresent() && !column.nullable()) {
                            try {
                                if (method.get().invoke(entity) == null) {
                                    result.addError(contextSupplier.get(), String.format(
                                            "Value in the column '%s' is null",
                                            field.getName()));
                                }
                            } catch (IllegalAccessException | InvocationTargetException ignored) {
                            }
                        }
                    }
                });
            }
            return result;
        };
    }

    private static Optional<Method> getGetterMethodForField(Object entity, Field field) {
        Method[] methods = entity.getClass().getDeclaredMethods();
        return Arrays.stream(methods)
                .filter(element -> element.getName().toLowerCase()
                        .equals("get" + field.getName().toLowerCase())).findFirst();
    }
}
