import getFirebase from '../../lib/firebase';

export const orderActionTypes = {
    GET_ORDER: 'GET_ORDER'
}

export const orderActions = {
    getOrder: () => (dispatch, getState) => {
        const { db } = getFirebase();
        db.collection('order').onSnapshot((snapshot) => {
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
    // updateMenu: (data) => (dispatch, getState) => {
    //     const { id, ...restData } = data;
    //     const { db } = getFirebase();
    //     db.doc(`order/${id}`).update({ ...restData });
    // },
    // deleteMenu: (id) => (dispatch, getState) => {
    //     const { db } = getFirebase();
    //     db.doc(`order/${id}`).delete();
    // }
}