import { FC, useState } from "react";
import { GameGrid } from "./components/GameGrid";
import { GameProvider } from "./components/GameProvider";
import { GameLayout } from "./components/GameLayout";

const Game: FC = () => {
    const [currentTurnPlayerId, setCurrentTurnPlayerId] = useState(0);

    return (
        <GameProvider>
            <GameLayout>
                <GameGrid
                    currentTurnPlayerId={currentTurnPlayerId}
                    handleUpdateCurrentPlayingId={(id) =>
                        setCurrentTurnPlayerId(id)
                    }
                />
            </GameLayout>
        </GameProvider>
    );
};
export default Game;
