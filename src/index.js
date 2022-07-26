init(); 
animate();

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

 //get nav items from nav bar
let navLinks = document.querySelectorAll('.nav-item');
let contentSections;

//highlight nav link depending on page position
window.addEventListener("load", (event) =>{
    contentSections = document.querySelectorAll('section');
    contentSections.forEach(section => {
        createObserver(section);
    })
}, false);

//callback function
function highlightNav (entries, observer){
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            //remove active class for other links
            navLinks.forEach((link)=>{
                    link.classList.remove('active');
            })

            //add active class to nav-item
            document.querySelector(`#nav-${entry.target.id}`).classList.add('active');
        }
    });
}

//creating an intersection observer to highlight nav section
//project section is significantly longer than the other sections
function createObserver(target){
    let observer;
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.75
    };
    let options2= {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    if (target.classList.contains('projects')) {
        observer = new IntersectionObserver(highlightNav, options2)
    } else {
        observer = new IntersectionObserver(highlightNav, options);
    }
    observer.observe(target);
}


