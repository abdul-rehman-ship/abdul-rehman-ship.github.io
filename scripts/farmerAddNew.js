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
               if(doc.data().account_type==="fishes"){
                
                document.getElementById('gap').setAttribute("placeholder","Gap between feeding in days")
              }else if(doc.data().account_type==="crops"){
                document.getElementById('gap').setAttribute("placeholder","Gap between watering in days")
              } else if(doc.data().account_type==="animals"){
                document.getElementById('gap').setAttribute("placeholder","Gap between vaccination in days")
              }
       
              }
              

            });
document.getElementById('loading').style.display="none"
           
    
    
         
        } else {

document.getElementById('loading').style.display="none"
    
    window.location.href="/"
    
         
        }
      });




const signUpForm=document.querySelector('#signUpForm');
    signUpForm.addEventListener('submit',(e)=>{
document.getElementById('loading').style.display="flex"



        e.preventDefault();
        const userData={
            title:signUpForm['title'].value,
            description:signUpForm['description'].value,
            watering:signUpForm['watering'].value,
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
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    
                    userData.images.push(downloadURL)
                    if(i==signUpForm['images'].files.length-1){
                      addDoc(collection(db, "diseases"), {...userData,user:currentUser}).then((docRef) => {
                        document.getElementById('loading').style.display="none"
        
                        alert("Item Added Successfully")
                        window.location.href="./farmerDiseases.html"
        
                    }).catch((error) => {
        document.getElementById('loading').style.display="none"
        
                        alert(error.message)
        
                    })
                    }
                   
                });
              })
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
