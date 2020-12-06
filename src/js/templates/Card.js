import getData from "../utils/getData.js";

const Card = async () => {
  const posts = await getData();
  const view = posts
    .map(
      (post) => `
    <div class="card" 
    data-featured="${post.featured}"
    data-tags="${post.role.toLowerCase()},${post.level.toLowerCase()},${post.languages
        .map((language) => `${language}`)
        .join()},${
        post.tools !== 0 ? post.tools.map((tool) => `${tool}`).join() : ``
      }" >
    <div class="card__body">
      <figure class="card__company-thumb">
        <img src="${post.logo}" alt="">
      </figure>
      <div class="card__text-container">
        <div class="card__header">
          <span class="card__company-name">${post.company}</span>
          ${
            post.new
              ? `<span class="card__featured card__featured--attr_new">New!</span>`
              : ``
          }
          ${
            post.featured === true
              ? `<span class="card__featured card__featured--attr_featured">Featured</span>`
              : ``
          }
        </div>
        <h1 class="card__job-name">${post.position}</h1>
        <ul class="card__job-info-list">
          <li class="card__list-item">${post.postedAt}</li>
          <li class="card__list-item">${post.contract}</li>
          <li class="card__list-item">${post.location}</li>
        </ul>
      </div>
    </div>
    <hr class="card__separator">
    <ul class="card__job-tags job-tags">
      <li data-value="${post.role.toLowerCase()}" class="card__tag-item job-tags__item ">${
        post.role
      }</li>
      <li data-value="${post.level.toLowerCase()}" class="card__tag-item job-tags__item ">${
        post.level
      }</li>
      ${post.languages
        .map(
          (language) => `
      <li data-value="${language}" class="card__tag-item job-tags__item ">${language}</li>
      `
        )
        .join("")}
      ${
        post.tools !== 0
          ? post.tools
              .map(
                (tool) =>
                  `<li data-value="${tool}" class="card__tag-item job-tags__item ">${tool}</li>`
              )
              .join("")
          : ``
      }
    </ul>
  </div>`
    )
    .join("");

  return view;
};

export default Card;
