import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword ,fetchSignInMethodsForEmail,updateProfile } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js'
import {collection, addDoc,getFirestore,getDocs } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

import {app} from './firebase.js'

const auth = getAuth(app);
const storage = getStorage(app)
const fileRef = ref(storage, 'images/');
const db=getFirestore(app)
let currentUser;



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

            const query=await getDocs(collection(db,"diseases"));
            const row=document.querySelector('#diseases_list')
            query.forEach((doc)=>{
              if(doc.data().user.email===currentUser.email){
                const item=`
                <div class="col-md-4 mb-3 post">
          <div class="card">
            <div id="carouselExampleControls${doc.id}" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                ${
                    doc.data().images.map((image,index)=>{
                        return `<div class="carousel-item ${index===0?'active':''}">
                        <img src="${image}" class="d-block w-100 img-fluid card-img "  alt="...">
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
            <div class="card-body">
              <h5 class="card-title">${doc.data().title}</h5>
              <p class="card-text">
                ${
                    doc.data().description.length>30?doc.data().description.substring(0,30)+"...":doc.data().description
                }
              </p>
              <a href="farmerEdit.html?id=${doc.id}&email=${currentUser.email}" class="btn">Read More</a>
            </div>
          </div>
        </div>
        
                `
                
            
                row.innerHTML+=item
              }
               
            })
            

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
