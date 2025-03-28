
const projects = [
    {
        name: "Country Naming Game",
        desc: "Guess the names of the countries of the world by clicking on an interactive 3d globe!",
        img: '/my-site/globeGame.gif',
        links: [
            {
                text:'Try it out!',
                url:'https://jchenvan.github.io/naming-countries-game/',
            },
            {
                text:'Github repo',
                url:'https://github.com/jChenvan/naming-countries-game',
            }
        ]
    },
    {
        name: "UnAI: AI Followers Platform",
        desc: "Make posts on an X-inspired social media platform, and read the responses from your custom AI followers!",
        img: '/my-site/UnAI.gif',
        links: [
            {
                text:'Try it out!',
                url:'https://jchenvan.github.io/ai-followers-frontend',
            },
            {
                text:'Github repo (frontend)',
                url:'https://github.com/jChenvan/ai-followers-frontend',
            },
            {
                text:'Github repo (backend)',
                url:'https://github.com/jChenvan/ai-followers-backend',
            }
        ]
    },
    {
        name: "Note Taking App",
        desc: "A simple app for jotting down notes",
        img: '/my-site/notes.gif',
        links: [
            {
                text:'Try it out!',
                url:'https://curious-valkyrie-ddb586.netlify.app/',
            },
            {
                text:'Github repo',
                url:'https://github.com/jChenvan/note-app',
            }
        ]
    }
]

const Slideshow = (function () {
    const slides = projects.map(val=>{
        const slide = document.createElement('div');
        slide.classList.add('slide');

        const img = document.createElement('img');
        img.src = val.img;

        const desc = document.createElement('div');
        const name = document.createElement('h2');
        const text = document.createElement('p');
        name.textContent = val.name;
        text.textContent = val.desc;
        desc.appendChild(name);
        desc.appendChild(text);
        desc.classList.add('description');

        const links = document.createElement('ul');
        val.links.forEach(link=>{
            const li = document.createElement('li');

            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.text;
            a.target = '_blank';
            a.rel = "noopener noreferrer";

            li.appendChild(a);
            links.appendChild(li);
        });

        slide.appendChild(img);
        slide.appendChild(desc);
        slide.appendChild(links);

        return slide;
    });

    const container = document.querySelector('.project-container');
    slides.forEach(val => container.appendChild(val));

    const showSlide = index => {
        slides.forEach((val,i)=>{
            if (i === index) {
                val.classList.remove('hidden');
            } else {
                val.classList.add('hidden');
            }
        });
    }

    let index = 0;
    showSlide(index);

    const contents = document.querySelector('.slideshow-controls .contents ul');

    projects.forEach((p,i) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = p.name;
        button.onclick = ()=>{index = i; showSlide(index)};

        li.appendChild(button);
        contents.appendChild(li);
    });
})()

export default Slideshow;