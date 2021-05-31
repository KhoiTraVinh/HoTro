import firebase from 'firebase';
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAUt1NLSRAewWJnUKJBRYL2hOLB-_JjYLg",
    authDomain: "getdataset-21775.firebaseapp.com",
    projectId: "getdataset-21775",
    storageBucket: "getdataset-21775.appspot.com",
    messagingSenderId: "877616180399",
    appId: "1:877616180399:web:10b6ea33f5bbf3cab2385a",
    measurementId: "G-2K2QQZQJWP"
};

class Fire {

    constructor(callback){
        this.init(callback)
    }

    init(callback){
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user){
                callback(null, user);
            }else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    });
            }
        });
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");


        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];


            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()});
            });


            callback(lists)
        })
    }


    addList(list) {
        let ref = this.ref;
        ref.add(list);
    }


    updateList(list){
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref(){
        return firebase
            .firestore()
            .collection("User1")
            .doc(this.userId)
            .collection("lists");
    }

    detach(){
        this.unsubscribe();
    }
}



export default Fire;