(function(){
var C=[
["00-executive-brief","00 Role and interview strategy","role authority delivery gap introduction STAR","core"],
["01-role-company-prep","01 Role and Bosch preparation","job posting Bosch Vehicle Motion panel questions","core"],
["02-eps-product","02 EPS product fundamentals","torque assist returnability degraded loss of assist","core"],
["03-embedded-foundation","03 Embedded and real-time","interrupt RTOS jitter WCET watchdog CAN","depth"],
["04-c-reading","04 Reading C and scripts","pointer volatile MISRA debugging python","depth"],
["05-architecture-autosar","05 Architecture and AUTOSAR","RTE BSW MCAL budgets interfaces","core"],
["06-functional-safety","06 Functional safety and ASIL D","ISO 26262 HARA safety goal safe state","core"],
["07-cybersecurity","07 Cybersecurity and DevSecOps","21434 TARA R155 R156 SBOM","core"],
["08-vv-aspice","08 V&V and ASPICE","traceability HIL coverage evidence","core"],
["09-agile-safe-lean","09 Agile, SAFe, Lean flow","PI planning ART WIP dependencies","core"],
["10-devops-release","10 DevOps and release engineering","pipeline baseline provenance quality gate","core"],
["11-github-actions","11 GitHub and Actions","workflow runner OIDC secrets","depth"],
["12-sdv","12 Software-defined vehicle","zonal OTA SOA","depth"],
["13-ai-leadership","13 AI-driven leadership","Copilot governance hallucination pilot","core"],
["14-customer-escalation","14 Customer escalation leadership","containment recovery plan status","core"],
["15-problem-solving-field-quality","15 Problem solving, 8D, field quality","8D root cause warranty recall","core"],
["16-supplier-commercial","16 Supplier, OEM and commercial","interface agreement change request scope claim","core"],
["17-global-teams","17 Global team leadership","RACI decision rights topology conflict","core"],
["18-metrics","18 Metrics and decisions","DORA Goodhart flow dashboard","core"],
["19-first-90-days","19 First 90 days","plan assessment quick wins","core"],
["21-interview-playbook","21 Interview playbook","whiteboard unknown answers closing","core"],
["22-case-studies-part1","22 Integrated case studies — Part 1","escalation release gate","core"],
["22-case-studies-part2","22 Integrated case studies — Part 2","escalation release gate","core"],
["22-case-studies-part3","22 Integrated case studies — Part 3","escalation release gate","core"]];
var inCh=location.pathname.indexOf('/chapters/')>-1,root=inCh?'../':'',cur=location.pathname.split('/').pop().replace('.html','');
var D=document,h=D.documentElement,t=localStorage.getItem('theme');if(t)h.dataset.theme=t;if(localStorage.getItem('easy')=='1')h.dataset.easy='1';
var a=D.createElement('aside');a.setAttribute('aria-label','Chapters');
a.innerHTML='<a href="'+root+'index.html"><b>EPS Leadership Academy</b></a><input id="q" type="search" placeholder="Search guide" aria-label="Search"><div id="res"></div>'+
C.map(function(c){return '<a href="'+root+'chapters/'+c[0]+'.html"'+(c[0]==cur?' aria-current="page"':'')+'>'+(c[3]=='core'?'\u2605 ':'')+c[1]+'</a>'}).join('')+
'<button id="th" style="margin-top:10px">Light/dark</button> <button onclick="print()">Print chapter</button> <button id="ez" aria-pressed="false">Easy-read</button>';
D.body.prepend(a);
var m=D.createElement('button');m.id='menu';m.textContent='Menu';m.onclick=function(){a.classList.toggle('open')};D.body.prepend(m);
var p=D.createElement('div');p.id='prog';D.body.prepend(p);
addEventListener('scroll',function(){p.style.width=100*scrollY/Math.max(1,h.scrollHeight-innerHeight)+'%'});
D.getElementById('th').onclick=function(){h.dataset.theme=h.dataset.theme=='dark'?'light':'dark';localStorage.setItem('theme',h.dataset.theme)};
var ez=D.getElementById('ez');function sy(){ez.setAttribute('aria-pressed',h.dataset.easy?'true':'false')}sy();ez.onclick=function(){if(h.dataset.easy){delete h.dataset.easy;localStorage.setItem('easy','0')}else{h.dataset.easy='1';localStorage.setItem('easy','1')}sy()};
D.getElementById('q').oninput=function(e){var v=e.target.value.toLowerCase(),r=D.getElementById('res');
r.innerHTML=v.length<2?'':C.filter(function(c){return (c[1]+' '+c[2]).toLowerCase().indexOf(v)>-1}).map(function(c){return '<a href="'+root+'chapters/'+c[0]+'.html">'+c[1]+'</a>'}).join('')||'No match'};
var i=C.findIndex(function(c){return c[0]==cur});
var n=D.querySelector('.pn');if(n&&i>-1){var pv=C[i-1],nx=C[i+1];
n.innerHTML=(pv?'<a href="'+pv[0]+'.html">&larr; '+pv[1]+'</a>':'<span></span>')+(nx?'<a href="'+nx[0]+'.html">'+nx[1]+' &rarr;</a>':'')}
var mh=Array.prototype.filter.call(D.querySelectorAll('h2'),function(x){return x.textContent=='Chapter map'})[0];
var mt=mh&&mh.nextElementSibling;if(mt&&mt.tagName=='TABLE')mt.innerHTML='<tr><th>Chapter</th><th>Tier</th></tr>'+C.map(function(c){return '<tr><td><a href="chapters/'+c[0]+'.html">'+c[1]+'</a></td><td>'+(c[3]=='core'?'Core':'Depth')+'</td></tr>'}).join('');
D.querySelectorAll('.chk input').forEach(function(x,k){var key=cur+':'+k;x.checked=localStorage.getItem(key)=='1';x.onchange=function(){localStorage.setItem(key,x.checked?'1':'0')}});
})();
