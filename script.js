// Wedding invitation details — edit here if anything changes.
const wedding = {
  date: "2026-10-21T17:00:00+03:00", // Palestine local time in this example
  dateAr: "21 أكتوبر 2026",
  dateEn: "October 21, 2026",
  weekdayAr: "الأربعاء",
  weekdayEn: "Wednesday",
  timeAr: "الخامسة مساءً",
  timeEn: "5:00 PM",
  venueAr: "صالة لمسة ذهبية",
  venueEn: "Lamsat Thahabiya Hall",
  addressAr: "شارع الوحدة — مقابل مطعم بالميرا",
  addressEn: "Al-Wehda Street — opposite Palmira Restaurant"
};
const $ = (id) => document.getElementById(id);
let lang = "ar";
const two = n => String(n).padStart(2,"0");

function applyLanguageDetails(){
  $("heroDate").textContent = lang === "ar" ? `${wedding.weekdayAr}، ${wedding.dateAr}` : `${wedding.weekdayEn.toUpperCase()}, ${wedding.dateEn.toUpperCase()}`;
  $("weekday").textContent = lang === "ar" ? wedding.weekdayAr : wedding.weekdayEn;
  $("eventDate").textContent = lang === "ar" ? wedding.dateAr : wedding.dateEn;
  $("eventTime").textContent = lang === "ar" ? wedding.timeAr : wedding.timeEn;
  $("venueName").textContent = lang === "ar" ? wedding.venueAr : wedding.venueEn;
  $("venueAddress").textContent = lang === "ar" ? wedding.addressAr : wedding.addressEn;
}
function updateCountdown(){
  const diff = new Date(wedding.date).getTime() - Date.now();
  if(!Number.isFinite(diff)) return;
  if(diff <= 0){
    ["days","hours","minutes","seconds"].forEach(id => $(id).textContent = "00");
    $("countdownNote").textContent = lang === "ar" ? "اليوم يوم فرحتنا!" : "Today is our special day!";
    return;
  }
  const total = Math.floor(diff/1000);
  $("days").textContent = String(Math.floor(total/86400)).padStart(2,"0");
  $("hours").textContent = two(Math.floor((total%86400)/3600));
  $("minutes").textContent = two(Math.floor((total%3600)/60));
  $("seconds").textContent = two(total%60);
}
$("openInvitation").addEventListener("click", () => {
  $("welcomeScreen").classList.add("leaving");
  window.setTimeout(() => {
    $("welcomeScreen").hidden = true;
    $("invitationContent").hidden = false;
    window.scrollTo({top:0,behavior:"smooth"});
    document.querySelectorAll("#invitationContent .reveal").forEach(el => observer ? observer.observe(el) : el.classList.add("visible"));
  }, 450);
});
$("languageToggle").addEventListener("click", () => {
  lang = lang === "ar" ? "en" : "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-ar][data-en]").forEach(el => el.textContent = el.dataset[lang]);
  $("languageToggle").textContent = lang === "ar" ? "EN / عربي" : "عربي / EN";
  applyLanguageDetails();
  updateCountdown();
});
let observer = null;
if("IntersectionObserver" in window){
  observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
  }),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}else{
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}
applyLanguageDetails();
updateCountdown();
setInterval(updateCountdown,1000);
