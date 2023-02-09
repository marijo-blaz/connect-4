import { FC, useState } from "react";
import { ContentLayout } from "shared/components/ContentLayout";
import { Header } from "../shared/components/Header";
import { ReactComponent as BoardFront } from "assets/layout/board_front.svg";
import { ReactComponent as BoardBack } from "assets/layout/board_back.svg";
import PlayerCard from "./components/PlayerCard";
import tokenColorEnum from "../shared/enums/TokenColorEnum";
import IGrid from "../shared/interfaces/IGrid";
import IPlayer from "../shared/interfaces/IPlayer";
import IToken from "../shared/interfaces/IToken";
import { Token } from "./components/Token";

const GRID = Array.from<undefined, IGrid>({ length: 7 }, (_, i) => {
    return {
        id: i,
        rows: Array.from({ length: 6 }, (_, i) => {
            return { id: i, isPopulated: false, player: undefined };
        }),
    };
});

const PLAYERS: IPlayer[] = [
    { id: 0, name: "player1", score: 0, color: tokenColorEnum.RED },
    { id: 1, name: "player2", score: 0, color: tokenColorEnum.ORANGE },
];

const getArrayWin = (input: IToken[]): IPlayer | undefined => {
    let sum = 0;
    let bestPlayer: IPlayer | undefined = undefined;

    input.every(({ player }, index) => {
        if (player && player.id === input[index + 1]?.player?.id) {
            sum++;
        } else {
            sum = 0;
        }

        if (sum > 2) {
            bestPlayer = player;
            return false;
        }

        return true;
    });

    return bestPlayer;
};

const Game: FC = () => {
    const [grid, setGrid] = useState(GRID);
    const [players, setPlayers] = useState(PLAYERS);
    const [nextPlayerId, setNextPlayerId] = useState(0);
    const [winner, setWinner] = useState<IPlayer | undefined>(undefined);

    const checkWin = (items: IGrid[]) => {
        const HEIGHT = 7;
        const WIDTH = 6;
        const NUM_OF_DIAGONALS = WIDTH + HEIGHT - 1;

        //Check columns
        items.every(({ rows }) => {
            const win = getArrayWin(rows);

            if (win) {
                console.log(win);
                setWinner(win);
                return false;
            } else return true;
        });

        //Check rows
        let gridRowLength = WIDTH;
        for (let i = 0; i < WIDTH; i++) {
            let rowData: IToken[] = [];

            items.forEach(({ rows }) => {
                rowData.push(rows[gridRowLength - 1]);
            });

            const win = getArrayWin(rowData);

            if (win) {
                console.log(win);
                setWinner(win);
            }

            gridRowLength--;
        }

        //  Left -> Right
        for (let k = 0; k < NUM_OF_DIAGONALS; k++) {
            let nArr = [];
            for (let j = 0; j <= k; j++) {
                let i = k - j;
                if (i < HEIGHT && j < WIDTH) {
                    nArr.push(items[i].rows[j]);
                }
            }
            const winner = getArrayWin(nArr);
            if (winner) {
                setWinner(winner);
                break;
            }
            nArr = [];
        }

        // Right -> Left
        for (let k = 0; k < NUM_OF_DIAGONALS; k++) {
            let i = Math.max(k - WIDTH + 1, 0);
            let j = Math.max(WIDTH - k - 1, 0);

            let nArr = [];

            while (i < HEIGHT && j < WIDTH) {
                nArr.push(items[i++].rows[j++]);
            }

            const winner = getArrayWin(nArr);
            if (winner) {
                setWinner(winner);
                return;
            }
            nArr = [];
        }
    };

    const handleClickColumn = (selectedColumnId: number) => {
        let updatedGrid = grid.map((column) => {
            if (column.id == selectedColumnId) {
                const lastUneditedRowId = column.rows.findIndex(
                    (v) => v.isPopulated === true
                );

                if (lastUneditedRowId === 0) return { ...column };

                const index = lastUneditedRowId < 0 ? 6 : lastUneditedRowId;

                let updatedRow: IToken[] = column.rows.map((row) => {
                    if (row.id === column.rows[index - 1].id) {
                        return {
                            ...row,
                            isPopulated: true,
                            player: players.find((v) => v.id === nextPlayerId),
                        };
                    }
                    return { ...row };
                });
                return { ...column, rows: [...updatedRow] };
            }
            return column;
        });

        const updatedPlayer = players.map((player) => {
            if (player.id === nextPlayerId) {
                return { ...player, score: (player.score = player.score + 1) };
            }
            return player;
        });

        setPlayers(updatedPlayer);
        checkWin(updatedGrid);

        setNextPlayerId((id) => (id === 0 ? 1 : 0));
        setGrid(updatedGrid);
    };

    return (
        <ContentLayout>
            <Header />
            <div className="flex justify-center items-center gap-16">
                <PlayerCard {...players[0]} isPlaying={nextPlayerId === 0} />
                <div className="h-[600px] w-[600px] grid place-items-center my-16 relative">
                    <div className="w-full h-full z-30 px-[16px] pb-[10%] ">
                        <div className="grid columns-1 grid-flow-col gap-[0px] h-full w-full">
                            {!winner &&
                                grid.map(({ id }) => (
                                    <div
                                        key={id}
                                        className="h-full w-full cursor-pointer"
                                        onClick={() => handleClickColumn(id)}
                                    />
                                ))}
                        </div>
                    </div>
                    <BoardFront className="aspect-auto z-20 h-full w-full absolute drop-shadow-[0_0_4px_0_rgba(0,0,0,0.1)_inset] top-[-2px]" />
                    <div className="w-full h-full z-10 px-[16px] pt-[5%] pb-[14%] absolute">
                        <div className="grid columns-1 grid-flow-col h-full w-full">
                            {grid.map(({ rows }, index) => (
                                <div
                                    key={index}
                                    className=" h-full w-full grid grid-flow-row place-items-center"
                                >
                                    {rows.map(
                                        ({ isPopulated, player }, index) => (
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
                    <BoardBack className="aspect-auto h-full w-full absolute drop-shadow-[0_0_4px_0_rgba(0,0,0,0.1)_inset]" />
                </div>
                <PlayerCard {...players[1]} isPlaying={nextPlayerId === 1} />
            </div>
        </ContentLayout>
    );
};
export default Game;
