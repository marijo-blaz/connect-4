import { FC } from "react";
import { ReactComponent as Logo } from "assets/icons/logo.svg";
import useGameContext from "app/Game/hooks/useGameContext";

const Header: FC = () => {
    const { restart } = useGameContext();

    return (
        <header className="w-100 flex items-center justify-center gap-24">
            <button
                className="bg-darkPurple px-8 py-2 rounded-full uppercase hover:opacity-70 text-white"
                onClick={() => restart()}
            >
                {"reset"}
            </button>
            <Logo className="w-12 h-12" />
            <button className="bg-darkPurple px-8 py-2 rounded-full uppercase hover:opacity-70 text-white">
                menu
            </button>
        </header>
    );
};

export default Header;
