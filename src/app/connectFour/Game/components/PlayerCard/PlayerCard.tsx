import { FC } from "react";
import { ReactComponent as PlayerIcon } from "assets/icons/player_icon.svg";
import IPlayer from "app/connectFour/shared/interfaces/IPlayer";
import { twMerge } from "tailwind-merge";

interface IPlayerCard extends IPlayer {
    isPlaying: boolean;
}

const PlayerCard: FC<IPlayerCard> = ({ name, color, id, isPlaying, score }) => {
    return (
        <div
            className={twMerge(
                "bg-white rounded-xl h-[128px] min-w-[102px] flex justify-center items-center border-4 border-black shadow-[0_10px_0_rgba(0,0,0)] relative",
                !isPlaying && "shadow-[0_0_0_rgba(0,0,0)]" && "opacity-25"
            )}
        >
            <PlayerIcon
                className={twMerge(
                    "w-12 h-12 absolute -top-6 ",
                    id % 2 === 1 && "-scale-x-100",
                    "fill-" + color
                )}
            />
            <div className="flex items-center flex-col">
                <p className="font-bold">{name.toUpperCase()}</p>
                <p className="font-bold text-4xl">{score}</p>
            </div>
        </div>
    );
};

export default PlayerCard;
