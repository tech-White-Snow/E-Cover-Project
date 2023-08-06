import { RENDER, FINAL_LOADING } from "./types";
import axios from "axios";

export const render_start = (bg, mu) => async (dispatch) => {
    dispatch({
        type: FINAL_LOADING
    });
    console.log(mu);
    const update_layer_id = mu.mockup.layers.find(layer => layer.type === 'image').id;
    const options = {
        method: 'POST',
        url: 'https://api.mediamodifier.com/v2/mockup/render',
        headers: {
            api_key: '7279b6bf-f931-4b94-a7bd-05deb552e3cb',
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        data: {
            nr: mu.mockup.nr,
            layer_inputs: [
                {
                    id: update_layer_id,
                    data: bg.url,
                    crop: {x: 0, y: 0, width: bg.width, height: bg.height},
                    checked: true
                },
            ]
        }
    };
    const res = await axios.request(options);
    console.log(res.data)
    dispatch({
        type: RENDER,
        payload: res.data
    })
  };
  