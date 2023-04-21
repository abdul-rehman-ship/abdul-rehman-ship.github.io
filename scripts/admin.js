
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword ,fetchSignInMethodsForEmail,updateProfile } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js'
import {collection, addDoc,getFirestore,getDocs,updateDoc,doc,deleteDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

import {app} from './firebase.js'

const auth = getAuth(app);
const storage = getStorage(app)
const fileRef = ref(storage, 'images/');
const db=getFirestore(app)
document.getElementById('loading').style.display="none"



const form=document.querySelector('#form');
form.addEventListener('submit',(e)=>{

    e.preventDefault()
    document.getElementById('loading').style.display="flex"
    const query=getDocs(collection(db,'admin_key'))
    query.then((querySnapshot)=>{
        if(querySnapshot.docs[0].data().key===form['key'].value){


document.getElementById('loading').style.display="none"

            window.location.href=`/pages/adminHome.html?key=${form['key'].value}`
        }else{
document.getElementById('loading').style.display="none"

            alert("Authentication failed")
        }
    })
})
