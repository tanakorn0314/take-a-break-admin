import getFirebase from '../../lib/firebase';

export const menuActionTypes = {
    GET_MENU: 'GET_MENU'
}

export const menuActions = {
    getMenus: () => (dispatch, getState) => {
        const { db } = getFirebase();
        return db.collection('menu').onSnapshot((snapshot) => {
            let arr = [];
            snapshot.forEach((res) => {
                arr.push({ id: res.id, ...res.data() });
            });
            dispatch({ type: menuActionTypes.GET_MENU, payload: [...arr] })
        })
    },
    addMenu: (data) => (dispatch, getState) => {
        const { db } = getFirebase();
        return db.collection('menu').add(data)
    },
    updateMenu: (data) => (dispatch, getState) => {
        const { id, ...restData } = data;
        const { db } = getFirebase();
        return db.doc(`menu/${id}`).update({ ...restData });
    },
    deleteMenu: (id) => (dispatch, getState) => {
        const { db } = getFirebase();
        return db.doc(`menu/${id}`).delete();
    }
}