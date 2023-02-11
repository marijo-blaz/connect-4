import { FC, useEffect, useState } from "react";
import { ReactComponent as PlayerTurn } from "assets/layout/player_turn.svg";
import IPlayer from "app/connectFour/shared/interfaces/IPlayer";
import { twMerge } from "tailwind-merge";
import { useInterval } from "usehooks-ts";

interface IPlayerCard {
    player: IPlayer;
    winner: IPlayer | undefined;
    onUpdateScore: (player: IPlayer, score: number) => void;
    isPlaying: boolean;
}

const TurnCard: FC<IPlayerCard> = ({
    player,
    winner,
    onUpdateScore,
    isPlaying,
}) => {
    const { color, name, id } = player;

    const [seconds, setSeconds] = useState<number>(30);
    const [delayInMilliseconds] = useState<number>(1000);

    useEffect(() => {
        setSeconds(30);
        if (isPlaying) onUpdateScore(player, seconds);
    }, [id]);

    useInterval(
        () => {
            if (seconds > 0) setSeconds(seconds - 1);
        },
        isPlaying ? delayInMilliseconds : null
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
