import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword ,fetchSignInMethodsForEmail,updateProfile } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js'
import {collection, addDoc,updateDoc,doc,getFirestore,getDocs } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

import {app} from './firebase.js'

const auth = getAuth(app);
const storage = getStorage(app)
const fileRef = ref(storage, 'images/');
const db=getFirestore(app)
let currentUser;
let experts=[];
let usernames=[]
let account_type=[]



onAuthStateChanged(auth,async (user) => {
document.getElementById('loading').style.display="flex"
    
    
        if (user) {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
              if(doc.data().email===user.email){
               currentUser=doc.data()
               account_type=doc.data().account_type
               
               document.getElementById('cropType').innerText="List of " + currentUser.account_type
               document.getElementById('img').setAttribute('src',currentUser.image)
                document.getElementById('name').value=currentUser.name
                document.getElementById('email').value=currentUser.email
                document.getElementById('username').value=currentUser.username

       
              }
             
              
              if(doc.data().user_type==="expert" && doc.data().account_type==account_type){
                experts.push({name:doc.data().username,image:doc.data().image})
                
                

              }
            });
document.getElementById('loading').style.display="none"
           
    
    
         
        } else {

document.getElementById('loading').style.display="none"
    
    window.location.href="/"
    
         
        }
      });




const signUpForm=document.querySelector('#signUpForm');
    signUpForm.addEventListener('submit',async(e)=>{
      e.preventDefault();

document.getElementById('loading').style.display="flex"


const name=document.querySelector('#name').value;
if(name!==currentUser.name){
  const query=await getDocs(collection(db,"users"));
  query.forEach(async (doc2)=>{
    if(doc2.data().email===currentUser.email){
      const id=doc2.id
      await updateDoc(doc(db, "users", id), {
        name: name
      });
      currentUser.name=name

    }})


}
      
      
        

           
          
    
        document.getElementById('loading').style.display="none"



    })






  
    
  
    
    
    
    
   
const logout=document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    signOut(auth).then(() => {
        window.location.href="../index.html"
    }).catch((error) => {
        console.log(error)
    });
    })
