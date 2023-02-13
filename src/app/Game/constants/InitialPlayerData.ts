import tokenColorEnum from "app/shared/enums/TokenColorEnum";
import { IPlayer } from "app/shared/interfaces";

const INITIAL_PLAYER_DATA: IPlayer[] = [
    { id: 0, name: "Mirko", score: 0, color: tokenColorEnum.RED, isNext: true },
    {
        id: 1,
        name: "Slavko",
        score: 0,
        color: tokenColorEnum.ORANGE,
        isNext: false,
    },
];

export default INITIAL_PLAYER_DATA;
