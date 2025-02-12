package inventory.app.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import inventory.app.backend.entities.UnitEntity;
import inventory.app.backend.exceptions.NotFoundEntityException;
import inventory.app.backend.mappers.UnitMapper;
import inventory.app.api.model.Unit;
import inventory.app.backend.repositories.UnitRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UnitServiceImpl implements UnitService {

    private final UnitRepository unitRepository;

    private final UnitMapper mapper;

    @Override
    public List<Unit> findAll() {
        List<Unit> unitEntities = new ArrayList<>();
        unitRepository.findAll().forEach(unitEntity ->
                unitEntities.add(mapper.toDto(unitEntity))
        );
        return unitEntities;
    }

    @Override
    public Unit get(Long unitId) {
        UnitEntity unitEntity = unitRepository.findById(unitId).orElseThrow(
                () -> new NotFoundEntityException(Unit.class, unitId));
        return mapper.toDto(unitEntity);
    }
}
