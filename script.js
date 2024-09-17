document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("myModal");
    const postModal = document.getElementById("postModal");
    const openModalBtn = document.getElementById("openModalBtn");

    const closeBtn = document.getElementsByClassName("close");
    const forum = document.getElementById("forum");
    const postsContainer = document.getElementById("postsContainer");
    const deleteBtn= document.querySelector(".delete-btn");
    const asideFixed= document.querySelector(".asideFixed");

    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');
    const brushSize = document.getElementById('brushSize');


    deleteBtn.addEventListener('click', function(event) {
    event.preventDefault();

    let posts = JSON.parse(localStorage.getItem("posts"));
    const checkboxes = document.querySelectorAll(".post-checkbox");
    
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
    for (const i = 0; i < closeBtn.length; i++) {
        closeBtn[i].onclick = closeModal;
    }
    window.onclick = function(event) {
        if (event.target === modal || event.target === postModal) {
            modal.style.display = "none";
        }
    }

    function getCanvasImage() {
        return canvas.toDataURL('image/png'); 
    }
    
    forum.onsubmit = function(event){
        event.preventDefault();

        const titleEl = document.getElementById("title");
        const descriptionEl = document.getElementById("description");
        const contentEl = document.getElementById("content");
        const canvasImg = getCanvasImage();
        
        const newPosts = {
            title: titleEl.value,
            description: descriptionEl.value,
            content: contentEl.value,
            drawingImage: canvasImg,
        }
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.push(newPosts);
        localStorage.setItem("posts", JSON.stringify(posts));

        forum.reset();

        context.clearRect(0,0, canvas.width, canvas.height);

        closeModal();
        displayPosts();
    }
    function displayPosts(){
        postsContainer.innerHTML = ''; // Clear previous posts
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.forEach(function(post, index) {

            const postElement = document.createElement("div");
            const drawingIcon = post.drawingImage ? `<img src="${post.drawingImage}" alt="Drawing Icon" class="post-icon previewImg"/>` : '';
            postElement.classList.add("post");

            //A- adding a checkbox with each post with class post-checkbox
            postElement.innerHTML = `
                <div class="post-content">
                    ${drawingIcon} 
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
    
    const headerDiv = document.querySelector("header");
    window.onscroll = function() {
      let currentScrollPos = window.scrollY;
      
      if (prevScrollpos <= currentScrollPos ){
          headerDiv.classList.remove("fixedHeader");
          asideFixed.classList.remove("asideFixed");
          asideFixed.classList.add("asideFixedTop");
      }
      else{
          headerDiv.classList.add("fixedHeader");
          asideFixed.classList.remove("asideFixedTop");
          asideFixed.classList.add("asideFixed");
      }
        
      prevScrollpos = currentScrollPos;
    }

    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF'];
    const palette = document.getElementById('palette');

    colors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color';
        colorDiv.style.backgroundColor = color;
        colorDiv.dataset.color = color; 
        palette.appendChild(colorDiv);
    });

    let currentColor = '#000000'; 

    let drawing = false;

    palette.addEventListener('click', (e) => {
        if (e.target.classList.contains('color')) {
            currentColor = e.target.dataset.color;
        }
    });

    brushSize.addEventListener('change', (e) => {
        context.lineWidth = e.target.value;
    })

    canvas.width = 400;
    canvas.height = 200;

    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (drawing) {
            
            context.strokeStyle = currentColor;
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        drawing = false;
    });
})
    