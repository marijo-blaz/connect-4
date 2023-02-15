import { FC } from "react";
import { ReactComponent as PlayerIcon } from "assets/icons/player_icon.svg";
import { twMerge } from "tailwind-merge";
import { IPlayer } from "app/shared/interfaces";

const PlayerCard: FC<IPlayer> = ({ name, color, id, isNext }) => {
    const colorVariants = {
        red: "fill-red",
        orange: "fill-orange",
    };

    return (
        <div
            className={twMerge(
                "bg-white rounded-xl h-[60px] min-w-[102px] flex justify-center transition-all duration-500 items-center border-4 border-black shadow-[0_6px_0_rgba(0,0,0)] relative",
                !isNext && "shadow-[0_0_0_rgba(0,0,0)] opacity-75"
            )}
        >
            <PlayerIcon
                className={twMerge(
                    "w-10 h-10 absolute ",
                    id % 2 === 1 ? "-scale-x-100 -right-6" : "-left-6",
                    colorVariants[color]
                )}
            />
            <div
                className={twMerge(
                    "flex items-center flex-col",
                    id % 2 === 1 ? "mr-2" : "ml-2"
                )}
            >
                <p className="font-bold">{name.toUpperCase()}</p>
            </div>
        </div>
    );
};

export default PlayerCard;
