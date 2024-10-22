import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as o,S as s}from"./assets/vendor-5ObWk2rO.js";const a="679609-0229bb159674f4386da445b6d",i=document.getElementById("search-form"),n=document.getElementById("gallery");i.addEventListener("submit",r=>{r.preventDefault();const t=r.target.search.value.trim();if(!t){o.error({title:"Error",message:"Please enter a search term!"});return}g(t)});function g(r){const t=`https://pixabay.com/api/?key=${a}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true`;n.innerHTML="",fetch(t).then(e=>e.json()).then(e=>{if(e.hits.length===0){o.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}),n.innerHTML="";return}l(e.hits)}).catch(e=>{o.error({title:"Error",message:"Something went wrong. Please try again later."}),console.error("Error fetching images:",e)})}function l(r){n.innerHTML=r.map(e=>`
        <a href="${e.largeImageURL}" class="image-card">
          <img src="${e.webformatURL}" alt="${e.tags}" />
          <div class="image-info">
            <p><strong>Likes:</strong> ${e.likes}</p>
            <p><strong>Views:</strong> ${e.views}</p>
            <p><strong>Comments:</strong> ${e.comments}</p>
            <p><strong>Downloads:</strong> ${e.downloads}</p>
          </div>
        </a>`).join(""),new s(".gallery a",{}).refresh()}
//# sourceMappingURL=image-search.js.map
