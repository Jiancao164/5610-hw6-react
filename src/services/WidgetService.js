import {TOPICS_WIDGETS_API_URL, WIDGETS_API_URL} from "../common/constants";

export const findWidgetsForTopic = (tid) =>
    fetch(TOPICS_WIDGETS_API_URL(tid))
        .then(response => response.json());
//https://murmuring-inlet-83447.herokuapp.com
//http://localhost:8080
export const updateWidget = (wid, widget) =>
    fetch(`${WIDGETS_API_URL}/${wid}`, {
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    }).then(response => response.json());


export const deleteWidget = (widgetId) =>
    fetch(`${WIDGETS_API_URL}/${widgetId}`, {
        method: "DELETE"
    }).then(response => response.json());


export const createWidget = (tid, widget) =>
    fetch(TOPICS_WIDGETS_API_URL(tid), {
        method: "POST",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    }).then(response => response.json());
