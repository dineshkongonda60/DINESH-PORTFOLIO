// ✅ Initialize AOS animation
AOS.init();
/* Timeline reveal on scroll */
const timelineItems = document.querySelectorAll('.timeline-row');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'all 0.6s ease';
  observer.observe(item);
});

/* ✅ Netlify Form + Neon Success Popup */
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        // ✅ Submit to Netlify using fetch
        await fetch("/", {
            method: "POST",
            body: formData
        });

        // ✅ Show neon popup
        const popup = document.getElementById("success-popup");
        popup.classList.add("show");

        // ✅ Hide popup after 3 seconds
        setTimeout(() => {
            popup.classList.remove("show");
        }, 3000);

        // ✅ Reset form
        form.reset();

    } catch (error) {
        alert("❌ Failed to send message. Please try again.");
        console.error("Netlify Form Error:", error);
    }
});


/* ---------------------------------------------------
   ✅ Dynamic Experience Counter (From 2014)
--------------------------------------------------- */
function animateExperience(finalValue) {
  let current = 0;
  const element = document.getElementById("experienceCounter");

  const timer = setInterval(() => {
    element.textContent = current + "+";
    current++;

    if (current > finalValue) clearInterval(timer);
  }, 100);
}

function updateExperience() {
  const startYear = 2014;
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;

  animateExperience(years);
}

updateExperience();

/* ---------------------------------------------------
   ✅ Typing Animation
--------------------------------------------------- */
const roles = [
  "RPA Solution Architect",
  "Automation Anywhere Expert",
  "SAP Automation Specialist",
  "Document Automation Engineer",
  "AI + LLM Automation Architect"
];

let index = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");

function type() {
  if (charIndex < roles[index].length) {
    typingElement.textContent += roles[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 90);
  } else {
    setTimeout(erase, 1200);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = roles[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(type, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  type();
});

/* ---------------------------------------------------
   ✅ Floating RPA Bots (optional hologram effect)
--------------------------------------------------- */
document.querySelectorAll(".rpa-bot").forEach((bot) => {
  bot.style.animationDuration = `${5 + Math.random() * 3}s`;
});

/* ---------------------------------------------------
   ✅ Project Modal Popup Logic
--------------------------------------------------- */
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const closeBtn = document.querySelector(".close-btn");

// ✅ Open modal when clicking View Project
document.querySelectorAll(".project-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");

    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.description;
    modalTech.textContent = card.dataset.tech;

    modal.style.display = "block";
  });
});

// ✅ Close modal on (×)
closeBtn.onclick = () => {
  modal.style.display = "none";
};

// ✅ Close modal by clicking outside modal box
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};