

const FilterItem = ({value}) => {
  const view = `<li data-value="${value}" class="job-tags__item job-tags__item--active-filter job-tags__item--data_role">
  ${value}
  <div class="job-tags__close-btn">
    <i class="fas fa-times fa-lg"></i>
  </div>
</li>`;
  
  return view;
}

export default FilterItem;