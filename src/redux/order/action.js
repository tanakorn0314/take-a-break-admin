import getFirebase from '../../lib/firebase';

export const orderActionTypes = {
    GET_ORDER: 'GET_ORDER'
}

export const orderActions = {
    getOrder: () => (dispatch, getState) => {
        const { db } = getFirebase();
        return db.collection('order').onSnapshot((snapshot) => {
            let arr = [];
            snapshot.forEach((res) => {
                arr.push({ id: res.id, ...res.data() });
            });
            dispatch({ type: orderActionTypes.GET_ORDER, payload: [...arr] })
        })
    },
    addOrder: (data) => (dispatch, getState) => {
        const { db } = getFirebase();
        return db.collection('order').add(data)
    },
    updateOrder: (data) => (dispatch, getState) => {
        const { id, ...restData } = data;
        const { db } = getFirebase();
        db.doc(`order/${id}`).update({ ...restData });
    },
    deleteOrder: (id) => (dispatch, getState) => {
        const { db } = getFirebase();
        return db.doc(`order/${id}`).delete();
    }
}