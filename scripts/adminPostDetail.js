const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const key = urlParams.get('key'); 
const id=urlParams.get('id')

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



let desc,title
const query=await getDocs(collection(db,"posts"));
            const row =document.getElementById('row')
            let item;
            query.forEach((doc)=>{

              if(doc.id===id){
                desc=doc.data().description
                title=doc.data().title
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
            
             <h1 class="mt-3">Post Title</h1>
             <input type="text" class="form-control" value="${doc.data().title}" id="title" placeholder="Title">
             <p class="lead">Post Description</p>
             
                <textarea class="form-control" id="description" rows="3">${doc.data().description}</textarea>
           </div>`
            }
              
               row.innerHTML=item
            })
            
            document.getElementById('deleteBtn').addEventListener('click',async ()=>{
document.getElementById('loading').style.display="flex"

                await deleteDoc(doc(db,'posts',id))
document.getElementById('loading').style.display="none"

                window.location.href="/pages/adminHome.html?key="+key
            })
            document.getElementById('updateBtn').addEventListener('click',async ()=>{
document.getElementById('loading').style.display="flex"
                if(desc!==document.getElementById('description').value || title!==document.getElementById('title').value){
                await updateDoc(doc(db,'posts',id),{
                    title:document.getElementById('title').value,
                    description:document.getElementById('description').value
                })

            }
document.getElementById('loading').style.display="none"

            })