import * as api from "../Api"

export const fetchallchannel = () => async (dispatch) => {
    try {
        const { data } = await api.fetchallchannel()
        dispatch({ type: "FETCH_CHANELS", payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updatechaneldata = (id, updatedata) => async (dispatch) => {
    try {
        const { data } = await api.updatechaneldata(id, updatedata)
        dispatch({ type: "UPDATE_DATA", payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const userpoint = (pointdata) => async (dispatch) => {
    try {
        const { id } = pointdata
        console.log(id)
        const { data } = await api.userpoints(id)
        dispatch({ type: "POST_POINTS", payload: data })
    } catch (error) {
        console.log(error)
    }
}