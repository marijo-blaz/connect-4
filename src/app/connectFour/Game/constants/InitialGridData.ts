import IGrid from "app/connectFour/shared/interfaces/IGrid";

const INITIAL_GRID_DATA = Array.from<undefined, IGrid>(
    { length: 7 },
    (_, i) => {
        return {
            id: i,
            rows: Array.from({ length: 6 }, (_, i) => {
                return { id: i, isPopulated: false, player: undefined };
            }),
        };
    }
);

export default INITIAL_GRID_DATA;
