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

            


const query=await getDocs(collection(db,"consult_requests"));
            const row=document.querySelector('#images')
            const row2=document.querySelector('#images2')

            query.forEach((doc)=>{

                if(doc.id===id){

                    
 const item= `  <div id="carouselExampleControls${doc.id}" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      ${
          doc.data().images.map((image,index)=>{
              return `<div class="carousel-item ${index===0?'active':''}">
              <img src="${image}" class="d-block w-100 img-fluid card-img avatar "  alt="...">
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
  </div>`
                row.innerHTML+=item
                const item2= `  <div id="carouselExampleControls${doc.id+9}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  ${doc.data().res_images && doc.data().res_images.length>0?
                      doc.data().res_images.map((image,index)=>{
                          return `<div class="carousel-item ${index===0?'active':''}">
                          <img src="${image}" class="d-block w-100 img-fluid  "  alt="...">
                        </div>
                          `
                      }):''
                  }
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${doc.id+9}" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${doc.id+9}" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>`
                            row2.innerHTML+=item2
                   
                    
                    document.getElementById('description').value=doc.data().description
                    document.getElementById('expert').value=doc.data().user.username
                    document.getElementById('expert2').value=doc.data().expert

                    
                    document.getElementById('response').value=doc.data().response?doc.data().response:'not provided'
                    
                    
                }
            })
           
            document.getElementById('loading').style.display="none"

