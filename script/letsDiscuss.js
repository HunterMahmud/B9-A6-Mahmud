const postApi = 'https://openapi.programming-hero.com/api/retro-forum/posts';

const fetchPost = async()=>{
    let res = await fetch(postApi);
    let data = await res.json();
    // console.log(data.posts);
    loadPosts(data.posts);
    

}

const loadPosts = (posts) => {
    let postContainer = document.getElementById('post-container');
    posts.forEach(post => {
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
        <h3 class="font-mulish font-bold text-xl text-[#12132D]">${post.title}</h3>
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
                <p>1534</p>
            </div>
            <div class="flex items-center gap-2">
                <i class="fa-regular fa-clock"></i>
                <p><span>${post.posted_time}</span> min</p>
            </div>
            </div>
            <div class="flex items-center justify-center w-6 h-6 bg-[#10B981] rounded-full">
            <button><i class="fa-solid fa-envelope-open text-white font-thin"></i></button>
            </div>
        </div>
        </div>

    `;
    postContainer.appendChild(postDiv);
    });
    
}

fetchPost()