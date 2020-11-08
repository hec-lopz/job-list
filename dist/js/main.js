import getAllTags from "./utils/getAllTags.js";
import Card from "./templates/Card.js";
import FilterItem from "./templates/FilterItem.js";
import generateHtmlElement from "./utils/generateHtmlElement.js";

let filtered_list = []
const $filters_container = document.querySelector(".filters");


const renderCards = (async () => {
  const $cards_container = document.querySelector(".cards-container");
  const cards= await Card() || [];
  $cards_container.innerHTML = cards;


  let card_tag_buttons = document.querySelectorAll(".card__tag-item");
  const toggleShownCards = filterCards();
  card_tag_buttons.forEach(btn => {
    btn.addEventListener("click",  ev => {
      if(!filtered_list.includes(ev.target.dataset.value)) {
        toggleActiveStates(ev.target, true)
        toggleShownCards([ev.target.dataset.value])
        startFilter(ev.target, toggleShownCards);
      } else {
        console.log("already in the list");
      }
    })
  })
  const $clear_filters_btn = document.querySelector(".filters__button");
  $clear_filters_btn.addEventListener("click", ()=>{
    $filters_container.querySelectorAll(".job-tags__item--active-filter").forEach( (el) => {
      removeTagItem(el, toggleShownCards);
    })
  })
})();

const startFilter = (item, global_cards_function) => {
  filtered_list.push(item.dataset.value);
  const $filters_box = document.querySelector(".filters__job-tags");
  $filters_container.classList.add("filters--active");

  const HTMLString = FilterItem(item.dataset);
  const $html_item = generateHtmlElement(HTMLString);
  const $close_btn = $html_item.querySelector(".job-tags__close-btn");
  $close_btn.addEventListener("click", (ev)=>{
    if (ev.target.localName === "i"){
      removeTagItem(ev.target.parentElement.parentElement,global_cards_function);
    } else {
      removeTagItem(ev.target.parentElement, global_cards_function);
    }
  })
  $filters_box.append($html_item);
}

const removeTagItem = (HtmlElement, global_cards_function) =>{
  HtmlElement.remove();
  toggleActiveStates(HtmlElement, false)
  global_cards_function([HtmlElement.dataset.value])
  if(filtered_list.indexOf(HtmlElement.dataset.value) > -1) {
    filtered_list.splice(filtered_list.indexOf(HtmlElement.dataset.value), 1)
  }
  if(filtered_list.length === 0 ){
    console.log("vacio");
    $filters_container.classList.remove("filters--active");
  }
}

const filterCards = () => {
  const $cards = Array.from(document.querySelectorAll(".card"));

  return function (tags = []){
    tags.forEach(tag => {
      if (filtered_list.includes(tag)) {
        const cards_to_unhide = $cards.filter( card => !card.dataset.tags.split(",").includes(tag));
        cards_to_unhide.forEach(card => {
          card.classList.remove("card--hidden")
        })
      } else {
        const cards_to_hide = $cards.filter( card => !card.dataset.tags.split(",").includes(tag));
        cards_to_hide.forEach(card => {
          card.classList.add("card--hidden")
        })
      }
    });
  }
}

const toggleActiveStates = (element, activate = false) => {
  const card_tags = getAllTags();
  if (activate === true){
    const card_tags_to_activate = card_tags.filter(tag => tag.dataset.value.toLowerCase() === element.dataset.value.toLowerCase())
    card_tags_to_activate.forEach(item => item.classList.add("job-tags__item--active"));
  } else {
    const card_tags_to_deactivate = card_tags.filter(tag => element.dataset.value.toLowerCase() === tag.dataset.value.toLowerCase() && tag.classList.contains("job-tags__item--active"));
    card_tags_to_deactivate.forEach(item => item.classList.remove("job-tags__item--active"));
  }
}

