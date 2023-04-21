
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
const query=await getDocs(collection(db,"diseases"));
            const row=document.querySelector('#diseases_list')
            query.forEach((doc)=>{

                if(doc.id===id){
                    
                   
                    document.getElementById('title').value=doc.data().title
                    document.getElementById('description').value=doc.data().description
                    document.getElementById('watering').value=doc.data().watering
                    
                }
            })
            const query2=await getDocs(collection(db,"users"));
            
            query2.forEach((doc)=>{
                

                if(doc.data().email===email){
                   currentUser=doc.data()
                   document.getElementById('cropType').innerText="List of " + currentUser.account_type
                   document.getElementById('img').setAttribute('src',currentUser.image)
                   if(doc.data().account_type==="crops"){
                    document.getElementById('gap').innerHTML="Gap between watering in days"
                    // document.getElementById('watering').setAttribute('placeholder',"Gap between watering in days")
                   }else if(doc.data().account_type==="fishes"){
                    document.getElementById('gap').innerHTML="Gap between feeding in days"
                    
                   }else if(doc.data().account_type==="animals"){
                    document.getElementById('gap').innerHTML="Gap between vaccination in days"
                   
                
                }
                    
                   
                   
                }}
            )
            document.getElementById('loading').style.display="none"



 const deleteBtn=document.querySelector('#deleteBtn')
            deleteBtn.addEventListener('click',async ()=>{
                document.getElementById('loading').style.display="flex"
                await deleteDoc(doc(db, "diseases", id));
                window.location.href="./farmerDiseases.html"
            }
            )

const updateBtn=document.querySelector('#signUpForm')
            updateBtn.addEventListener('submit',async (e)=>{
                e.preventDefault()
                document.getElementById('loading').style.display="flex"
                const title=document.getElementById('title').value
                const description=document.getElementById('description').value
                const watering=document.getElementById('watering').value
              
                
                    await updateDoc(doc(db, "diseases", id), {
                        title,
                        description,
                        watering,
                    });
                    
                    document.getElementById('loading').style.display="none"
                
                
            })