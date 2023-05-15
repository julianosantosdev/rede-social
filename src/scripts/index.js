let recommendedUsers = document.querySelector(".recommendedUsers__container");
let postContainer = document.querySelector(".posts__container");
let main = document.querySelector("main");

const textArea__title = document.querySelector(".textArea__postTitle")
const textArea__content = document.querySelector(".textArea__postContent")
const button = document.querySelector("#button__insertPost")

function createRecommendedUsers (sugestArr, userArr) {
    for (let i = 0; i < sugestArr.length; i++) {

        for (let j = 0; j < userArr.length; j++) {

            if (sugestArr[i] === userArr[j].id) {

                const li = document.createElement('li');
                li.classList.add("recommendedUsers__user");

                const head = document.createElement('div');
                head.classList.add("recommendedUsers__user--head");

                const userImg = document.createElement('img');
                userImg.src = userArr[j].img

                const userInfos = document.createElement('div');
                userInfos.classList.add(".recommendedUsers__user--info");

                const UserName = document.createElement('h4');
                UserName.innerText = userArr[j].user

                const stack = document.createElement('small');
                stack.innerText = userArr[j].stack

                const followButton = document.createElement('button');
                followButton.classList.add("button__follow");
                followButton.innerText = "Seguir"

                li.append(head, followButton);
                head.append(userImg, userInfos);
                userInfos.append(UserName, stack);
                recommendedUsers.append(li);
            }
        }
    }
}
createRecommendedUsers(sugestUsers, users);


function renderPosts (postsArr, userArr) {
    postContainer.innerHTML = "";

    for (let i = 0; i < postsArr.length; i++) {
        
        for (let j = 0; j < userArr.length; j++) {
            if (postsArr[i].user === userArr[j].id) {
                const li = document.createElement("li");
                li.classList.add("posts__item");

                const author = document.createElement("div");
                author.classList.add("posts__author");

                const img = document.createElement("img");
                img.src = userArr[j].img;

                const authorInfo = document.createElement("div");
                authorInfo.classList.add("posts__author--info");

                const authorName = document.createElement("h4");
                authorName.innerText = userArr[j].user;

                const stack = document.createElement("small");
                stack.innerText = userArr[j].stack;

                const postTitle__container = document.createElement("div");
                postTitle__container.classList.add("posts__title--container");

                const postTitle = document.createElement("h2");
                postTitle.innerText = postsArr[i].title;

                const postContent__container = document.createElement("div");
                postContent__container.classList.add("posts__content--container");

                const postContent = document.createElement("p");
                postContent.innerText = `${(postsArr[i].text).substring(0, 120)}...`;

                const buttons__container = document.createElement("div");  
                buttons__container.classList.add("posts__buttons--container");

                const button__openPost = document.createElement("button");
                button__openPost.classList.add("button__openPost");
                button__openPost.innerText = "Abrir Post"
                button__openPost.dataset.id = postsArr[i].id_post;
                button__openPost.dataset.user = postsArr[i].user

                const button__like = document.createElement("button");
                button__like.classList.add("button__like");
                button__like.dataset.like = postsArr[i].id_post
                
                const span = document.createElement("span")
                span.classList.add("counter")
                span.innerText = "0"
                span.dataset.span = postsArr[i].id_post;

                const buttonImg = document.createElement("img");
                buttonImg.src = "./src/assets/img/like.svg"

                li.append(author, postTitle__container, postContent__container, buttons__container);
                author.append(img, authorInfo);
                authorInfo.append(authorName, stack);
                postTitle__container.append(postTitle);
                postContent__container.append(postContent);
                buttons__container.append(button__openPost, button__like)
                button__like.append (span, buttonImg)
                postContainer.append(li)
            }
        }
    }
}
renderPosts (posts, users);

function createModal () {
    let modal__section = document.createElement("section");
    modal__section.classList.add("modal__container");

    let modal__body = document.createElement("div");
    modal__body.classList.add("modal__body", "slideDown");

    modal__section.append(modal__body);
    main.append (modal__section);

    return modal__section
}

