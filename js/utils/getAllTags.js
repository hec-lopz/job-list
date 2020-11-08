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

export default getAllTags;