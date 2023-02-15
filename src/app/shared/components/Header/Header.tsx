import { FC } from "react";
import { ReactComponent as Logo } from "assets/icons/logo.svg";
import useGameContext from "app/Game/hooks/useGameContext";
import PlayerCard from "app/Game/components/PlayerCard";

const Header: FC = () => {
    const { restart, players } = useGameContext();

    return (
        <header className="w-100 flex items-center justify-between max-w-[300px] mx-auto md:max-w-[500px]">
            <PlayerCard {...players[0]} />
            <Logo
                className="w-12 h-12 cursor-pointer"
                onClick={() => restart()}
            />
            <PlayerCard {...players[1]} />
        </header>
    );
};

export default Header;
