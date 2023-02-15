import { Header } from "app/shared/components/Header";
import { FC, PropsWithChildren } from "react";
import { ContentLayout } from "shared/components/ContentLayout";

const GameLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <ContentLayout>
                <Header />
                <div className="flex justify-center items-center gap-16">
                    {children}
                </div>
            </ContentLayout>
            <footer className="absolute w-full md:h-[20vh] h-[35vh] bg-darkPurple bottom-0 -z-10 md:rounded-t-[80px] rounded-t-[40px]" />
        </div>
    );
};

export default GameLayout;
