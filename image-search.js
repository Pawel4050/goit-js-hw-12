import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as r,a as m,S as p}from"./assets/vendor-D73Uttp0.js";const y="679609-0229bb159674f4386da445b6d",h=document.getElementById("search-form"),s=document.getElementById("gallery"),a=document.getElementById("load-more"),g=document.getElementById("loader");let n=1,c=0,o="";h.addEventListener("submit",t=>{if(t.preventDefault(),o=t.target.search.value.trim(),!o){r.error({title:"Error",message:"Please enter a search term!"});return}s.innerHTML="",a.style.display="none",n=1,d(o)});a.addEventListener("click",()=>{n++,d(o)});async function d(t){const l=`https://pixabay.com/api/?key=${y}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=40`;try{g.style.display="block";const e=(await m.get(l)).data;if(n===1&&(c=e.totalHits,c===0)){r.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}),s.innerHTML="";return}f(e.hits),s.children.length>=c?(r.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}),a.style.display="none"):a.style.display="block"}catch(i){r.error({title:"Error",message:"Something went wrong. Please try again later."}),console.error("Error fetching images:",i)}finally{g.style.display="none"}}function f(t){const l=t.map(e=>`
        <a href="${e.largeImageURL}" class="image-card">
          <img src="${e.webformatURL}" alt="${e.tags}" />
          <div class="image-info">
            <p><strong>Likes:</strong> ${e.likes}</p>
            <p><strong>Views:</strong> ${e.views}</p>
            <p><strong>Comments:</strong> ${e.comments}</p>
            <p><strong>Downloads:</strong> ${e.downloads}</p>
          </div>
        </a>`).join("");s.insertAdjacentHTML("beforeend",l),new p(".gallery a").refresh()}
//# sourceMappingURL=image-search.js.map
