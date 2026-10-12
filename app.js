const toast = document.getElementById("toast");
const eraButtons = [...document.querySelectorAll(".era-chip")];
const index = [["赤壁之战","建安十三年 · 曹操、孙权与刘备"],["秦始皇","秦 · 统一、郡县与巡游"],["丝绸之路","专题 · 张骞、西域与世界的相遇"],["利簋","夏商周 · 被铭文记住的牧野之后"],["王安石变法","北宋 · 改革、争论与制度"]];
const profiles = {
  "曹操":["曹操","北方的实际控制者。对他而言，南下既是统一的机会，也是一次高成本的豪赌。"],
  "孙权":["孙权","二十六岁的江东之主。他需要决定的是投降是否真的比战争更安全。"],
  "刘备":["刘备","刚经历长坂坡撤退的刘备，需要江东联盟，也需要一个重新立足的机会。"],
  "汉献帝":["汉献帝","名义上的天下共主，实际却早已被不同势力借用为政治合法性的来源。"],
  "周瑜":["周瑜","江东主战派的前线统帅。他对水战与江东军情的判断，是赤壁战局的关键。"]
};
function toastMessage(message){toast.textContent=message;toast.classList.add("show");clearTimeout(window.toastClock);window.toastClock=setTimeout(()=>toast.classList.remove("show"),2200)}
function setView(id){
  if(id==="chronicle"){
    document.querySelectorAll(".view").forEach(view=>view.classList.toggle("active-view",view.id==="home"));
    document.querySelectorAll(".main-nav [data-go]").forEach(button=>button.classList.toggle("nav-active",button.dataset.go==="chronicle"));
    document.getElementById("chronicle").scrollIntoView({behavior:"smooth",block:"start"});
    return;
  }
  document.querySelectorAll(".view").forEach(view=>view.classList.toggle("active-view",view.id===id));
  document.querySelectorAll(".main-nav [data-go]").forEach(button=>button.classList.toggle("nav-active",button.dataset.go===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-go]").forEach(button=>button.addEventListener("click",event=>{event.preventDefault();setView(button.dataset.go)}));
eraButtons.forEach(button=>button.addEventListener("click",()=>{eraButtons.forEach(item=>item.classList.remove("selected"));button.classList.add("selected");document.getElementById("activeEra").textContent=button.dataset.era;document.getElementById("eraTime").textContent=button.dataset.time;document.getElementById("eraHeading").textContent=button.dataset.era;document.getElementById("eraNote").textContent=button.dataset.note;button.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}));
document.querySelectorAll("[data-story]").forEach(button=>button.addEventListener("click",()=>{setView("reader");toastMessage(`正在打开《${button.dataset.story}》`)}));
document.querySelectorAll("[data-topic]").forEach(button=>button.addEventListener("click",()=>toastMessage(`已为你准备专题：${button.dataset.topic}`)));
document.getElementById("saveStory").addEventListener("click",event=>{event.currentTarget.classList.toggle("saved");toastMessage(event.currentTarget.classList.contains("saved")?"已收藏到你的历史书架":"已取消收藏")});
document.querySelectorAll(".map-marker").forEach(marker=>marker.addEventListener("click",()=>document.getElementById("mapNarrative").textContent=marker.dataset.mapNote));
function showProfile(name){const person=profiles[name];document.getElementById("personInspector").innerHTML=`<p>人物现场</p><h2>${person[0]}</h2><span>${person[1]}</span>`;toastMessage(`正在查看：${name}`)}
document.querySelectorAll("[data-person]").forEach(button=>button.addEventListener("click",()=>showProfile(button.dataset.person)));
const layer=document.getElementById("searchLayer"),searchInput=document.getElementById("searchInput"),searchResults=document.getElementById("searchResults");
function renderSearch(query=""){const q=query.trim();if(!q){searchResults.innerHTML='<p>你可以从 <button data-query="赤壁之战">赤壁之战</button>、<button data-query="秦始皇">秦始皇</button> 或 <button data-query="丝绸之路">丝绸之路</button> 开始。</p>'}else{const found=index.filter(item=>item.join("").includes(q));searchResults.innerHTML=found.length?found.map(item=>`<div class="search-result" data-result="${item[0]}"><strong>${item[0]}</strong><span>${item[1]}</span></div>`).join(""):`<p>没有找到“${q}”。试试人物、事件或时代名称。</p>`}searchResults.querySelectorAll("[data-query]").forEach(button=>button.addEventListener("click",()=>{searchInput.value=button.dataset.query;renderSearch(button.dataset.query)}));searchResults.querySelectorAll("[data-result]").forEach(result=>result.addEventListener("click",()=>{layer.hidden=true;setView("reader");toastMessage(`正在前往：${result.dataset.result}`)}))}
document.getElementById("openSearch").addEventListener("click",()=>{layer.hidden=false;searchInput.focus();renderSearch()});
document.getElementById("closeSearch").addEventListener("click",()=>layer.hidden=true);
searchInput.addEventListener("input",event=>renderSearch(event.target.value));
document.addEventListener("keydown",event=>{if(event.key==="Escape")layer.hidden=true;if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){event.preventDefault();layer.hidden=false;searchInput.focus();renderSearch()}});
document.querySelectorAll(".rail-tab").forEach(tab=>tab.addEventListener("click",()=>{document.querySelectorAll(".rail-tab").forEach(item=>item.classList.remove("active"));tab.classList.add("active");const content={people:'<p class="context-eyebrow">此刻在场</p><button class="person-mini" data-person="孙权"><b>孙</b><span><strong>孙权</strong><small>江东之主，26 岁</small></span><i data-lucide="arrow-up-right"></i></button><button class="person-mini" data-person="曹操"><b>曹</b><span><strong>曹操</strong><small>丞相，北方实际控制者</small></span><i data-lucide="arrow-up-right"></i></button><button class="person-mini" data-person="周瑜"><b>周</b><span><strong>周瑜</strong><small>主战派核心将领</small></span><i data-lucide="arrow-up-right"></i></button>',map:'<p class="context-eyebrow">空间线索</p><p style="font-size:13px;color:#5f6d70">长江不是一条抽象的线。对北方军队，它意味着陌生的水战；对江东，则是可以依赖的天然防线。</p>',sources:'<p class="context-eyebrow">本节依据</p><p style="font-size:13px;color:#5f6d70">《三国志·吴主传》及裴松之注。兵力、地点等细节在后世叙事中常有夸张或演绎。</p>'};document.getElementById("contextContent").innerHTML=content[tab.dataset.context];document.querySelectorAll("#contextContent [data-person]").forEach(button=>button.addEventListener("click",()=>showProfile(button.dataset.person)));lucide.createIcons()}));
lucide.createIcons();
