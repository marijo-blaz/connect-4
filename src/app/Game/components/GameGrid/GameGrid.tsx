import { FC, useState } from "react";
import { ReactComponent as BoardFront } from "assets/layout/board_front.svg";
import { ReactComponent as BoardBack } from "assets/layout/board_back.svg";
import { TurnCard } from "../TurnCard";
import { Token } from "../Token";
import getUpdatedBoard from "app/Game/utils/updateBoard";
import parseBoard from "app/Game/utils/parseBoard";
import useGameContext from "app/Game/hooks/useGameContext";
import { useInterval } from "usehooks-ts";
import { isEqual } from "lodash";

const GameGrid: FC = () => {
    const {
        grid,
        players,
        updateGrid,
        updatePlayers,
        finish,
        start,
        restart,
        isFinished,
        updateWinner,
    } = useGameContext();
    const currentPlayer = players.find((p) => p.isNext === true);

    const handleClickColumn = (selectedColumnId: number) => {
        if (isFinished) {
            restart();
            return;
        } else start();

        const newGrid = getUpdatedBoard(
            grid,
            selectedColumnId,
            players,
            currentPlayer?.id || 0
        );

        const isBoardEqual = isEqual(newGrid, grid);

        if (isBoardEqual) return;

        const gameWinner = parseBoard(newGrid);
        updateGrid(newGrid);

        if (gameWinner) {
            updateWinner(gameWinner);
            finish();
        } else {
            const updatedPlayer = players.map((player) => {
                if (player === currentPlayer) {
                    return {
                        ...player,
                        isNext: false,
                    };
                } else {
                    return {
                        ...player,
                        isNext: true,
                    };
                }
            });
            updatePlayers(updatedPlayer);
        }
    };
    const [seconds, setSeconds] = useState<number>(30);

    useInterval(
        () => {
            if (seconds > 0) setSeconds(seconds - 1);
        },
        !isFinished ? 1000 : null
    );

    return (
        <div className="absolute top-1/2 -translate-y-1/2">
            <div className="min-h-[325px] md:min-h-[550px] min-w-[375px] md:min-w-[600px] grid place-items-center my-8 md:my-16 relative">
                <div className="w-full h-full z-30 px-[4%]">
                    <div className="grid columns-1 grid-flow-col gap-[0px] h-full w-full">
                        {grid.map(({ id }) => (
                            <div
                                key={id}
                                className="h-full w-full cursor-pointer"
                                onClick={() => handleClickColumn(id)}
                            />
                        ))}
                    </div>
                </div>
                <BoardFront className="z-20 h-full w-full absolute" />
                <div className="w-full h-full z-10 px-[7%] md:px-[4%] pb-[11%] md:pt-[2%] pt-[3%] absolute">
                    <div className="grid columns-1 grid-flow-col h-full w-full">
                        {grid.map(({ rows }, index) => (
                            <div
                                key={index}
                                className=" h-full w-full grid grid-flow-row place-items-center"
                            >
                                {rows.map(({ isPopulated, player }, index) => (
                                    <Token
                                        isPopulated={isPopulated}
                                        color={player?.color}
                                        key={index}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <BoardBack className="h-full w-full absolute" />
                <div className="z-20 absolute -bottom-[110px] md:-bottom-[100px]">
                    <TurnCard />
                </div>
            </div>
        </div>
    );
};

export default GameGrid;
