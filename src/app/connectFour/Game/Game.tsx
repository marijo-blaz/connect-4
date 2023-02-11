import { FC, useState } from "react";
import { ContentLayout } from "shared/components/ContentLayout";
import { Header } from "../shared/components/Header";
import { ReactComponent as BoardFront } from "assets/layout/board_front.svg";
import { ReactComponent as BoardBack } from "assets/layout/board_back.svg";
import PlayerCard from "./components/PlayerCard";
import IPlayer from "../shared/interfaces/IPlayer";
import { Token } from "./components/Token";
import INITIAL_PLAYER_DATA from "./constants/InitialPlayerData";
import INITIAL_GRID_DATA from "./constants/InitialGridData";
import getUpdatedBoard from "./utils/updateBoard";
import parseBoard from "./utils/parseBoard";
import { TurnCard } from "./components/TurnCard";

const Game: FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [grid, setGrid] = useState(INITIAL_GRID_DATA);
    const [players, setPlayers] = useState(INITIAL_PLAYER_DATA);
    const [currentTurnPlayerId, setCurrentTurnPlayerId] = useState(0);
    const [winner, setWinner] = useState<IPlayer | undefined>(undefined);

    const handleUpdatePlayerScore = (
        playerToUpdate: IPlayer,
        score: number
    ) => {
        const updatedPlayer = players.map((player) => {
            if (player !== playerToUpdate) {
                return {
                    ...player,
                    score: (player.score = player.score + score),
                };
            }
            return player;
        });

        setPlayers(updatedPlayer);
    };

    const handleClickColumn = (selectedColumnId: number) => {
        const newGrid = getUpdatedBoard(
            grid,
            selectedColumnId,
            players,
            currentTurnPlayerId
        );

        const gameWinner = parseBoard(newGrid);
        setGrid(newGrid);

        if (gameWinner) {
            setWinner(gameWinner);
            setIsPlaying(false);
        } else {
            setCurrentTurnPlayerId((id) => (id === 0 ? 1 : 0));
        }
    };

    return (
        <div>
            <ContentLayout>
                <Header
                    isPlaying={isPlaying}
                    onPlayClick={() => setIsPlaying(true)}
                />
                <div className="flex justify-center items-center gap-16">
                    <PlayerCard
                        {...players[0]}
                        isPlaying={currentTurnPlayerId === 0}
                    />
                    <div className="h-[550px] w-[600px] grid place-items-center my-16 relative">
                        <div className="w-full h-full z-30 px-[4%]">
                            <div className="grid columns-1 grid-flow-col gap-[0px] h-full w-full">
                                {isPlaying &&
                                    grid.map(({ id }) => (
                                        <div
                                            key={id}
                                            className="h-full w-full cursor-pointer"
                                            onClick={() =>
                                                handleClickColumn(id)
                                            }
                                        />
                                    ))}
                            </div>
                        </div>
                        <BoardFront className="z-20 h-full w-full absolute" />
                        <div className="w-full h-full z-10 px-[4%] pb-[11%] pt-[2%]  absolute">
                            <div className="grid columns-1 grid-flow-col h-full w-full">
                                {grid.map(({ rows }, index) => (
                                    <div
                                        key={index}
                                        className=" h-full w-full grid grid-flow-row place-items-center"
                                    >
                                        {rows.map(
                                            (
                                                { isPopulated, player },
                                                index
                                            ) => (
                                                <Token
                                                    isPopulated={isPopulated}
                                                    color={player?.color}
                                                    key={index}
                                                />
                                            )
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <BoardBack className="h-full w-full absolute" />
                        <div className="z-20 absolute -bottom-[100px]">
                            <TurnCard
                                isPlaying={isPlaying}
                                player={players[currentTurnPlayerId]}
                                winner={winner}
                                onUpdateScore={handleUpdatePlayerScore}
                            />
                        </div>
                    </div>
                    <PlayerCard
                        {...players[1]}
                        isPlaying={currentTurnPlayerId === 1}
                    />
                </div>
            </ContentLayout>
            <footer className="absolute w-full h-[160px] bg-darkPurple bottom-0 -z-10 rounded-t-[80px]" />
        </div>
    );
};
export default Game;
