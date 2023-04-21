import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword ,fetchSignInMethodsForEmail,updateProfile } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js'
import {collection, addDoc,getFirestore,getDocs } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

import {app} from './firebase.js'

const auth = getAuth(app);
const storage = getStorage(app)
const fileRef = ref(storage, 'images/');
const db=getFirestore(app)
let currentUser;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id=urlParams.get('id')



onAuthStateChanged(auth,async (user) => {
document.getElementById('loading').style.display="flex"
    
    
        if (user) {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
              if(doc.data().email===user.email){
               currentUser=doc.data()
               document.getElementById('cropType').innerText="List of " + currentUser.account_type
               document.getElementById('img').setAttribute('src',currentUser.image)
            
       
              }
            });
document.getElementById('loading').style.display="none"
           
    
    
         
        } else {

document.getElementById('loading').style.display="none"
    
    window.location.href="/"
    
         
        }
      });




      
      


      const query=await getDocs(collection(db,"posts"));
      const row =document.getElementById('row')
      let item;
      query.forEach((doc)=>{

        if(doc.id===id){
          
        item=`<div class="col-md-8">
       <div id="carouselExampleControls${doc.id}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          ${
              doc.data().images.map((image,index)=>{
                  return `<div class="carousel-item ${index===0?'active':''}">
                  <img src="${image}" class="d-block w-100 img-fluid  "  alt="...">
                </div>
                  `
              })
          }
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${doc.id}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${doc.id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      
       <h1 class="mt-3" style="color:#FF416C;">${doc.data().title}</h1>
       
       <p class="lead">Post Description:</p>
       
         <p class="lead">${doc.data().description}</p>
     </div>`
      }
        
         row.innerHTML=item
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
    