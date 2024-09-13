const modal = document.getElementById("myModal");
const postModal = document.getElementById("postModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementsByClassName("close");
const forum = document.getElementById("forum");
const postsContainer = document.getElementById("postsContainer");

openModalBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

function closeModal(){
    modal.style.display = "none";
    postModal.style.display = "none";
}

for (var i = 0; i < closeBtn.length; i++) {
    closeBtn[i].onclick = closeModal;
}

window.onclick = function(event) {
    if (event.target === modal || event.target === postModal) {
        modal.style.display = "none";
    }
}

forum.onsubmit = function(event){
    event.preventDefault();
    
    const titleEl = document.getElementById("title");
    const descriptionEl = document.getElementById("description");
    const contentEl = document.getElementById("content");

    const newPosts = {
        title: titleEl.value,
        description: descriptionEl.value,
        content: contentEl.value,
    }

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(newPosts);
    localStorage.setItem("posts", JSON.stringify(posts));

    forum.reset();

    closeModal();

    displayPosts();
}

function displayPosts(){
    postsContainer.innerHTML = ''; // Clear previous posts

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(function(post, index) {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <div class="post-content">
                <a href="#" data-index="${index}">${post.title}</a>
                <span class="post-description">${post.description}</span>
            </div>
            <button class="delete-btn" data-index="${index}">Delete</button>`;
        postsContainer.appendChild(postElement);
    })
    

    const postLinks = postsContainer.querySelectorAll('a');
    postLinks.forEach(link => {
        link.onclick = function(event) {
            event.preventDefault();
            const index = this.getAttribute("data-index");
            showPost(index);
        }
    });

    const deleteButtons = postsContainer.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.onclick = function() {
            const index = this.getAttribute("data-index");
            deletePosts(index);
        }
    });
    
}
function showPost(index){
    const posts = JSON.parse(localStorage.getItem("posts"));
    const post = posts[index];

    document.getElementById("postTitle").textContent = post.title;
    document.getElementById("postDescription").textContent = `Description: ${post.description}`;
    document.getElementById("postContent").textContent = post.content;

    postModal.style.display = "block";
}
function deletePosts(index){
    const posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();
}

displayPosts();

let prevScrollpos = window.scrollY;

/* Get the header element and it's position */
const headerDiv = document.querySelector("header");

window.onscroll = function() {
  let currentScrollPos = window.scrollY;

  /* if scrolling down, let it scroll out of view as normal */
  if (prevScrollpos <= currentScrollPos ){
      headerDiv.classList.remove("fixedHeader");
  }
  /* otherwise if we're scrolling up, fix the nav to the top */
  else{  
      headerDiv.classList.add("fixedHeader");
  }

  prevScrollpos = currentScrollPos;
}
