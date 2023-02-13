import INITIAL_GRID_DATA from "app/Game/constants/InitialGridData";
import INITIAL_PLAYER_DATA from "app/Game/constants/InitialPlayerData";
import { GameContext } from "app/Game/hooks/useGameContext";
import { IPlayer } from "app/shared/interfaces";
import { FC, PropsWithChildren, useState } from "react";

const GameProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [grid, setGrid] = useState(INITIAL_GRID_DATA);
    const [players, setPlayers] = useState(INITIAL_PLAYER_DATA);
    const [winner, setWinner] = useState<IPlayer | undefined>(undefined);

    const handleRestartGame = () => {
        setGrid(INITIAL_GRID_DATA);
        setPlayers(INITIAL_PLAYER_DATA);
        setWinner(undefined);
        setIsFinished(false);
    };

    return (
        <GameContext.Provider
            value={{
                grid: grid,
                players: players,
                winner: winner,
                updateGrid: (updatedGrid) => setGrid(updatedGrid),
                updatePlayers: (updatedPlayers) => setPlayers(updatedPlayers),
                updateWinner: (updatedPlayer) => setWinner(updatedPlayer),
                isFinished: isFinished,
                finish: () => setIsFinished(true),
                start: () => setIsFinished(false),
                restart: handleRestartGame,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;
