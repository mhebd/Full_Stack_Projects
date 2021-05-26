// Get portfolios
function getPortfolios() {
  const container = document.getElementById('portfolios');

  portfolios();
  async function portfolios() {
    const res = await fetch(`json/main.json`);
    const data = await res.json();
    setPortfolios(data.portfolios);
  }

  function setPortfolios(portfolios) {
    portfolios.forEach((portfolio) => {
      const html = `
        <div class="col-xl-3 col-lg-4 col-md-6 portfolio">
          <div class="sp-container">
            <div class="sp-img">
              <img src="img/portfolios/${portfolio.image}" alt="" class="img-fluid" />
            </div>
            <div class="sp-details-wrap">
              <div class="sp-details">
                <h3 class="sp-name">${portfolio.name}</h3>
                <p class="sp-desc">
                  ${portfolio.details}
                </p>
                <a href="${portfolio.url}" class="btn sp-link-btn" target="_blank">view full site</a>
              </div>
            </div>
          </div>
        </div>
      `;

      container.insertAdjacentHTML('beforeend', html);
    });
    detailsBg();
  }
}
// getPortfolios();

// Collerize details background
function detailsBg() {
  const details = document.querySelectorAll('.sp-details');
  const colors = [
    'violet',
    'indigo',
    'teal',
    'seagreen',
    'skyblue',
    'orange',
    'red',
  ];

  let count = 0;
  details.forEach((detail) => {
    detail.style.background = colors[count];
    count++;
    if (count === colors.length) {
      count = 0;
    }
  });
}

detailsBg();

// On scroll add class to header
const navbar = document.querySelector('.navbar');

// OnScroll event handler
const onScroll = () => {
  // Get scroll value
  const scroll = document.documentElement.scrollTop;

  // If scroll value is more than 0 - add class
  if (scroll > 100) {
    navbar.classList.add('bg-dark');
  } else {
    navbar.classList.remove('bg-dark');
  }
};

// Optional - throttling onScroll handler at 100ms with lodash
// const throttledOnScroll = _.throttle(onScroll, 100, {});

// Use either onScroll or throttledOnScroll
window.addEventListener('scroll', onScroll);

// Logout controller
async function logout() {
  const res = await fetch('http://localhost:2500/logout', {
    method: 'post',
  });
  const data = res.json();
  window.location.reload();
}
