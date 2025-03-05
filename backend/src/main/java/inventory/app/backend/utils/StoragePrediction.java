package inventory.app.backend.utils;

import inventory.app.api.model.Product;
import inventory.app.api.model.ProductPredictionData;
import inventory.app.api.model.Storage;
import inventory.app.backend.mappers.ProductMapper;
import inventory.app.backend.mappers.StorageMapper;
import inventory.app.backend.mappers.StoragePredictionDataMapper;
import inventory.app.backend.repositories.ProductRepository;
import inventory.app.backend.repositories.StorageRepository;
import inventory.app.backend.services.ProductPrediction;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class StoragePrediction {

    private static final BigDecimal PERCENT = new BigDecimal("0.01");
    private final ProductRepository productRepository;
    private final StorageRepository storageRepository;
    private final StorageMapper storageMapper;
    private final ProductMapper productMapper;
    private final StoragePredictionDataMapper storagePredictionDataMapper;


    private List<Product> productList;
    private List<ProductPrediction> productPredictionList;

    public void calculate() {
        productList = new ArrayList<>();
        productRepository.findAll().forEach(p ->
                productList.add(productMapper.toDto(p)));
        List<Storage> storageList = new ArrayList<>();
        storageRepository.findAll().forEach(s ->
                storageList.add(storageMapper.toDto(s)));

        preparePredictionMap(storageList);
        removeEmptyItems();
    }


    public void calculate(Long idProduct, int count) {
        productList = new ArrayList<>();
        productRepository.findById(idProduct).ifPresent(p ->
                productList.add(productMapper.toDto(p)));
        List<Storage> storageList = new ArrayList<>();
        storageRepository.findAll().forEach(s ->
                storageList.add(storageMapper.toDto(s)));

        Storage storage = new Storage();
        storage.setCount(BigDecimal.valueOf(count));
        storage.setIdProduct(idProduct);
        storage.setIdStorage(-1L);
        storage.setUsed(BigDecimal.ZERO);
        storage.setItems(count);
        storage.setInsertDate(LocalDate.now());
        storageList.add(storage);
        preparePredictionMap(storageList);
        removeEmptyItems();
    }

    private void removeEmptyItems() {
        List<ProductPrediction> afterRemoving = new ArrayList<>();
        for (ProductPrediction productPrediction : productPredictionList) {
            if (productPrediction.getAvailable().compareTo(PERCENT) > 0) {
                afterRemoving.add(productPrediction);
            }
        }
        productPredictionList.clear();
        productPredictionList.addAll(afterRemoving);
    }

    private void preparePredictionMap(List<Storage> storageList) {
        ProductPrediction productPrediction;
        while (!storageList.isEmpty()) {
            Storage storage = storageList.removeFirst();
            productPrediction = getProductPrediction(storage.getIdProduct());

            analyzeProductPrediction(productPrediction, storage);
        }

        calculatePredictedAvailabilityDate();
    }

    private ProductPrediction getProductPrediction(Long idProduct) {
        for (ProductPrediction productPrediction : productPredictionList) {
            if (productPrediction.getIdProduct().equals(idProduct)) {
                return productPrediction;
            }
        }
        ProductPrediction productPrediction = new ProductPrediction(idProduct);
        Product product = getProduct(idProduct);
        if (null != product) {
            productPrediction.setLimitMax(product.getLimitMax());
            productPrediction.setLimitMed(product.getLimitMed());
            productPrediction.setLimitMin(product.getLimitMin());
            productPrediction.setProductName(product.getName());
            productPredictionList.add(productPrediction);
        }
        return productPrediction;
    }

    private Product getProduct(Long idProduct) {
        return productList.stream().filter(
                product -> {
                    assert product.getIdProduct() != null;
                    return product.getIdProduct().equals(idProduct);
                }).findFirst().orElse(null);
    }

    private void calculatePredictedAvailabilityDate() {
        for (ProductPrediction productPrediction : productPredictionList) {
            calculatePredictedAvailabilityDate(productPrediction);
        }
    }

    public void calculatePredictedAvailabilityDate(ProductPrediction productPrediction) {
        double deltaEpoch = System.currentTimeMillis() / 1000.0d - productPrediction.getMinimalProductBuyingDate().toEpochDay();
        if (productPrediction.getCountUsed().doubleValue() > 0.0d) {
            deltaEpoch /= productPrediction.getCountUsed().doubleValue();
        }
        deltaEpoch *= productPrediction.getAvailable().doubleValue();
        long maxDateEpoch = (long) deltaEpoch;
        maxDateEpoch += System.currentTimeMillis() / 1000.0d;
        productPrediction.setPredictedAvailabilityEpoch(maxDateEpoch);
    }

    private void analyzeProductPrediction(ProductPrediction productPrediction, Storage storage) {
        if (productPrediction.getMinimalProductBuyingDate().isAfter(storage.getInsertDate())) {
            productPrediction.setMinimalProductBuyingDate(storage.getInsertDate());
        }
        productPrediction.addCountItems(storage.getItems());
        addUsed(productPrediction, storage);
    }

    private void addUsed(ProductPrediction productPrediction, Storage storage) {
        BigDecimal countUsed = BigDecimal.valueOf(storage.getItems().longValue());
        countUsed = countUsed.multiply(PERCENT).multiply(storage.getUsed());
        productPrediction.addUsed(countUsed);
    }

    public List<ProductPredictionData> prepareResponse() {
        List<ProductPredictionData> storagePredictionDataList = new ArrayList<>();

        this.productPredictionList.forEach(p ->
                storagePredictionDataList.add(storagePredictionDataMapper.toPredictionData(p)));
        return storagePredictionDataList;
    }
}
