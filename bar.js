<script>
  function register() {
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const message = document.getElementById("message");

    if (!email || !password) {
      message.innerText = "Please fill out both email and password fields.";
      return;
    }

    // Simulate registration (You'd call your backend here)
    console.log("Registering:", email, password);
    message.innerText = "Registration successful (simulated)!";
  }

  function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const message = document.getElementById("message");

    if (!email || !password) {
      message.innerText = "Both login fields are required.";
      return;
    }

    // Simulate login (Replace this with real authentication)
    console.log("Logging in:", email, password);
    message.innerText = "Login successful (simulated)!";
  }
</script>

// Register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).send('User already exists');
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });
  res.send('User registered');
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send('Invalid credentials');
  const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '2h' });
  res.json({ token });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
const API_URL = "http://localhost:3000";
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAfnpQg_8N_xDtgW5xaE9voyNwD6DjC6W0",
    authDomain: "website-5f3c2.firebaseapp.com",
    projectId: "website-5f3c2",
    storageBucket: "website-5f3c2.firebasestorage.app",
    messagingSenderId: "913589989589",
    appId: "1:913589989589:web:4a409d41b23ee352dfb25c",
    measurementId: "G-D2T7NBLKSE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
// scripts/firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBX4XCQTthPCpuNhqFH-QrTbCuzHtTTKaE",
  authDomain: "barcelona-website-56820.firebaseapp.com",
  projectId: "barcelona-website-56820",
  appId: "1:897449643146:web:bec52de73498a2c42cf173"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
// scripts/auth.js
import { auth } from "./firebase-init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function initAuthState() {
  onAuthStateChanged(auth, (user) => {
    const userInfo = document.getElementById("user-info");
    const logoutBtn = document.getElementById("logout-btn");
    if (user) {
      userInfo.textContent = `Logged in as: ${user.email}`;
      logoutBtn.style.display = "inline-block";
    } else {
      userInfo.textContent = "";
      logoutBtn.style.display = "none";
    }
  });
}
// scripts/ui.js

export function initMobileMenu() {
  const menuIcon = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  menuIcon?.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

export function initScrollBtn() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

export function initTheme() {
  const toggle = document.getElementById('darkModeToggle');
  const userPref = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (userPref === 'dark' || (!userPref && prefersDark)) {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }

  toggle?.addEventListener('change', () => {
    const isDark = toggle.checked;
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

export function initTranslation() {
  const switcher = document.getElementById('language-switcher');
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  switcher.value = savedLang;
  translatePage(savedLang);

  switcher?.addEventListener("change", e => {
    const lang = e.target.value;
    localStorage.setItem("selectedLanguage", lang);
    translatePage(lang);
  });
}

function translatePage(lang) {
  const translations = {
    en: {
      welcome: "Welcome to FC Barcelona Fan Zone",
      tagline: "Your hub for the latest news, scores, and fan glory!",
      joinNow: "Join Now",
    },
    es: {
      welcome: "Bienvenido a la Zona de Fans del FC Barcelona",
      tagline: "Tu centro para las últimas noticias, resultados y gloria culé!",
      joinNow: "Únete Ahora",
    }
  };
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach(el => {
    const key = el.getAttribute("data-key");
    el.textContent = translations[lang]?.[key] || translations['en'][key] || key;
  });
}

export function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert(`You're subscribed: ${email}`);
      emailInput.value = '';
    } else {
      alert('Invalid email. Try again.');
    }
  });
}

export function initComments() {
  const form = document.getElementById('comment-form');
  const list = document.getElementById('comment-list');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const comment = form.querySelector('#comment').value.trim();
    if (name && comment) {
      const li = document.createElement('li');
      const now = new Date().toLocaleTimeString();
      li.innerHTML = `<strong>${name}:</strong> ${comment} <small>(${now})</small>`;
      list.appendChild(li);
      form.reset();
    } else {
      alert('Both fields required!');
    }
  });
}

export function initCardFlip() {
  document.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
}
// scripts/main.js
import {
  initMobileMenu,
  initScrollBtn,
  initTheme,
  initTranslation,
  initNewsletter,
  initComments,
  initCardFlip
} from './ui.js';

import { initAuthState } from './auth.js';

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollBtn();
  initTheme();
  initTranslation();
  initNewsletter();
  initComments();
  initCardFlip();
  initAuthState();
});
// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/barca-fans', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
}));

const SECRET = process.env.JWT_SECRET || 'barca2025';

// Register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).send('User already exists');
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });
  res.send('User registered');
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send('Invalid credentials');
  const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '2h' });
  res.json({ token });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
const API_URL = "http://localhost:3000";
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAfnpQg_8N_xDtgW5xaE9voyNwD6DjC6W0",
    authDomain: "website-5f3c2.firebaseapp.com",
    projectId: "website-5f3c2",
    storageBucket: "website-5f3c2.firebasestorage.app",
    messagingSenderId: "913589989589",
    appId: "1:913589989589:web:4a409d41b23ee352dfb25c",
    measurementId: "G-D2T7NBLKSE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>