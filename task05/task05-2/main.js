const opts = document.getElementsByClassName('nav-opt');


for(let opt of opts) {
  console.log(opt);
  opt.addEventListener('mouseover', (e) => {
    opt.style.background = 'url(https://raw.githubusercontent.com/StudentWan/efe-work-task/master/task02/static/img/arrow.png) 95% 50% no-repeat,#303030';
    opt.children[0].style.display = 'block';
  })
  opt.addEventListener('mouseout', (e) => {
    opt.style.background = 'url(https://raw.githubusercontent.com/StudentWan/efe-work-task/master/task02/static/img/arrow.png) 95% 50% no-repeat';
    opt.children[0].style.display = 'none';
  })
}