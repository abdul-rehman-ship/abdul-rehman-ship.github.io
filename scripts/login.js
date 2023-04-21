import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword ,fetchSignInMethodsForEmail,updateProfile } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js'
import {collection, addDoc,getFirestore,getDocs } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

import {app} from './firebase.js'

const auth = getAuth(app);
const storage = getStorage(app)
const db=getFirestore(app)

document.getElementById('loading').style.display="none"




  onAuthStateChanged(auth,async (user) => {
document.getElementById('loading').style.display="flex"

	if (user) {
		const querySnapshot = await getDocs(collection(db, "users"));
		querySnapshot.forEach((doc) => {
		  if(doc.data().email===user.email){
			if(doc.data().user_type=="expert"){
				window.location.href="./pages/expertHome.html"
			}else{
				window.location.href="./pages/farmerHome.html"
			}
		  }
		});

document.getElementById('loading').style.display="none"

	 
	} else {
document.getElementById('loading').style.display="none"

	 
	}
  });



 const signUpForm=document.querySelector('#signUpForm');
 signUpForm.addEventListener('submit',async(e)=>{
document.getElementById('loading').style.display="flex"

	e.preventDefault();
	const userData={
		name:signUpForm['fullName'].value,
		email:signUpForm['email'].value,
		password:signUpForm['password'].value,
		account_type:signUpForm['account_type'].value,
		image:signUpForm['img'].value,
		username:signUpForm['username'].value,
		user_type:signUpForm['user_type'].value,
	}
let flag=false
	const querySnapshot = await getDocs(collection(db, "users"));
	querySnapshot.forEach((doc) => {		
		if(doc.data().username===userData.username){
			document.getElementById('loading').style.display="none"
flag=true
			alert("Username already exists")		
			return
		}
	});
if(flag){
	return
}else{
	if(validateData(userData)){
		fetchSignInMethodsForEmail(auth,signUpForm['email'].value)
  .then((methods) => {
    if (methods.length === 0) {
      
		createUserWithEmailAndPassword(auth, signUpForm['email'].value, signUpForm['password'].value)
		  .then((userCredential) => {
const fileRef = ref(storage, `img/${signUpForm['email'].value}`)

			const metadata = {
				contentType: 'image/jpeg'
			  };
			  const uploadTask = uploadBytesResumable(fileRef, signUpForm['img'].files[0], metadata);
		
uploadTask.on(
    "state_changed",
    (snapshot) => {
      
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      console.error(error);
    },
    () => {
		getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
			try {
				const docRef = await addDoc(collection(db, "users"), {
					name:signUpForm['fullName'].value,
					email:signUpForm['email'].value,
					account_type:signUpForm['account_type'].value,
					image:downloadURL,
					user_type:signUpForm['user_type'].value,
					username:signUpForm['username'].value
				});
			  
				if(signUpForm['user_type'].value=="expert")
				{window.location.href="./pages/expertHome.html"

				}else{
					window.location.href="./pages/farmerHome.html"
				}
			  } catch (e) {
				console.error("Error adding document: ", e);
			  }
		  });
document.getElementById('loading').style.display="none"

    }
  );
			
		  })
		  .catch((error) => {
document.getElementById('loading').style.display="none"

			alert(error.message);
			return

		  })
    } else {
document.getElementById('loading').style.display="none"

		alert('User already exists. please login to continue.')
		return
      
    }
  })
  .catch((error) => {
document.getElementById('loading').style.display="none"

    console.error(error);
  });

	}else{
document.getElementById('loading').style.display="none"

		alert("Please fill all the fields")
	}
}

	
	
	




 })

const login=document.querySelector('#login');
login.addEventListener('submit',(e)=>{
document.getElementById('loading').style.display="flex"
	e.preventDefault()
	signInWithEmailAndPassword(auth,login['loginEmail'].value, login['loginPassword'].value)
    .then(async() => {
	
document.getElementById('loading').style.display="none"


      
    })
    .catch((error) => {
      console.error(error.message);
	  alert(error.message)
document.getElementById('loading').style.display="none"

      
    });

})


const validateData=(data)=>{
	if(data.name=="" || data.email=="" || data.password=="" || data.account_type=="" || data.account_type=="0" || data.image=="" || data.user_type==""){
		return false
	}else if(data.password.length<8 ){
		return false
	}
	else if(data.name.length<3 || data.name.length>20 ){
		return false
	}
	
	else{
		return true
	}

}



const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});