// Import the necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Configuration (use your own configuration)
const firebaseConfig = {
    apiKey: "AIzaSyBQMagd05QoWi37ERKm2sYxQAiIIcf1QIU",  // Replace with your actual API Key
    authDomain: "mini-hackathon-8e862.firebaseapp.com",  // Replace with your actual Auth Domain
    databaseURL: "https://mini-hackathon-8e862-default-rtdb.firebaseio.com",  // Replace with your Database URL
    projectId: "mini-hackathon-8e862",  // Replace with your Project ID
    storageBucket: "mini-hackathon-8e862.appspot.com",  // Replace with your Storage Bucket
    messagingSenderId: "1013027644993",  // Replace with your Messaging Sender ID
    appId: "1:1013027644993:web:4d055232d5f24ab914c8c0",  // Replace with your App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore and Realtime Database references
const db = getFirestore(app);  // Firestore
const rtdb = getDatabase(app); // Realtime Database

// Function to submit contact form data to Firestore
function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        // Submit to Firestore
        addDoc(collection(db, "contact_form_submissions"), {
            name: name,
            email: email,
            message: message,
            timestamp: serverTimestamp()
        })
        .then(() => {
            alert('Your message has been sent!');
            document.querySelector('form').reset();  // Reset the form after submission
        })
        .catch(error => {
            console.error('Error submitting contact form:', error);
        });
    }
}

// Attach the submit event to the contact form for Firestore submission
document.querySelector('form').addEventListener('submit', submitContactForm);