import { RENDER, FINAL_LOADING, RENDERED } from "./types";
import axios from "axios";

export const render_start = () => async (dispatch) => {
    dispatch({
        type: FINAL_LOADING
    });
};

export const render_end = () => async (dispatch) => {
    dispatch({
        type: RENDER,
        payload: ""
    });
    dispatch({
        type: RENDERED,
        payload: ""
    })
};