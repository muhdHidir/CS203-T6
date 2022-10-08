package G2T6.G2T6.G2T6.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import G2T6.G2T6.G2T6.models.PlayerCurrentState;

import java.util.List;

@Repository
public interface StateRepository extends JpaRepository<PlayerCurrentState, Long> {
    List<PlayerCurrentState> findByCurrentState(String currentState);
}
