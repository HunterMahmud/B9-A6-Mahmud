let postApi = 'https://openapi.programming-hero.com/api/retro-forum/posts';
let markAsReadCount = 0;
const fetchPost = async(query,first)=>{
    // console.log(query,first);
    if(query?.length>0){
        spinnerController(true);
        postApi = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${query}`;
        // console.log(postApi);
    }
    let res = await fetch(postApi);
    let data = await res.json();
    // console.log(data.posts);
    loadPosts(data.posts,first);
    

}

const loadPosts = async (posts,first) => {
    // console.log(posts,first);
    let postContainer = document.getElementById('post-container');
    postContainer.innerText = '';
    if(!first){
        setTimeout(()=>{spinnerController(false)},2000);
    }else{
        spinnerController(false);
    }
    posts.forEach(post => {
        // console.log(post);
        let postDiv = document.createElement('div');
    postDiv.classList = 'flex rounded-3xl gap-3 flex-wrap p-6 lg:px-10 w-full bg-[#797DFC1A] font-inter text-[#12132D99] justify-between ';
    postDiv.innerHTML = `
        <div class="avatar ${post.isActive?"online":"offline"}">
        <div class="w-24 h-24 rounded-xl">
            <img src="${post.image}" />
        </div>
        </div>
        <div class="flex flex-col gap-2 w-[75%]">
        <div class="flex gap-3 font-medium text-sm text-[#12132DCC]">
            <p>#${post.category}</p>
            <p>Author: ${post.author.name ? post.author.name:"Unknown"}</p>
        </div>
        <h3 id="title-${post.id}" class="font-mulish font-bold text-xl text-[#12132D]">${post.title}</h3>
        <p>${post.description}</p>
        <hr>
        <div class="flex gap-3 justify-between">
            <div class="flex gap-3">
            <div class="flex items-center gap-2">
                <i class="fa-regular fa-message"></i>
                <p>${post.comment_count}</p>
            </div>
            <div class="flex items-center gap-2">
                <i class="fa-regular fa-eye"></i>
                <p id="view-${post.id}">${post.view_count}</p>
            </div>
            <div class="flex items-center gap-2">
                <i class="fa-regular fa-clock"></i>
                <p><span>${post.posted_time}</span> min</p>
            </div>
            </div>
            <div class="flex items-center justify-center bg-[#10B981] rounded-full">
            <button class=""><i class="btn-read flex items-center justify-center fa-solid fa-envelope-open text-white font-thin w-8 h-8 "></i></button>
            </div>
        </div>
        </div>

    `;
    postContainer.appendChild(postDiv);
    });
    

    markAsRead()
}

fetchPost('',true);


const markAsRead = ()=> {
    let readBtns = document.querySelectorAll('.btn-read');
    readBtns.forEach((readBtn)=>{
        readBtn.addEventListener('click',(event)=>{
            markAsReadCount++;
            let markAsReadIncrement = document.getElementById('mark-as-read');
            markAsReadIncrement.innerText = markAsReadCount;
            let markedPost = document.getElementById("marked-post");
            let child = event.target.parentNode.parentNode.parentNode.parentNode.children;
            let title = child[1].innerText;
            let viewCount = child[4].children[0].children[1].children[1].innerText;
            console.log(viewCount);
            let readPostDiv = document.createElement("div");
            readPostDiv.classList = 'flex justify-between items-center bg-white p-3 rounded-2xl';
            let readPost = `
                <h4 class="font-semibold text-[#12132D]">${title}</h4>
                <div class="flex items-center gap-2 font-inter text-[#12132D99]">
                  <i class="fa-regular fa-eye"></i>
                  <p>${viewCount}</p>
                </div>
            `;
            readPostDiv.innerHTML = readPost;
            markedPost.appendChild(readPostDiv);
        })
    })
    
}

function spinnerController(isTrue){
    let spinner = document.getElementById('spinner');
    let postContainer = document.getElementById("post-container");
    if(isTrue){
        postContainer.classList.add('hidden');
        spinner.classList.remove('hidden');
    }else{
        spinner.classList.add("hidden");
        postContainer.classList.remove('hidden');
    }
}


let searchFunctionality = () => {
    let search = document.getElementById('search');
    search.addEventListener('click',()=>{
        
        let input = document.getElementById("input-text");
        fetchPost(input.value);
    })
}

searchFunctionality();










