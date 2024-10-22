import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as s,a as d,S as p}from"./assets/vendor-Qob_5Ba8.js";const h="679609-0229bb159674f4386da445b6d",y=document.getElementById("search-form"),g=document.getElementById("gallery"),n=document.getElementById("load-more");let a="",r=1;const l=40;let c=0;y.addEventListener("submit",async t=>{if(t.preventDefault(),a=t.target.search.value.trim(),!a){s.error({title:"Error",message:"Please enter a search term!"});return}r=1,g.innerHTML="",n.style.display="none",await m(a)});n.addEventListener("click",async()=>{r+=1,await m(a)});async function m(t){const o=`https://pixabay.com/api/?key=${h}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${l}`;try{const e=(await d.get(o)).data;if(e.hits.length===0&&r===1){s.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"});return}c=e.totalHits,f(e.hits),r*l>=c?(n.style.display="none",s.info({title:"End of results",message:"We're sorry, but you've reached the end of search results."})):n.style.display="block",u()}catch(i){s.error({title:"Error",message:"Something went wrong. Please try again later."}),console.error("Error fetching images:",i)}}function f(t){const o=t.map(e=>`
        <a href="${e.largeImageURL}" class="image-card">
          <img src="${e.webformatURL}" alt="${e.tags}" />
          <div class="image-info">
            <p><strong>Likes:</strong> ${e.likes}</p>
            <p><strong>Views:</strong> ${e.views}</p>
            <p><strong>Comments:</strong> ${e.comments}</p>
            <p><strong>Downloads:</strong> ${e.downloads}</p>
          </div>
        </a>`).join("");g.insertAdjacentHTML("beforeend",o),new p(".gallery a").refresh()}function u(){const t=document.querySelector(".image-card");if(t){const o=t.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}
//# sourceMappingURL=image-search.js.map
