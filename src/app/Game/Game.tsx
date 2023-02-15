import { FC, useState } from "react";
import { GameGrid } from "./components/GameGrid";
import { GameProvider } from "./components/GameProvider";
import { GameLayout } from "./components/GameLayout";

const Game: FC = () => {
    return (
        <GameProvider>
            <GameLayout>
                <GameGrid />
            </GameLayout>
        </GameProvider>
    );
};
export default Game;
