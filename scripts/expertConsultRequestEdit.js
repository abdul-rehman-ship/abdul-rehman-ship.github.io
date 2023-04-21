
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword ,fetchSignInMethodsForEmail,updateProfile } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js'
import {collection, addDoc,getFirestore,getDocs,updateDoc,doc,deleteDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

import {app} from './firebase.js'

const auth = getAuth(app);
const storage = getStorage(app)
const fileRef = ref(storage, 'images/');
const db=getFirestore(app)
let currentUser;

function getQueryParams() {
    var queryString = window.location.search;
    var queryParams = {};
    if (queryString) {
        var params = queryString.substring(1).split("&");
        params.forEach(function(param) {
            var keyValue = param.split("=");
            queryParams[keyValue[0]] = keyValue[1];
        });
    }
    return queryParams;
}

let queryParams = getQueryParams();
let id=queryParams.id;
let email=queryParams.email;
if(!id){
    window.location.href="/expertConsultRequests.html"
}
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
                    document.getElementById('response').value=doc.data().response?doc.data().response:""
                    
                    
                }
            })
            const query2=await getDocs(collection(db,"users"));
            
            query2.forEach((doc)=>{
                

                if(doc.data().email===email){
                   currentUser=doc.data()
                   
                   document.getElementById('img').setAttribute('src',currentUser.image)
                
                }
                    
                   
                   
                }
            )
            document.getElementById('loading').style.display="none"



 const deleteBtn=document.querySelector('#deleteBtn')
            deleteBtn.addEventListener('click',async ()=>{
                document.getElementById('loading').style.display="flex"
                await deleteDoc(doc(db, "consult_requests", id));
                window.location.href="./ReqToExpert.html"
            }
            )
            const signUpForm=document.querySelector('#signUpForm');
const updateBtn=document.querySelector('#signUpForm')
            updateBtn.addEventListener('submit',async (e)=>{
                e.preventDefault()
              const  userData={
                    images:[]
                }
                const metadata = {
                    contentType: 'image/jpeg'
                  };
                document.getElementById('loading').style.display="flex"
                
                const response=document.getElementById('response').value
                if(signUpForm['res_images'].files.length){
                    for(let i=0;i<signUpForm['res_images'].files.length;i++){

                        const uploadTask = uploadBytesResumable(ref(storage, 'images/' + signUpForm['res_images'].files[i].name), signUpForm['res_images'].files[i],metadata);
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
                                if(i==signUpForm['res_images'].files.length-1){
                                  
                                    await updateDoc(doc(db, "consult_requests", id), {
                        
                                        response,
                                        res_images:userData.images
                                        
                                    });
                                    window.location.reload()
                                    
                                    document.getElementById('loading').style.display="none"
                                
                                }
                               
                            });
                          })
                     }
                }else{
                    await updateDoc(doc(db, "consult_requests", id), {
                        
                        response,
                        
                        
                    });
                    
                    window.location.reload()
                    document.getElementById('loading').style.display="none"
                

                }
                
        
                
              
                
                  
                
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
