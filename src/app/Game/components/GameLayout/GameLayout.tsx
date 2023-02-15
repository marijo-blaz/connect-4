import useGameContext from "app/Game/hooks/useGameContext";
import { Header } from "app/shared/components/Header";
import { FC, PropsWithChildren } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import { ContentLayout } from "shared/components/ContentLayout";

const GameLayout: FC<PropsWithChildren> = ({ children }) => {
    const { width, height } = useWindowSize();
    const { isFinished } = useGameContext();

    return (
        <div>
            <ContentLayout>
                <Header />
                <div className="flex justify-center items-center gap-16 overflow-hidden">
                    {children}
                </div>
            </ContentLayout>
            {isFinished && (
                <ReactConfetti run={isFinished} width={width} height={height} />
            )}
        </div>
    );
};

export default GameLayout;
