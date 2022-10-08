package G2T6.G2T6.G2T6.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import G2T6.G2T6.G2T6.models.GameStats;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameStatsRepository extends JpaRepository<GameStats, Long> {
    List<GameStats> findByPlayerCurrentStateId(Long sessionId);
    Optional<GameStats> findByIdAndPlayerCurrentStateId(Long id, Long sessionId);
}
