/* 
----------------------------------------
-- Script to handle language settings --
----------------------------------------
*/

$('[lang]').not('html').hide();              // hide all lang attributes on start (except HTML doc).
$('[lang="en"]').show();                     // show just English by default


/* 
* --------------------------------------------
* ---------------- LANG SWITCH --------------- 
* -------------------------------------------- 
*/
var lang_switch = $('#lang-switch');
var lang_switch_container = lang_switch.parent();

lang_switch.change(function () {              // put onchange event when user select check the language box
    let checked = $(this).is(':checked');
    if (!checked) {
      // off = english
      setLanguage('en');
      
    } else {
      // on = italian
      setLanguage('it');
    }
});


/**
 * Function to set the page's language.
 * @param {string} lang 
 */
function setLanguage(lang) {
  if (typeof lang === 'string' && (lang == 'en' || lang == 'it')) {

    // Translate
    $('[lang]').not('html').hide();
    $(`[lang="${lang}"]`).show();
    lang_switch_container.removeClassStartingWith("lang");
    lang_switch_container.addClass(`lang-${lang}`);
    translate(lang);

    // Update URL
    let currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('lang', lang);
    history.pushState({}, "", currentUrl);

  } else {
    console.error(`Not a valid language! (${lang})`);
  }
}


/* 
* --------------------------------------------
* --------- Set language by URL param --------
* --------------------------------------------
*/
function setLanguageByUrlParam() {
  let currentUrl = new URL(window.location.href);
  let currentLangParam = currentUrl.searchParams.get('lang');
  if ( currentLangParam === null) {
    // Default language: en
    currentUrl.searchParams.set('lang', 'en');
  } else {
    if (currentLangParam === 'en') {
      lang_switch.prop("checked", true);
      lang_switch.click();
    } else {
      if (currentLangParam === 'it') {
        lang_switch.prop("checked", false);
        lang_switch.click();
      } else {
        console.error(`Not a valid language! (${lang})`);
        return;
      }
    }
  }
}
setLanguageByUrlParam();


/* 
* --------------------------------------------
* ----- Dropdown menu switch alternative -----
* --------------------------------------------
*//*
var dropbtn = $('.dropbtn');

// Attach toggle listener to dropdown menu
const toggleVisibilityDropdown = function () {
    $(this).parent('.dropdown').children('.dropdown-content').toggleClass("show");
};
dropbtn.on('click', toggleVisibilityDropdown);

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}*/


/**
 * Function to translate critic dynamic elements.
 * For standard translation please use 'lang' HTML attribute.
 * @param {string} language 
 */
function translate(language) {
  if (typeof language === 'string') {
    
    // --- ELEMENTS ---
    let html = document.querySelector('html');
    let meta_locale = document.querySelector('meta[name="locale"]');
    let meta_description = document.querySelector('meta[name="description"]');
    let meta_og_locale = document.querySelector('meta[property="og:locale"]');
    let meta_og_description = document.querySelector('meta[property="og:description"]');

    let nav_ul = $('#nav ul');
    let nav_item_intro_a = $('#nav-item-intro').children('a');
    let nav_item_first_a = $('#nav-item-first').children('a');

    // --- ENGLISH ---
    if (language === 'en') {
      html.setAttribute('lang', "en");
      meta_locale.setAttribute("content", "en");
      meta_description.setAttribute("content", "Fabio Romagnolo's personal Website, available in Italian and English. Contents: bio, projects and Curriculum Vitae.");
      meta_og_locale.setAttribute("content", "en");
      meta_og_description.setAttribute("content", "Fabio Romagnolo's personal Website, available in Italian and English. Contents: bio, projects and Curriculum Vitae.");

      nav_item_intro_a.text("Welcome 👋");
      nav_item_first_a.text("Projects 💻");

      // Change CSS classes
      nav_ul.removeClassStartingWith("lang");
      nav_ul.addClass('lang-en');

      return;
    }

    // --- ITALIAN ---
    if (language === 'it') {
      html.setAttribute('lang', "it");
      meta_locale.setAttribute("content", "it");
      meta_description.setAttribute("content", "Sito Web personale di Fabio Romagnolo, disponibile in Italiano ed Inglese. Contenuti: bio, progetti e Curriculum Vitae.");
      meta_og_locale.setAttribute("content", "it");
      meta_og_description.setAttribute("content", "Sito Web personale di Fabio Romagnolo, disponibile in Italiano ed Inglese. Contenuti: bio, progetti e Curriculum Vitae.");

      nav_item_intro_a.text("Benvenuto 👋");
      nav_item_first_a.text("Progetti 💻");

      // Change CSS classes
      nav_ul.removeClassStartingWith("lang");
      nav_ul.addClass('lang-it');

      return;
    }

  }
  console.error(`Not a valid language! (${language})`);
}