



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
























document.getElementById('loading').style.display="none"







const signUpForm=document.querySelector('#signUpForm');
    signUpForm.addEventListener('submit',(e)=>{
        e.preventDefault();

document.getElementById('loading').style.display="flex"



        const userData={
            title:signUpForm['title'].value,
            description:signUpForm['description'].value,
            
            images:[],


        }
        const metadata = {
            contentType: 'image/jpeg'
          };
          let taskFlag=0;
         for(let i=0;i<signUpForm['images'].files.length;i++){

            const uploadTask = uploadBytesResumable(ref(storage, 'images/' + signUpForm['images'].files[i].name), signUpForm['images'].files[i],metadata);
            uploadTask.on('state_changed', (snapshot) => {  
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              }, (error) => {
                console.log(error)
              }, () => {    
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    
                    userData.images.push(downloadURL)
                    if(i==signUpForm['images'].files.length-1){
                      
                    await  addDoc(collection(db, "posts"), {...userData}).then((docRef) => {
                        document.getElementById('loading').style.display="none"
        
                        alert("Post  added successfully")
                        
        
                    }).catch((error) => {
        document.getElementById('loading').style.display="none"
        
                        alert(error.message)
        
                    })
                    }
                   
                });
              })
         }

           
          
    



    })
