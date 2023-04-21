
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
    window.location.href="/farmerDiseases.html"
}
const query=await getDocs(collection(db,"consult_requests"));
            const row=document.querySelector('#diseases_list')
            query.forEach((doc)=>{

                if(doc.id===id){
                    
                   
                    
                    document.getElementById('description').value=doc.data().description
                    document.getElementById('expert').value=doc.data().expert
                    document.getElementById('response').value=doc.data().response?doc.data().response:""
                    
                    
                }
            })
            const query2=await getDocs(collection(db,"users"));
            
            query2.forEach((doc)=>{
                

                if(doc.data().email===email){
                   currentUser=doc.data()
                   document.getElementById('cropType').innerText="List of " + currentUser.account_type
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

const updateBtn=document.querySelector('#signUpForm')
            updateBtn.addEventListener('submit',async (e)=>{
                e.preventDefault()
                document.getElementById('loading').style.display="flex"
                
                const description=document.getElementById('description').value
                
              
                
                    await updateDoc(doc(db, "consult_requests", id), {
                        
                        description,
                        
                    });
                    
                    document.getElementById('loading').style.display="none"
                
                
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
