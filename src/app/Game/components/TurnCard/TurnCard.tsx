import { FC, useEffect, useState } from "react";
import { ReactComponent as PlayerTurn } from "assets/layout/player_turn.svg";
import { twMerge } from "tailwind-merge";
import { useInterval } from "usehooks-ts";
import { IPlayer } from "app/shared/interfaces";
import useGameContext from "app/Game/hooks/useGameContext";

const GAME_DELAY_IN_MS = 1000;
const TURN_TIME_IN_SECONDS = 30;

interface IPlayerCard {
    player: IPlayer;
}

const TurnCard: FC<IPlayerCard> = ({ player }) => {
    const { players, updatePlayers, isFinished, winner } = useGameContext();
    const currentPlayer = players.find((p) => p.isNext === true);
    const { color, name, id } = currentPlayer!;

    const [delayInMilliseconds] = useState<number>(GAME_DELAY_IN_MS);
    const [seconds, setSeconds] = useState<number>(TURN_TIME_IN_SECONDS);

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

        updatePlayers(updatedPlayer);
    };

    useEffect(() => {
        setSeconds(30);
    }, [currentPlayer]);

    useInterval(
        () => {
            if (seconds > 0) setSeconds(seconds - 1);
        },
        !isFinished ? delayInMilliseconds : null
    );

    const colorVariants = {
        red: "fill-red",
        orange: "fill-orange",
    };

    return (
        <div className="relative w-full h-full">
            <PlayerTurn
                className={twMerge(
                    "w-[210px] h-[160px] transition-all duration-1000",
                    colorVariants[color]
                )}
            />
            <div className="absolute top-0 left-0 w-full h-full px-4 flex flex-col pt-12 items-center justify-start">
                <p className="text-white font-bold uppercase">
                    {name}
                    {!winner && `'s turn`}
                </p>
                {!winner ? (
                    <div>
                        <span className="text-white text-6xl font-bold tabular-nums">
                            {seconds}
                        </span>
                        <span className="text-white text-5xl font-bold">s</span>
                    </div>
                ) : (
                    <span className="text-white text-6xl font-bold">WIN</span>
                )}
            </div>
        </div>
    );
};

export default TurnCard;
