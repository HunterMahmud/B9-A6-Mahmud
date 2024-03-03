let latestApi = "https://openapi.programming-hero.com/api/retro-forum/latest-posts";

const latestPost = async () => {
    const res = await fetch(latestApi);
    const data = await res.json();
    // console.log(data);
    loadLatestPosts(data);
}

const loadLatestPosts = (posts) => {
    let latestPostContainer =  document.getElementById('latest-post-container');
    posts.forEach(post => {
        let latestPostDiv = document.createElement('div');
        latestPostDiv.classList = 'card bg-white border-2 border-[#12132D26]';
        latestPostDiv.innerHTML = `
        <figure class="px-5 md:px-8 pt-5 md:pt-8">
          <img src="${post.cover_image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body">
          <div class="flex gap-2 items-center">
            <i class="fa-regular fa-calendar"></i>
            <p class="text-[#12132D99]">${post.author?.posted_date? post.author.posted_date: "No Pusblish Date"}</p>
          </div>
          <h2 class="font-extrabold text-lg text-[#12132D]">${post.title}</h2>
          <p class="text-[#12132D99]">${post.description}</p>
          <div class="flex gap-5">
            <div class="w-11 h-11 ">
              <img class="rounded-full" src="${post.profile_image}" alt="">
            </div>
            <div>
               <h4 class="font-bold text-[#12132D]">${post.author?.name}</h4>
               <p class="text-[#12132D99]">${post.author?.designation ? post.author.designation:'Unknown'} </p>
            </div>
          </div>
        </div>
        `;
        latestPostContainer.appendChild(latestPostDiv);
    });
}

latestPost()


