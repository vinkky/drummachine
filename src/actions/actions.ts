import { createAction } from "typesafe-actions";

export const toggle = createAction("SET_INDEX", (resolve) => {
  return (index: number) => resolve(index);
});
// (id: string) => { type: 'todos/TOGGLE'; payload: string; }
