import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCpFhXgZXzcmhzZKpRX0rK9goj6JFY8Cak",
    authDomain: "todolistapp-b448f.firebaseapp.com",
    databaseURL: "https://todolistapp-b448f.firebaseio.com",
    projectId: "todolistapp-b448f",
    storageBucket: "todolistapp-b448f.appspot.com",
    messagingSenderId: "384860702219",
    appId: "1:384860702219:web:683edadd2326f24663e90e"
};

class Fire {
    constructor(callback){
        this.init(callback);
    }
    init(callback){
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user){
                callback(null,user);
            }else{
                firebase.auth().signInAnonymously().catch(error => { callback(error); })
            }
        })
    }

    getLists(callback){
        let ref = this.ref.orderBy("name");

        this.unsubscribe = ref.onSnapshot(snapshot =>{
            lists = [];

            snapshot.forEach(doc => {
                lists.push({id: doc.id , ...doc.data() });
            });

            callback(lists);
        });
    }

    addList(list){
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list){
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }

    get userId(){
        return firebase.auth().currentUser.uid
    }

    get ref(){
        return firebase.firestore().collection("users").doc(this.userId).collection("lists");
    }
    

    detach(){
        this.unsubscribe();
    }

}

export default Fire;