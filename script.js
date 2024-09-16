document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("myModal");
    const postModal = document.getElementById("postModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeBtn = document.getElementsByClassName("close");
    const forum = document.getElementById("forum");
    const postsContainer = document.getElementById("postsContainer");
    const deleteBtn= document.querySelector(".delete-btn");
    const asideFixed= document.querySelector(".asideFixed");

    // const aside= document.querySelectorAll("#postsContainer");

//     deleteBtn.addEventListener('click', function(event) {
//         event.preventDefault();

//         let posts = JSON.parse(localStorage.getItem("posts"));

//         const log = aside[0].children;

//         let savePosts = [];

//        for(let i = 0; i < log.length; i++){

//         // console.log(log[i].children[0].children[0].checked);


//         if(!log[i].children[0].children[0].checked)
//         {
//             savePosts.push(log[i].children[0])
//         };

//        }

//        posts = savePosts;

//        localStorage.setItem("posts", JSON.stringify(posts));

//        console.log(posts);

//        displayPosts();

       
// //TODO: 
// //TODO: replace locale storage with updated array
// //TODO: redisplay posts

//     })

deleteBtn.addEventListener('click', function(event) {
    event.preventDefault();

    let posts = JSON.parse(localStorage.getItem("posts"));
    const checkboxes = document.querySelectorAll(".post-checkbox");
    
    // Filter out checked posts
    let updatedPosts = posts.filter((post, index) => {
        const checkbox = checkboxes[index];
        return checkbox && !checkbox.checked;
    });

    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    displayPosts();
});

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
            //A- adding a checkbox with each post with class post-checkbox
            postElement.innerHTML = `
                <div class="post-content">
                    <input type="checkbox" class="post-checkbox" data-index="${index}"/>
                    <a href="#" data-index="${index}">${post.title}</a>
                    <span class="post-description">${post.description}</span>
                </div>`;
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

    }
    function showPost(index){
        //-A clears previous posts
        const posts = JSON.parse(localStorage.getItem("posts"));
        const post = posts[index];
        document.getElementById("postTitle").textContent = post.title;
        document.getElementById("postDescription").textContent = `Description: ${post.description}`;
        document.getElementById("postContent").textContent = post.content;
        postModal.style.display = "block";
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
          asideFixed.classList.remove("asideFixed");
        asideFixed.classList.add("asideFixedTop");
      }
      /* otherwise if we're scrolling up, fix the nav to the top */
      else{
          headerDiv.classList.add("fixedHeader");
          asideFixed.classList.remove("asideFixedTop");
            asideFixed.classList.add("asideFixed");
      }
        
      prevScrollpos = currentScrollPos;
    }
    })