import { IGridColumn } from "app/shared/interfaces";

const INITIAL_GRID_DATA = Array.from<undefined, IGridColumn>(
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
