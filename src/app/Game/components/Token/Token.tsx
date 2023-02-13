import { IPlayer, IToken } from "app/shared/interfaces";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface ITokenProps
    extends Pick<IToken, "isPopulated">,
        Partial<Pick<IPlayer, "color">> {}

const Token: FC<ITokenProps> = ({ isPopulated, color }) => {
    const colorVariants = {
        red: "bg-red",
        orange: "bg-orange",
    };

    return (
        <div
            className={twMerge(
                "h-[90%] w-[90%] border-4 border-transparent rounded-full",
                isPopulated && `animate-moveDown border-black`,
                colorVariants[color!]
            )}
        />
    );
};

export default Token;
