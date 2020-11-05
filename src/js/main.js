let $tag_buttons;
let filtered_list = []
fetch("./js/data.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    data.forEach(element => {
      generateCard(element);
    });
    $tag_buttons = document.querySelectorAll(".card__tag-item");
    const toggleShownCards = filterTags();
    $tag_buttons.forEach(tag => {
      tag.addEventListener("click",  ev => {
        if(!filtered_list.includes(ev.target.dataset.value)) {
          addActiveStates(ev.target)
          debugger
          toggleShownCards([ev.target.dataset.value])
          startFilter(ev.target, toggleShownCards);
        } else {
          console.log("already in the list");
        }
      })
    })
    const $clear_filters_btn = document.querySelector(".filters__button");
    $clear_filters_btn.addEventListener("click", ()=>{
      const $filters_container = document.querySelector(".filters");
      $filters_container.classList.remove("filters--active");
      let card_tags = getAllTags();
      $filters_container.querySelectorAll(".job-tags__item--active-filter").forEach( (el) => {
        el.remove()
        toggleShownCards(filtered_list)
        removeActiveStates(card_tags, el);
  })
      filtered_list.splice(0);

  })

  
})
const $cards_container = document.querySelector(".cards-container")
const generateCard = (data) => {
  const HTMLString = cardTemplate(data);
  const htmlChild = getTemplate(HTMLString);

  const $card = htmlChild;
  const $card_header = htmlChild.querySelector(".card__header");
  const $card_job_tags = htmlChild.querySelector(".job-tags");
  if (data.new ===true){
    const elementConfig = {tag:"span", classes:["card__featured", "card__featured--attr_new"], innerText:"New!"}
    const $isNew = generateHtmlElement(elementConfig);
    $card_header.append($isNew)
  }
  if (data.featured === true){
    const elementConfig = {tag:"span", classes:["card__featured", "card__featured--attr_featured"], innerText:"Featured"}
    const $isFeatured = generateHtmlElement(elementConfig);
    $card_header.append($isFeatured)
    $card.dataset.featured = true;
  }
  const job_tags_classes = ["card__tag-item","job-tags__item"];
  const $role = generateHtmlElement({tag:"li", classes:job_tags_classes, innerText:data.role});
  const $level = generateHtmlElement({tag:"li", classes:job_tags_classes, innerText:data.level});
  $card_job_tags.append($role, $level);
  $card.dataset.tags = `${data.role},${data.level}`
  data.languages.forEach( language => {
    const $language = generateHtmlElement({tag:"li", classes:job_tags_classes, innerText:language});
    $card_job_tags.append($language);
    $card.dataset.tags += `,${language}`;
  })
  data.tools.forEach( tool => {
    const $tool = generateHtmlElement({tag:"li", classes:job_tags_classes, innerText:tool});
    $card_job_tags.append($tool);
    $card.dataset.tags += `,${tool}`;
  })
  
  $cards_container.append($card);
}
const cardTemplate = ({company, logo, position, postedAt, contract, location}) => {
  return `<div class="card">
  <div class="card__body">
    <figure class="card__company-thumb">
      <img src="${logo}" alt="">
    </figure>
    <div class="card__text-container">
      <div class="card__header">
        <span class="card__company-name">${company}</span>
      </div>
      <h1 class="card__job-name">${position}</h1>
      <ul class="card__job-info-list">
        <li class="card__list-item">${postedAt}</li>
        <li class="card__list-item">${contract}</li>
        <li class="card__list-item">${location}</li>
      </ul>
    </div>
  </div>
  <hr class="card__separator">
  <ul class="card__job-tags job-tags">
  </ul>
</div>`
}
const filterItemTemplate = ({value}) => {
  return `<li data-value="${value}" class="job-tags__item job-tags__item--active-filter job-tags__item--data_role">
  ${value}
  <div class="job-tags__close-btn">
    <i class="fas fa-times fa-lg"></i>
  </div>
</li>`
}

const generateHtmlElement = (config) => {
  const $node = document.createElement(config.tag);
  config.classes.forEach( el => {
    $node.classList.add(el);
  })
  $node.innerHTML = config.innerText;
  $node.dataset.value = config.innerText;
  return $node;
}

const startFilter = (item, toggleShownCards) => {
  const $filters_container = document.querySelector(".filters");
  const $filters_box = document.querySelector(".filters__job-tags");
  $filters_container.classList.add("filters--active");

  const HTMLString = filterItemTemplate(item.dataset);
  filtered_list.push(item.dataset.value)
  const $html_item = getTemplate(HTMLString);
  const $close_btn = $html_item.querySelector(".job-tags__close-btn");
  const card_tags = getAllTags();
  $close_btn.addEventListener("click", (ev)=>{
    if (ev.target.localName === "i"){
      removeActiveStates(card_tags, ev.target.parentElement.parentElement)
      toggleShownCards([ev.target.parentElement.parentElement.dataset.value])
      // toggleShownItems(allTags, ev.target.parentElement.parentElement)
      ev.target.parentElement.parentElement.remove();
    } else {
      ev.target.parentNode.remove();
      removeActiveStates(card_tags, ev.target.parentElement)
      toggleShownCards([ev.target.parentElement.dataset.value])
    }
    if(filtered_list.indexOf($html_item.dataset.value) > -1) {
      filtered_list.splice(filtered_list.indexOf($html_item.dataset.value), 1)
    }
    if(filtered_list.length === 0 ){
      console.log("vacio");
      $filters_container.classList.remove("filters--active");
    }
    

  })
  $filters_box.append($html_item);
}
const filterTags = () => {
  const $cards = Array.from(document.querySelectorAll(".card"));
  return function (clicked_item = []){
    debugger
    clicked_item.forEach(tag_name => {
      if (filtered_list.includes(tag_name)) {
        const toShow = $cards.filter( card => !card.dataset.tags.split(",").includes(tag_name));
        toShow.forEach(card => {
          card.classList.remove("card--hidden")
        })
        
      } else {
        const toHide = $cards.filter( card => !card.dataset.tags.split(",").includes(tag_name));
        toHide.forEach(card => {
          card.classList.add("card--hidden")
    
        })
      }
    });
  }
}
function addActiveStates(element){
  const card_tags = getAllTags();
  const toBeAdded = card_tags.filter(tag => tag.dataset.value.toLowerCase() === element.dataset.value.toLowerCase())
  toBeAdded.forEach(item => item.classList.add("job-tags__item--active"));

}
function removeActiveStates(card_tags, el) {
  const toBeRemoved = card_tags.filter(tag => el.dataset.value.toLowerCase() === tag.dataset.value.toLowerCase() && tag.classList.contains("job-tags__item--active"));
  // debugger
  toBeRemoved.forEach(item => item.classList.remove("job-tags__item--active"));
}
function getAllTagsContainers() {
  const card_tags = Array.from(document.querySelectorAll('.card__job-tags'));

  const nodelist = card_tags.map(ul => Array.from(ul.querySelectorAll("li")));
  return nodelist
}
function getAllTags() {
  const card_tags = Array.from(document.querySelectorAll('.card__job-tags'));

  const nodelist = card_tags.map(ul => ul.querySelectorAll("li"));
  let li_items = [];
  nodelist.forEach(element => {
    for (let i = 0; i < element.length; i++) {
      li_items.push(element[i]);
    }
  });
  return li_items;
}

function getTemplate(HTMLString) {
  const html = document.implementation.createHTMLDocument();
  html.body.innerHTML = HTMLString;
  return html.body.children[0];
}
