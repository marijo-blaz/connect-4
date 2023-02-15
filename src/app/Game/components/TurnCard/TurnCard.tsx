import { FC, useEffect, useState } from "react";
import { ReactComponent as PlayerTurn } from "assets/layout/player_turn.svg";
import { twMerge } from "tailwind-merge";
import { useInterval } from "usehooks-ts";
import useGameContext from "app/Game/hooks/useGameContext";

const GAME_DELAY_IN_MS = 1000;
const TURN_TIME_IN_SECONDS = 30;

const TurnCard: FC = () => {
    const { players, isFinished, winner } = useGameContext();
    const currentPlayer = players.find((p) => p.isNext === true);
    const { color, name } = currentPlayer!;

    const [delayInMilliseconds] = useState<number>(GAME_DELAY_IN_MS);
    const [seconds, setSeconds] = useState<number>(TURN_TIME_IN_SECONDS);

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
                    "md:w-[210px]  md:h-[160px] w-[180px]  h-[140px] transition-all duration-1000",
                    colorVariants[color]
                )}
            />
            <div className="absolute top-0 left-0 w-full h-full px-4 flex flex-col md:pt-12 pt-10 items-center justify-start">
                <p className="text-white font-bold uppercase">
                    {name}
                    {!winner && `'s turn`}
                </p>
                {!winner ? (
                    <div>
                        <span className="text-white text-5xl md:text-6xl font-bold tabular-nums">
                            {seconds}
                        </span>
                        <span className="text-white text-5xl font-bold">s</span>
                    </div>
                ) : (
                    <span className="text-white text-5xl md:text-6xl font-bold">
                        WIN
                    </span>
                )}
            </div>
        </div>
    );
};

export default TurnCard;
