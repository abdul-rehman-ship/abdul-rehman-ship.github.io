import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword ,fetchSignInMethodsForEmail,updateProfile } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js'
import {collection, addDoc,getFirestore,getDocs } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

import {app} from './firebase.js'

const auth = getAuth(app);
const storage = getStorage(app)
const fileRef = ref(storage, 'images/');
const db=getFirestore(app)
let currentUser;
let experts=[];
let usernames=[]
let account_type;



onAuthStateChanged(auth,async (user) => {
document.getElementById('loading').style.display="flex"
    
    
        if (user) {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
              if(doc.data().email===user.email){
               currentUser=doc.data()
               account_type=doc.data().account_type
               
               document.getElementById('cropType').innerText="List of " + currentUser.account_type
               document.getElementById('img').setAttribute('src',currentUser.image)
            
       
              }
             
              
             
            });
            const querySnapshot2 = await getDocs(collection(db, "users"));
            querySnapshot2.forEach((doc) => {
              if(doc.data().user_type==="expert" && doc.data().account_type===account_type){
                experts.push({name:doc.data().username,image:doc.data().image})
                
              
                

              }
            })
           console.log(experts);
    
const expertDropdown=document.getElementById("expertDropdown")
    
expertDropdown.innerHTML=`
<option value="">Select an expert...</option>
${experts.map((expert)=>{
  return `<option value="${expert.name}">
  <img src="${expert.image}" alt="${expert.name}" style="height: 20px; width: 20px; margin-right: 10px;">
  ${expert.name}
</option>`;
})
}
` 
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
            expert:signUpForm['username'].value,
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
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    
                    userData.images.push(downloadURL)
                    if(i==signUpForm['images'].files.length-1){
                      
                      addDoc(collection(db, "consult_requests"), {...userData,user:currentUser}).then((docRef) => {
                        document.getElementById('loading').style.display="none"
        
                        alert("Request sent successfully")
                        
        
                    }).catch((error) => {
        document.getElementById('loading').style.display="none"
        
                        alert(error.message)
        
                    })
                    }
                   
                });
              })
         }

           
          
    



    })






    const input = document.getElementById("autocomplete");
    const suggestions = document.getElementById("suggestions");
    
    
    // input.addEventListener("input", function(event) {
    //   const searchTerm = event.target.value;
    //   if(event.target.value===""){
    //     suggestions.innerHTML = "";
    //     return
    //   }
    //   let matches = experts.filter(function(value) {
    //     return value.name.startsWith(searchTerm);
    //   });
    
    //   suggestions.innerHTML = "";
    //   for (const match of matches) {
    //     const li = document.createElement("li");
    //     li.setAttribute("id", "suggestionLi");
    //     const img = document.createElement("img");
    //     img.setAttribute("class", "suggestion-image")
        
    //     img.src = match.image;
    //     img.alt = match.name;
    //     li.appendChild(img);
    //     li.appendChild(document.createTextNode(match.name));
    //     li.addEventListener("click", function() {
    //       // handle the click event on the li element
    //       input.value = match.name;
    //       suggestions.innerHTML = "";
    //     });
    //     suggestions.appendChild(li);
       
    //   }
    // });
    
  
    
    
    
    
   
const logout=document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    signOut(auth).then(() => {
        window.location.href="../index.html"
    }).catch((error) => {
        console.log(error)
    });
    })
