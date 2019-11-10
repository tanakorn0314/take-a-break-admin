import getFirebase from '../../lib/firebase';

export const promotionActionTypes = {
    GET_PROMOTIONS: 'GET_PROMOTIONS'
}

export const promotionActions = {
    getPromotions: () => (dispatch, getState) => {
        const { db } = getFirebase();
        db.collection('promotion').onSnapshot((snapshot) => {
            let arr = [];
            snapshot.forEach((res) => {
                arr.push({ id: res.id, ...res.data() });
            });
            dispatch({ type: promotionActionTypes.GET_PROMOTIONS, payload: [...arr] })
        })
    },
    addPromotion: (data) => (dispatch, getState) => {
        const { db } = getFirebase();
        db.collection('promotion').add(data)
        // dispatch({ type: promotionActionTypes.GET_PROMOTIONS, payload: [...getState().Promotion.promotions, data] });
    },
    updatePromotion: (data) => (dispatch, getState) => {
        const { id, ...restData } = data;
        const { db } = getFirebase();
        console.log(id, restData);
        db.doc(`promotion/${id}`).update({ ...restData });
    },
    deletePromotion: (id) => (dispatch, getState) => {
        const { db } = getFirebase();
        db.doc(`promotion/${id}`).delete();
    }
}