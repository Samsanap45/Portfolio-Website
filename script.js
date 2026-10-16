const username = "Samsanap45";

const projectsContainer =
  document.getElementById("projectsContainer");

const repoCount =
  document.getElementById("repoCount");


async function loadProjects(){

  try{

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`
    );

    if(!response.ok)
      throw new Error("GitHub error");

    const repos = await response.json();

    const projects =
      repos.filter(repo => !repo.fork);

    repoCount.innerText = projects.length + "+";

    projectsContainer.innerHTML = "";

    projects.slice(0,6).forEach((repo,index)=>{

      const image =
        index % 2 === 0

        ?

        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"

        :

        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";


      const card = document.createElement("article");

      card.className = "project";

      card.innerHTML = `

        <div
          class="project-image"
          style="background-image:url('${image}')">
        </div>

        <div class="project-content">

          <small>
            ${repo.language || "DEVELOPMENT"}
          </small>

          <h3>
            ${repo.name.replaceAll("-", " ")}
          </h3>

          <p>
            ${
              repo.description ||
              "A project built by Samadhan Sanap."
            }
          </p>

          <a
            href="${repo.html_url}"
            target="_blank">

            View on GitHub ↗

          </a>

        </div>

      `;

      projectsContainer.appendChild(card);

    });

  }

  catch(error){

    repoCount.innerText = "2+";

    projectsContainer.innerHTML = `

      <article class="project">

        <div
          class="project-image"
          style="
          background-image:url(
          'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80'
          )">
        </div>

        <div class="project-content">

          <small>PROJECT</small>

          <h3>LAWYER CONNECT</h3>

          <p>
            A project available on my GitHub profile.
          </p>

          <a
            href="https://github.com/Samsanap45"
            target="_blank">

            View on GitHub ↗

          </a>

        </div>

      </article>

    `;

  }

}


loadProjects();


// DARK / LIGHT MODE

const theme =
  document.getElementById("theme");

theme.onclick = () => {

  document.body.classList.toggle("light");

  theme.innerText =
    document.body.classList.contains("light")
      ? "☀"
      : "☾";

};


// MOBILE MENU

const menu =
  document.getElementById("menu");

const nav =
  document.getElementById("nav");

menu.onclick = () => {

  nav.classList.toggle("open");

};