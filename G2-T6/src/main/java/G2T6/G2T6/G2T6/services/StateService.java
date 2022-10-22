package G2T6.G2T6.G2T6.services;

import G2T6.G2T6.G2T6.models.CurrentState;

import java.util.List;
import java.util.Optional;

public interface StateService {
    List<CurrentState> listCurrentState();
    CurrentState getCurrentState(Long id);
    CurrentState addCurrentState(CurrentState state);
    CurrentState updateCurrentState(Long id, CurrentState state);
    void deleteCurrentState(Long id);
    void factoryReset(Long id);
    CurrentState getDefaultState(); //get default state
    List<CurrentState> listCurrentStateByUserId(Long userId);
    Optional<CurrentState> getStateByIdAndUserId(Long id, Long userId);
    List<CurrentState> listCompletedState();
}
