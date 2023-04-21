import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

import {app} from './firebase.js'
document.getElementById('loading').style.display="none"


const auth = getAuth(app);
const forgot_password_form=document.querySelector('#forgot_password_form');
forgot_password_form.addEventListener('submit',(e)=>{
document.getElementById('loading').style.display="flex"
	e.preventDefault()
	sendPasswordResetEmail(auth, forgot_password_form['email'].value)
  .then(() => {
document.getElementById('loading').style.display="none"
	alert('Password reset email sent!.check your email')
}).catch((error) => {
document.getElementById('loading').style.display="none"

	const errorCode = error.code;
	const errorMessage = error.message;
	alert(errorMessage)
  });

})