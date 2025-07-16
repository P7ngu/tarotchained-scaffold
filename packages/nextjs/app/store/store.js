// set up here state variables using jotai 
//useState = atom 

import {atom, createStore} from "jotai";

export const isTextBoxVisibleAtom = atom(false);
export const textBoxContentAtom = atom("");
export const store = createStore();