function openModal () {
    const buttons__openPost = document.querySelectorAll("[data-id]")
    for (let i = 0; i < buttons__openPost.length; i++) {
        buttons__openPost[i].addEventListener("click", (event) => {
            event.preventDefault();
            createModal();
            RenderModalContent(buttons__openPost[i].dataset.id, buttons__openPost[i].dataset.user)
            closeModal()
        })
    }
}
openModal()

function RenderModalContent (idPost, idUser) {
    let postInfo = {}
    let authorPost = {}

    for (let i = 0; i < posts.length; i++) {
        if (Number(idPost) === posts[i].id_post){
            postInfo = posts[i]
        }
    }

    for (let j = 0; j < users.length; j++) {
        if (Number(idUser) === users[j].id) {
            authorPost = users[j]
        }
    }

    let modal__body = document.querySelector(".modal__body")
    modal__body.innerHTML = ''
    
    let modal__header = document.createElement("div");
    modal__header.classList.add("modal__header");
    
    let modal__author = document.createElement("div");
    modal__author.classList.add("modal__author");
    
    let modal__authorInfo = document.createElement("div");
    modal__authorInfo.classList.add("modal__author--info");

    let userImg = document.createElement("img")
    userImg.src = authorPost.img
    
    let userName = document.createElement("h4");
    userName.innerText = authorPost.user
    
    let stack = document.createElement("small");
    stack.innerText = authorPost.stack

    let modal__closeButton = document.createElement("button");
    modal__closeButton.classList.add("button__modal--close");
    modal__closeButton.innerText = "X";

    let postTitle__container = document.createElement("div");
    postTitle__container.classList.add("modal__post--title");

    let postTitle = document.createElement("h2");
    postTitle.innerText = postInfo.title;

    let postContent__container = document.createElement("div");
    postContent__container.classList.add("modal__posts--content");

    let postContent = document.createElement("p")
    postContent.innerText = postInfo.text;
    
    modal__body.append(modal__header, postTitle__container, postContent__container);
    modal__header.append(modal__author, modal__closeButton);
    modal__author.append(userImg, modal__authorInfo);
    modal__authorInfo.append(userName, stack)
    postTitle__container.append(postTitle);
    postContent__container.append(postContent);
}

function closeModal () {
    let cloneButton = document.querySelector(".button__modal--close")
    let modal = document.querySelector(".modal__container")

    cloneButton.addEventListener("click", (event) => {
        modal.remove()
    })
}

function followButton () {
    const buttons = document.querySelectorAll(".button__follow");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", (event) => {
            let verify = buttons[i].classList.contains("following")
            if(verify) {
                buttons[i].classList.remove("following")
                buttons[i].innerText = "Seguir"

            } else if (!verify) {
                buttons[i].classList.add("following")
                buttons[i].innerText = "Seguindo"
            }
        })
    }
}
followButton ()

function counter () {
    let buttons = document.querySelectorAll("[data-like]")
    let span = document.querySelectorAll("[data-span]")
    

    for (let i = 0; i < buttons.length; i++) {
        let counter = 1;

        buttons[i].addEventListener("click", (event) =>  {
            buttons[i].classList.add("liked")
            
            for (let j = 0; j < span.length; j++) {
                if (Number(buttons[i].dataset.like) === Number(span[j].dataset.span)) {
                    
                    span[j].innerText = counter++
                    
                }
            }
        })
        
    }
}
counter ()

function createPost () {
    const form = document.querySelector("form")
    let post = {}

    form.addEventListener("submit", (event) => {

        if (textArea__title.value === "" || textArea__content.value === "") {
            alert("A postagem não pode estar vazia");

        } else {
            event.preventDefault();
            post.id_post = (posts.length) + 1;
            post.user = 1;
            post.title = textArea__title.value;
            post.text = textArea__content.value;

            posts.unshift(post);
            renderPosts (posts, users);
            openModal();
            counter ()
            post = {};
            alert("Post Criado!");
        }
        
    })
}
createPost ()