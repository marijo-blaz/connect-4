import IPlayer from "./IPlayer";

interface IToken {
    id: number;
    isPopulated: boolean;
    isHighlighted?: boolean;
    player?: IPlayer;
}

export default IToken;
