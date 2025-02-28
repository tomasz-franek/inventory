package inventory.app.backend.mappers;

import inventory.app.api.model.ProductPredictionData;
import inventory.app.backend.services.ProductPrediction;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StoragePredictionDataMapper {

    ProductPredictionData toPredictionData(ProductPrediction productPrediction);
}
