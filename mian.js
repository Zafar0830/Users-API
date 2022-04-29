let elUserCounter=document.querySelector(".users__count");
let elPostCounter=document.querySelector(".posts__count");
let elCommentCounter=document.querySelector(".comments__count");

let elUserList=document.querySelector(".users__list");
let elPostList=document.querySelector(".posts__list");
let elCommentList=document.querySelector(".comments__list");
let elUserId=document.querySelector(".user_id")
let elPostId=document.querySelector(".post_id")

elUserTemplate=document.querySelector("#user-template").content;
elPostTemplate=document.querySelector("#post-template").content;
elCommentTemplate=document.querySelector("#comment-template").content;


function renderusers(array,node) {
    node.innerHTML=null
    if (array.length>0) {
        let userFragmet=document.createDocumentFragment();
        array.forEach(item => {
           let userTemplate=elUserTemplate.cloneNode(true);
           userTemplate.querySelector(".user__username").textContent=item.name;
           userTemplate.querySelector(".user__username").dataset.userID=item.id;
           userTemplate.querySelector(".user_email").textContent=item.email;
           userTemplate.querySelector(".user_country").textContent=item.address.city;
           userTemplate.querySelector(".user_company").textContent=item.company.name;
           userTemplate.querySelector(".user_website").href=item.website;
           userTemplate.querySelector(".user_website").textContent=item.website;
    
           userFragmet.appendChild(userTemplate)
    
        });
        node.appendChild(userFragmet)
        elUserCounter.textContent=array.length
    }
}

;(async function () {
    let responce=await fetch("https://jsonplaceholder.typicode.com/users")
    let data=await responce.json()
    renderusers(data,elUserList)
})();
//Birinchini eshitib ikkinchiga render qilish

elUserList.addEventListener("click",function (evt) {
    let foundUserId=evt.target.dataset.userID;
    if (foundUserId) {
        ;(async function () {
            let responce=await fetch(`https://jsonplaceholder.typicode.com/user/${foundUserId}/posts`)
            let data=await responce.json()
            RenderPost(data,elPostList)
        })(); 
    }
  
})

function RenderPost(array,node) {
    node.innerHTML=null
    if (array.length>0) {
        let postFragment=document.createDocumentFragment();
        array.forEach(item => {
            elCommentList.innerHTML=null
            elPostId.innerHTML=null
            elCommentCounter=null
           let postTemplate=elPostTemplate.cloneNode(true);
           postTemplate.querySelector(".post-title").textContent=item.title;
           postTemplate.querySelector(".post-title").dataset.postId=item.id;
           postTemplate.querySelector(".post-info").textContent=item.body;
    
           elUserId.textContent=item.id/10
           postFragment.appendChild(postTemplate)
           
        });
        node.appendChild(postFragment)
        elPostCounter.textContent=array.length
    }
}

function RenderComments(array,node) {
    node.innerHTML=null
    if (array.length>0) {
        let CommentFragment=document.createDocumentFragment();
        array.forEach(item => {
           let commentTemplate=elCommentTemplate.cloneNode(true);
           commentTemplate.querySelector(".comments__title").textContent=item.name;
           commentTemplate.querySelector(".comment__email").textContent=item.email;
           commentTemplate.querySelector(".comment__text").textContent=item.body;
    
           elPostId.textContent=item.postId
           CommentFragment.appendChild(commentTemplate)
        });
        node.appendChild(CommentFragment)
    }
  elCommentCounter.textContent=array.length
}

elPostList.addEventListener("click",function (evt) {
    let foundPostId=evt.target.dataset.postId

    if (foundPostId) {
        ;(async function () {
            let responce=await fetch(`https://jsonplaceholder.typicode.com/posts/${foundPostId}/comments`)
            let data=await responce.json()
            RenderComments(data,elCommentList)
        })(); 
    }
})
    