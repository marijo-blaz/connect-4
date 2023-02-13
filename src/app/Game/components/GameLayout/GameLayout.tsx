import useGameContext from "app/Game/hooks/useGameContext";
import { Header } from "app/shared/components/Header";
import { FC, PropsWithChildren } from "react";
import { ContentLayout } from "shared/components/ContentLayout";
import PlayerCard from "../PlayerCard";

const GameLayout: FC<PropsWithChildren> = ({ children }) => {
    const { players } = useGameContext();

    return (
        <ContentLayout>
            <Header />
            <div className="flex justify-center items-center gap-16">
                <PlayerCard {...players[0]} />
                {children}
                <PlayerCard {...players[1]} />
            </div>
            <footer className="absolute w-full h-[160px] bg-darkPurple bottom-0 -z-10 rounded-t-[80px]" />
        </ContentLayout>
    );
};

export default GameLayout;
