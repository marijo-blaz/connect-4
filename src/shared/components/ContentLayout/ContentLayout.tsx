import { FC, PropsWithChildren } from "react";

const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
    return <div className="p-4 h-screen ">{children}</div>;
};

export default ContentLayout;
