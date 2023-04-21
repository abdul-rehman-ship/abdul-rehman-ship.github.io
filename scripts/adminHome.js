const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const key = urlParams.get('key'); 
import {collection, addDoc,getFirestore,getDocs,updateDoc,doc,deleteDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js'

import {app} from './firebase.js'
const db=getFirestore(app)

const storage = getStorage(app)
const fileRef = ref(storage, 'images/');

const adminKey=await getDocs(collection(db,'admin_key'))
if(adminKey.docs[0].data().key!==key){
    window.location.href="/admin.html"
}
document.getElementById('loading').style.display="none"

document.getElementById('newPost').addEventListener('click',()=>{
    window.location.href=`/pages/adminAddNewPost.html?key=${key}`
})
document.getElementById('farmers').addEventListener('click',()=>{
    window.location.href="/pages/adminFarmers.html?key="+key
})
document.getElementById('experts').addEventListener('click',()=>{
    window.location.href="/pages/adminExperts.html?key="+key
})
document.getElementById('requests').addEventListener('click',()=>{
    window.location.href="/pages/adminConsultRequests.html?key="+key
})
document.getElementById('post').addEventListener('click',()=>{
    window.location.href="/pages/adminHome.html?key="+key
})
const query=await getDocs(collection(db,"posts"));
            const row=document.querySelector('#diseases_list')
            query.forEach((doc)=>{
              if(doc.data()){
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
              <a href="adminPostDetail.html?key=${key}&id=${doc.id}" class="btn">Read More</a>
            </div>
          </div>
        </div>
        
                `
                
            
                row.innerHTML+=item
            }
              
               
            })
            

