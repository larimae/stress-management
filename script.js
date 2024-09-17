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
    for (let i = 0; i < closeBtn.length; i++) {
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
                    <p class="post-description">Desc: ${post.description}</p>
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

        const postImage = document.getElementById("postImage");
        if (post.drawingImage) {
            postImage.src = post.drawingImage;
            postImage.style.display = "block"; // Show image
        } else {
            postImage.style.display = "none"; // Hide image if not available
        }
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

    
        const backgroundContainer = document.getElementById('background-container');
        const applyButton = document.getElementById('submit');
        const journalEntry = document.getElementById('content');
        
        const happyBGM = document.getElementById('happyBGM');
        const sadBGM = document.getElementById('sadBGM');
    
        // Keywords and corresponding backgrounds
        const keywords = {
            happyKeywords: {
                'alive': 'bg-happy', 'amused': 'bg-happy', 'bright': 'bg-happy', 'cheerful': 'bg-happy',
                'cheerfulness': 'bg-happy', 'content': 'bg-happy', 'contented': 'bg-happy', 'delighted': 'bg-happy', 'elated': 'bg-happy',
                'excited': 'bg-happy', 'excitement': 'bg-happy', 'fulfilled': 'bg-happy', 'gleeful': 'bg-happy', 'happy': 'bg-happy',
                'happiness': 'bg-happy', 'joy': 'bg-happy', 'joyful': 'bg-happy', 'jubilant': 'bg-happy', 'lighthearted': 'bg-happy',
                'lively': 'bg-happy', 'merry': 'bg-happy', 'overjoyed': 'bg-happy', 'pleased': 'bg-happy', 'radiant': 'bg-happy',
                'refreshed': 'bg-happy', 'satisfied': 'bg-happy', 'serene': 'bg-happy', 'smile': 'bg-happy', 'smiling': 'bg-happy',
                'thrilled': 'bg-happy', 'uplifted': 'bg-happy', 'vibrant': 'bg-happy', 'wonderful': 'bg-happy', 'ecstatic': 'bg-happy',
                'jovial': 'bg-happy', 'cheer': 'bg-happy', 'elation': 'bg-happy', 'sunniness': 'bg-happy', 'radiance': 'bg-happy',
                'exuberant': 'bg-happy', 'grateful': 'bg-happy', 'gratitude': 'bg-happy', 'enjoyment': 'bg-happy', 'brightened': 'bg-happy',
                'hopeful': 'bg-happy', 'pleasant': 'bg-happy', 'playful': 'bg-happy', 'rejoicing': 'bg-happy', 'celebrate': 'bg-happy',
                'celebration': 'bg-happy', 'jubilantly': 'bg-happy', 'glee': 'bg-happy', 'contentment': 'bg-happy', 'happy-go-lucky': 'bg-happy',
                'joyous': 'bg-happy', 'spirit': 'bg-happy', 'spritely': 'bg-happy', 'fun': 'bg-happy', 'funny': 'bg-happy',
                'giggling': 'bg-happy', 'joyfulness': 'bg-happy', 'bliss': 'bg-happy', 'blissful': 'bg-happy', 'bubbly': 'bg-happy',
                'cheerfully': 'bg-happy', 'sunny': 'bg-happy', 'zestful': 'bg-happy', 'zest': 'bg-happy', 'vivacious': 'bg-happy',
                'positive': 'bg-happy', 'energetic': 'bg-happy', 'cheeriness': 'bg-happy', 'playfulness': 'bg-happy', 'euphoric': 'bg-happy',
                'giddy': 'bg-happy', 'radiantly': 'bg-happy', 'elatedly': 'bg-happy', 'good': 'bg-happy', 'sanguine': 'bg-happy',
                'upbeat': 'bg-happy', 'invigorated': 'bg-happy', 'jolly': 'bg-happy', 'heartwarming': 'bg-happy', 'effervescent': 'bg-happy',
                'vivacity': 'bg-happy', 'pleasing': 'bg-happy', 'spunky': 'bg-happy', 'beaming': 'bg-happy', 'adventure': 'bg-happy',
                'adventures': 'bg-happy', 'amazing': 'bg-happy', 'astonishing': 'bg-happy', 'awesome': 'bg-happy', 'beautiful': 'bg-happy',
                'best': 'bg-happy', 'brilliant': 'bg-happy', 'celebration': 'bg-happy', 'delightful': 'bg-happy', 'enjoyable': 'bg-happy',
                'fantastic': 'bg-happy', 'fabulous': 'bg-happy', 'glorious': 'bg-happy', 'incredible': 'bg-happy', 'memorable': 'bg-happy',
                'outstanding': 'bg-happy', 'phenomenal': 'bg-happy', 'remarkable': 'bg-happy', 'spectacular': 'bg-happy', 'splendid': 'bg-happy',
                'terrific': 'bg-happy', 'wonderful': 'bg-happy', 'high-spirited': 'bg-happy', 'elevated': 'bg-happy', 'inspirational': 'bg-happy',
                'great': 'bg-happy', 'excellent': 'bg-happy', 'enlightening': 'bg-happy', 'satisfying': 'bg-happy', 'gratifying': 'bg-happy',
                'exhilarating': 'bg-happy', 'refreshing': 'bg-happy', 'wonder': 'bg-happy', 'greatness': 'bg-happy', 'celebrated': 'bg-happy',
                'successful': 'bg-happy', 'brilliance': 'bg-happy', 'spectacularly': 'bg-happy', 'amazed': 'bg-happy', 'happily': 'bg-happy',
                'jubilant': 'bg-happy', 'cheerfully': 'bg-happy', 'remarkably': 'bg-happy', 'ecstatic': 'bg-happy', 'joyfully': 'bg-happy',
                'heartwarming': 'bg-happy', 'blessed': 'bg-happy', 'fantastically': 'bg-happy', 'brilliantly': 'bg-happy' 
            },
            
            sadKeywords: {
                'ache': 'bg-sad', 'aches': 'bg-sad', 'aching': 'bg-sad', 'abandoned': 'bg-sad', 'abandon': 'bg-sad',
                'abandons': 'bg-sad', 'angry': 'bg-sad', 'angrily': 'bg-sad', 'anger': 'bg-sad', 'angering': 'bg-sad',            
                'anguish': 'bg-sad', 'anguished': 'bg-sad', 'bleak': 'bg-sad', 'bleakness': 'bg-sad', 'broken': 'bg-sad',
                'burden': 'bg-sad', 'burdens': 'bg-sad', 'cry': 'bg-sad', 'cries': 'bg-sad', 'crying': 'bg-sad',              
                'depressed': 'bg-sad', 'depression': 'bg-sad', 'despair': 'bg-sad', 'desperate': 'bg-sad', 'desperately': 'bg-sad',
                'distress': 'bg-sad', 'distressed': 'bg-sad', 'dismal': 'bg-sad', 'down': 'bg-sad', 'downcast': 'bg-sad',              
                'downhearted': 'bg-sad', 'dull': 'bg-sad', 'forlorn': 'bg-sad', 'gloom': 'bg-sad', 'gloomy': 'bg-sad',
                'grief': 'bg-sad', 'grieving': 'bg-sad', 'hurt': 'bg-sad', 'hurts': 'bg-sad', 'melancholy': 'bg-sad',               
                'mourn': 'bg-sad', 'mournful': 'bg-sad', 'pain': 'bg-sad', 'pains': 'bg-sad', 'sad': 'bg-sad',
                'sadden': 'bg-sad', 'saddened': 'bg-sad', 'saddens': 'bg-sad', 'sorrow': 'bg-sad', 'sorrowful': 'bg-sad',               
                'tear': 'bg-sad', 'tears': 'bg-sad', 'unhappy': 'bg-sad', 'weary': 'bg-sad', 'woe': 'bg-sad',
                'woeful': 'bg-sad', 'wretched': 'bg-sad', 'miserable': 'bg-sad', 'miseries': 'bg-sad',               
                'miserably': 'bg-sad', 'disheartened': 'bg-sad', 'desolate': 'bg-sad', 'heartbroken': 'bg-sad', 'dismayed': 'bg-sad',
                'dejection': 'bg-sad', 'displeased': 'bg-sad', 'bleakly': 'bg-sad', 'melancholically': 'bg-sad', 'saddening': 'bg-sad', 
                'moody': 'bg-sad', 'discontent': 'bg-sad', 'somber': 'bg-sad', 'glum': 'bg-sad', 'sadness': 'bg-sad',
                'depressing': 'bg-sad', 'drained': 'bg-sad', 'unsettled': 'bg-sad', 'dispirited': 'bg-sad',               
                'morose': 'bg-sad', 'doleful': 'bg-sad', 'despondent': 'bg-sad', 'crestfallen': 'bg-sad', 'brokenhearted': 'bg-sad',
                'insecure': 'bg-sad', 'abject': 'bg-sad', 'downbeat': 'bg-sad', 'glumly': 'bg-sad', 'forlornly': 'bg-sad',
                'unfulfilled': 'bg-sad', 'troubled': 'bg-sad', 'dishearten': 'bg-sad', 'sombre': 'bg-sad', 'despondency': 'bg-sad',
                'annoyed': 'bg-sad', 'annoyance': 'bg-sad', 'disappointed': 'bg-sad', 'frustrated': 'bg-sad', 'frustration': 'bg-sad',
                'hopeless': 'bg-sad', 'isolated': 'bg-sad', 'lonely': 'bg-sad', 'overwhelmed': 'bg-sad', 'stressed': 'bg-sad',
                'upset': 'bg-sad', 'displeasure': 'bg-sad', 'regret': 'bg-sad', 'regretful': 'bg-sad', 'angst': 'bg-sad',
                'angst-ridden': 'bg-sad', 'pessimistic': 'bg-sad',
                'trouble': 'bg-sad', 'troublesome': 'bg-sad', 'sorrowful': 'bg-sad', 'desperate': 'bg-sad', 'painful': 'bg-sad',
                'hurting': 'bg-sad', 'regretfully': 'bg-sad', 'gloominess': 'bg-sad', 'dread': 'bg-sad', 'dreary': 'bg-sad',
                'wearying': 'bg-sad', 'discontented': 'bg-sad', 'defeated': 'bg-sad', 'pained': 'bg-sad', 'agonizing': 'bg-sad',
                'unfortunate': 'bg-sad', 'tragedy': 'bg-sad', 'tragic': 'bg-sad', 'terrible': 'bg-sad', 'terribly': 'bg-sad',
                'disastrous': 'bg-sad', 'disaster': 'bg-sad', 'awful': 'bg-sad', 'dreadful': 'bg-sad', 'horrible': 'bg-sad',
                'horribly': 'bg-sad', 'suffer': 'bg-sad', 'suffering': 'bg-sad', 'lament': 'bg-sad', 'lamentable': 'bg-sad',
                'lonesome': 'bg-sad', 'melancholic': 'bg-sad', 'regrettable': 'bg-sad', 'painfully': 'bg-sad',
                'appalling': 'bg-sad', 'atrocious': 'bg-sad', 'shocking': 'bg-sad', 'horrendous': 'bg-sad', 'unpleasant': 'bg-sad',
                'deplorable': 'bg-sad', 'abysmal': 'bg-sad', 'rotten': 'bg-sad', 'lousy': 'bg-sad', 'inferior': 'bg-sad',
                'substandard': 'bg-sad', 'unsatisfactory': 'bg-sad', 'poor': 'bg-sad', 'disheartening': 'bg-sad', 'unwelcome': 'bg-sad',
                'bleak': 'bg-depressing', 'dismal': 'bg-depressing', 'gloomy': 'bg-depressing', 'melancholy': 'bg-depressing', 'mournful': 'bg-depressing',
                'downcast': 'bg-depressing', 'downhearted': 'bg-depressing', 'despondent': 'bg-depressing', 'glum': 'bg-depressing', 'forlorn': 'bg-depressing',
                'sad': 'bg-depressing', 'disheartened': 'bg-depressing', 'unhappy': 'bg-depressing', 'morose': 'bg-depressing', 'despairing': 'bg-depressing',
                'woeful': 'bg-depressing', 'troubled': 'bg-depressing', 'sorrowful': 'bg-depressing', 'dreary': 'bg-depressing',
                'doleful': 'bg-depressing', 'dispirited': 'bg-depressing', 'heartbroken': 'bg-depressing', 'lamentable': 'bg-depressing', 'dejected': 'bg-depressing',
                'unsettling': 'bg-depressing', 'pessimistic': 'bg-depressing', 'tragedy': 'bg-depressing', 'tragic': 'bg-depressing', 'hopeless': 'bg-depressing',
                'overwhelmed': 'bg-depressing', 'angst-ridden': 'bg-depressing', 'melancholic': 'bg-depressing', 'wretched': 'bg-depressing',
                'crushing': 'bg-depressing', 'unhappily': 'bg-depressing'
            }
        }
        
        // Set initial volume and pause background music
        happyBGM.volume = 0.5;
        sadBGM.volume = 0.5;
        happyBGM.pause();
        sadBGM.pause();
    
        applyButton.addEventListener('click', function() {
            const text = journalEntry.value.toLowerCase();
            const words = text.split(/\s+/); // Split text into words
        
            // Remove existing background classes
            Object.values(keywords).forEach(keywordGroup => {
                Object.values(keywordGroup).forEach(className => {
                    backgroundContainer.classList.remove(className);
                });
            });
        
            // Initialize counters and music play state
            let happyCount = 0;
            let sadCount = 0;
        
            // Count occurrences of happy and sad keywords
            for (const [keywordGroup, classMap] of Object.entries(keywords)) {
                for (const [keywordWord] of Object.entries(classMap)) {
                    // Count how many times each keyword appears in the text
                    const keywordFrequency = words.filter(word => word === keywordWord).length;
                    if (keywordGroup === 'happyKeywords') {
                        happyCount += keywordFrequency;
                    } else if (keywordGroup === 'sadKeywords') {
                        sadCount += keywordFrequency;
                    }
                }
            }
        
            // Determine which background to apply based on counts
            if (happyCount > sadCount) {
                backgroundContainer.classList.add('bg-happy');
                if (happyBGM.paused) {
                    happyBGM.play();
                }
                sadBGM.pause();
            } else if (sadCount > happyCount) {
                backgroundContainer.classList.add('bg-sad');
                if (sadBGM.paused) {
                    sadBGM.play();
                }
                happyBGM.pause();
            } else {
                // If counts are equal or no relevant keywords are found
                happyBGM.pause();
                sadBGM.pause();
            }
        });
    });
    