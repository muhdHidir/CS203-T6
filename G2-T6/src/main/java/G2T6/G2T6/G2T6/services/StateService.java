package G2T6.G2T6.G2T6.services;

import java.util.List;

import G2T6.G2T6.G2T6.models.GameStats;
import G2T6.G2T6.G2T6.models.PlayerCurrentState;

public interface StateService {
    List<PlayerCurrentState> listPlayerCurrentState();
    PlayerCurrentState getPlayerCurrentState(Long id);
    PlayerCurrentState addPlayerCurrentState(PlayerCurrentState state);
    PlayerCurrentState updatePlayerCurrentState(Long id, PlayerCurrentState state);
    void deletePlayerCurrentState(Long id);
    void factoryReset(Long id);
}
