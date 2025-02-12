package inventory.app.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import inventory.app.backend.mappers.UnitDefaultMapper;
import inventory.app.api.model.UnitDefault;
import inventory.app.backend.repositories.UnitDefaultRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UnitDefaultServiceImpl implements UnitDefaultService {

    private final UnitDefaultRepository repository;

    private final UnitDefaultMapper mapper;

    @Override
    public List<UnitDefault> findAll() {
        List<UnitDefault> units = new ArrayList<>();
        repository.findAll().forEach(unitEntity ->
                units.add(mapper.toDto(unitEntity))
        );
        return units;

    }
}
