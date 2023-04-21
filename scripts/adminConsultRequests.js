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
            
const row=document.querySelector('#diseases_list')
query.forEach((doc)=>{
  
  
  
  
  
    
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
  <a href="adminConsultRequestDetail.html?key=${key}&id=${doc.id}" class="btn">Read More</a>
</div>
</div>
</div>

    `
    

    row.innerHTML+=item
    
  
})
