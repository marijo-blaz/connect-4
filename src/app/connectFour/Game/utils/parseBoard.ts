import IGrid from "app/connectFour/shared/interfaces/IGrid";
import IPlayer from "app/connectFour/shared/interfaces/IPlayer";
import IToken from "app/connectFour/shared/interfaces/IToken";
import INITIAL_GRID_DATA from "../constants/InitialGridData";
import getWinnerFromArray from "./getWinnerFromArray";

const GRID_WIDTH = INITIAL_GRID_DATA.length;
const GRID_HEIGHT = INITIAL_GRID_DATA[0].rows.length;
const NUM_OF_DIAGONALS = GRID_WIDTH + GRID_HEIGHT - 1;

const checkBoardColumns = (items: IGrid[]) => {
    //Check columns and return player
    let output: IPlayer | undefined;

    for (let i = 0; i < GRID_WIDTH; i++) {
        const player = getWinnerFromArray(items[i].rows);
        if (player) {
            output = player;
            break;
        }
    }
    return output;
};

const checkBoardRows = (items: IGrid[]) => {
    //Check rows and return player
    let output: IPlayer | undefined;

    let gridRowLength = 6;
    for (let i = 0; i < 6; i++) {
        let rowData: IToken[] = [];

        for (let i = 0; i < GRID_WIDTH; i++) {
            rowData.push(items[i].rows[gridRowLength - 1]);
        }

        const player = getWinnerFromArray(rowData);

        if (player) {
            output = player;
            break;
        }

        gridRowLength--;
    }

    return output;
};

const checkBoardDiagonalRowsLeftToRight = (items: IGrid[]) => {
    //Check ↘️ and return player
    let output: IPlayer | undefined;
    const NUM_OF_DIAGONALS = GRID_WIDTH + GRID_HEIGHT - 1;

    //  Left -> Right
    for (let k = 0; k < NUM_OF_DIAGONALS; k++) {
        let nArr = [];

        for (let j = 0; j <= k; j++) {
            let i = k - j;
            if (i < GRID_WIDTH && j < GRID_HEIGHT) {
                nArr.push(items[i].rows[j]);
            }
        }

        const player = getWinnerFromArray(nArr);

        if (player) {
            output = player;
            return player;
        }

        nArr = [];
    }

    return output;
};

const checkBoardDiagonalRowsRightToLeft = (items: IGrid[]) => {
    //Check ↗️ diagonals and return player
    let output: IPlayer | undefined;

    // Right -> Left
    for (let k = 0; k < NUM_OF_DIAGONALS; k++) {
        let i = Math.max(k - GRID_WIDTH + 1, 0);
        let j = Math.max(GRID_WIDTH - k - 1, 0);

        let nArr = [];

        while (i < GRID_WIDTH && j < GRID_HEIGHT) {
            nArr.push(items[i++].rows[j++]);
        }
        const player = getWinnerFromArray(nArr);

        if (player) {
            output = player;
            return player;
        }

        nArr = [];
    }

    return output;
};

const parseBoard = (items: IGrid[]): IPlayer | undefined => {
    return (
        checkBoardColumns(items) ||
        checkBoardRows(items) ||
        checkBoardDiagonalRowsLeftToRight(items) ||
        checkBoardDiagonalRowsRightToLeft(items)
    );
};

export default parseBoard;
