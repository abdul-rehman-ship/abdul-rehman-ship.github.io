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

            


const query=await getDocs(collection(db,"users"));
            
const row=document.querySelector('#diseases_list')
query.forEach((doc)=>{
  
  
  
  
  
    if(doc.data().user_type==="farmer"){
    const item=`
<div class="col-md-4 mb-3 post">
<div class="card">
<div class=" d-flex justify-content-center ">
<img src='${doc.data().image}'  alt="img" class="img-fluid  avatar"/>
</div>

<div class="card-body">
  
  <p class="card-text d-flex justify-content-between" >
  <span><strong>username: </strong> ${
    doc.data().username
}</span>
<span><strong>type: </strong> ${
    doc.data().account_type
}</span>
    
  </p>
  <p class="card-text">
  <strong>email: </strong> 
    ${
        doc.data().email
    }
    </p>
  <button class="btn " id="del-btn" >delete ${doc.data().email}</button>
 
</div>
</div>
</div>

    `
    

    row.innerHTML+=item
    
}
})

const delBtn=document.querySelectorAll('#del-btn')
delBtn.forEach((btn)=>{
    btn.addEventListener('click',async (e)=>{
        // get button text
        const email=e.target.innerText.split(' ')[1]
        // confirm delete
        const confirm=window.confirm(`Are you sure you want to delete ${email}`)
        if(confirm){
            // delete user using email
            const query=await getDocs(collection(db,"users"));
            query.forEach(async (doc2)=>{
                if(doc2.data().email===email){
                    const id=doc2.id
                    console.log(id);
                    await deleteDoc(doc(db,"users",id))
                    window.location.reload()
                }
            })

        }
        
        // await deleteDoc(doc(db,"users",id))
        // window.location.reload()
    })
})
