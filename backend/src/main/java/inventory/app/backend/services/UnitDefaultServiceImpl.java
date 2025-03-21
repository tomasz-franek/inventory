package inventory.app.backend.services;

import inventory.app.api.model.UnitDefault;
import inventory.app.backend.mappers.UnitDefaultMapper;
import inventory.app.backend.repositories.UnitDefaultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UnitDefaultServiceImpl implements UnitDefaultService {

    private final UnitDefaultRepository repository;

    private final UnitDefaultMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<UnitDefault> findAll() {
        List<UnitDefault> units = new ArrayList<>();
        repository.findAll().forEach(unitEntity ->
                units.add(mapper.toDto(unitEntity))
        );
        return units;

    }
}
