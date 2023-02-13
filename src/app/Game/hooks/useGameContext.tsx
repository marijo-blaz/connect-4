import { IGridColumn, IPlayer } from "app/shared/interfaces";
import { createContext, useContext } from "react";
import INITIAL_GRID_DATA from "../constants/InitialGridData";
import INITIAL_PLAYER_DATA from "../constants/InitialPlayerData";

interface IGameContextData {
    grid: IGridColumn[];
    players: IPlayer[];
    winner: IPlayer | undefined;
    updateGrid: (grid: IGridColumn[]) => void;
    updatePlayers: (players: IPlayer[]) => void;
    updateWinner: (player: IPlayer) => void;
    isFinished: boolean;
    start: () => void;
    finish: () => void;
    restart: () => void;
}

export const GameContext = createContext<IGameContextData>({
    grid: INITIAL_GRID_DATA,
    players: INITIAL_PLAYER_DATA,
    winner: undefined,
    updateGrid: () => {},
    updatePlayers: () => {},
    updateWinner: () => {},
    isFinished: false,
    start: () => {},
    finish: () => {},
    restart: () => {},
});

export const useGameContext = () => useContext(GameContext);

export default useGameContext;
