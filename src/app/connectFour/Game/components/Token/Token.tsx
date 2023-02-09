import IPlayer from "app/connectFour/shared/interfaces/IPlayer";
import IToken from "app/connectFour/shared/interfaces/IToken";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface ITokenProps
    extends Pick<IToken, "isPopulated">,
        Partial<Pick<IPlayer, "color">> {}

const Token: FC<ITokenProps> = ({ isPopulated, color }) => {
    return (
        <div
            className={twMerge(
                "h-[90%] w-[90%] border-4 border-transparent rounded-full",
                isPopulated && `animate-moveDown border-black`,
                "bg-" + color
            )}
        />
    );
};

export default Token;
