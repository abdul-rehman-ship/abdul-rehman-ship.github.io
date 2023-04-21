import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword ,fetchSignInMethodsForEmail,updateProfile } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js'
import {collection, addDoc,getFirestore,getDocs } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

import {app} from './firebase.js'

const auth = getAuth(app);
const storage = getStorage(app)
const fileRef = ref(storage, 'images/');
const db=getFirestore(app)
let currentUser;

let flag=false

onAuthStateChanged(auth,async (user) => {
document.getElementById('loading').style.display="flex"
    
    
        if (user) {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
              if(doc.data().email===user.email){
               currentUser=doc.data()
               
               document.getElementById('img').setAttribute('src',currentUser.image)
            
       
              }
            });

            const query=await getDocs(collection(db,"consult_requests"));
            
            const row=document.querySelector('#diseases_list')
            query.forEach((doc)=>{
              
              
              
              
              if(doc.data().expert===currentUser.username){
                
                const item=`
          <div class="col-md-4 mb-3 post">
          <div class="card">
            <div class=" d-flex justify-content-center">
          <img src='${doc.data().user.image}' alt="img" class="img-fluid  avatar"/>
          </div>
            
            <div class="card-body">
              
              <p class="card-text">
                ${
                    doc.data().description.length>30?doc.data().description.substring(0,30)+"...":doc.data().description
                }
              </p>
              <a href="expertConsultRequestEdit.html?id=${doc.id}&email=${currentUser.email}" class="btn">Read More</a>
            </div>
          </div>
        </div>
        
                `
                
            
                row.innerHTML+=item
                flag=true
              }
            })

            if(flag===false){
              row.innerHTML="No request..."
            }

document.getElementById('loading').style.display="none"
           
    
    
         
        } else {

document.getElementById('loading').style.display="none"
    
    window.location.href="/"
    
         
        }
      });












const logout=document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    signOut(auth).then(() => {
        window.location.href="../index.html"
    }).catch((error) => {
        console.log(error)
    });
    })








