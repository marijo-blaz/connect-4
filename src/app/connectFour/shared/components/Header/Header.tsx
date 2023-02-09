import { FC } from "react";
import { ReactComponent as Logo } from "assets/icons/logo.svg";

const Component: FC = () => {
    return (
        <header className="w-100 flex items-center justify-center">
            <Logo className="w-12 h-12" />
        </header>
    );
};

export default Component;
