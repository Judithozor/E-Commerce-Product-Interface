(function(){
  var P=[
    {id:1,n:'Adire Indigo Throw',c:'Textiles',m:'Abeokuta',p:28500,r:4.8,rv:112,s:14,a:'#25347F',b:'#9FB0F5',t:'circles'},
    {id:2,n:'Aso-oke Table Runner',c:'Textiles',m:'Iseyin',p:18000,r:4.6,rv:64,s:9,a:'#7A2E3B',b:'#F0C27A',t:'stripe'},
    {id:3,n:'Kano Leather Pouffe',c:'Home',m:'Kano',p:42000,o:48000,r:4.7,rv:88,s:6,a:'#8A4B22',b:'#E8B98A',t:'diamond'},
    {id:4,n:'Ilorin Clay Water Pot',c:'Home',m:'Ilorin',p:12500,r:4.5,rv:51,s:22,a:'#B0542E',b:'#F3C9A8',t:'wave'},
    {id:5,n:'Raffia Market Basket',c:'Bags',m:'Akwa Ibom',p:9800,r:4.4,rv:140,s:30,a:'#C79A3B',b:'#FFF0BF',t:'cross'},
    {id:6,n:'Ankara Weekender Bag',c:'Bags',m:'Lagos',p:26000,r:4.6,rv:97,s:0,a:'#0F6B6B',b:'#F2B705',t:'dots'},
    {id:7,n:'Aba Leather Tote',c:'Bags',m:'Aba',p:35500,r:4.9,rv:203,s:11,a:'#3B2A22',b:'#C58B5C',t:'stripe'},
    {id:8,n:'Raw Shea Butter, 500 g',c:'Beauty',m:'Bida',p:4500,r:4.7,rv:320,s:80,a:'#E7DDB8',b:'#B79B4C',t:'dots'},
    {id:9,n:'Black Soap Bar Set',c:'Beauty',m:'Ibadan',p:3800,r:4.5,rv:210,s:55,a:'#1E1F2B',b:'#6C7090',t:'cross'},
    {id:10,n:'Moringa Hair Oil',c:'Beauty',m:'Enugu',p:5200,r:4.3,rv:44,s:18,a:'#2F6B3A',b:'#BFE3A5',t:'wave'},
    {id:11,n:'Iroko Spoon Set',c:'Kitchen',m:'Enugu',p:7400,r:4.6,rv:73,s:25,a:'#7B4A24',b:'#E2B987',t:'stripe'},
    {id:12,n:'Cast Aluminium Pot',c:'Kitchen',m:'Aba',p:22000,r:4.2,rv:35,s:7,a:'#6A7380',b:'#D3D9E2',t:'circles'},
    {id:13,n:'Calabash Serving Bowl',c:'Kitchen',m:'Sokoto',p:6500,r:4.5,rv:59,s:20,a:'#9A5B1E',b:'#F2D08A',t:'diamond'},
    {id:14,n:'Cotton Wrapper Blanket',c:'Textiles',m:'Okene',p:19500,o:24000,r:4.4,rv:46,s:12,a:'#A3322B',b:'#F5D7BF',t:'stripe'},
    {id:15,n:'Woven Floor Mat',c:'Home',m:'Ibadan',p:8900,r:4.3,rv:38,s:16,a:'#4D6B3C',b:'#E4DDA0',t:'cross'},
    {id:16,n:'Benin Brass Candle Holder',c:'Home',m:'Benin City',p:31000,r:4.8,rv:67,s:4,a:'#8C6B16',b:'#FBE08A',t:'diamond'}
  ];
  var CATS=['Textiles','Home','Bags','Beauty','Kitchen'];
  var FREE=60000, MAXP=50000;
  var $=function(i){return document.getElementById(i)};
  var st={q:'',cats:{},max:MAXP,rate:0,stock:false,sort:'feat'};
  var cart=[];
  try{var raw=localStorage.getItem('ahia-cart');if(raw){cart=JSON.parse(raw).filter(function(l){return P.some(function(p){return p.id===l.id})})}}catch(e){cart=[]}
  function save(){try{localStorage.setItem('ahia-cart',JSON.stringify(cart))}catch(e){}}
  function byId(id){return P.filter(function(p){return p.id===id})[0]}
  function money(n){return '₦'+n.toLocaleString('en-NG')}

  function art(p){
    var id='pt'+p.id,tile,sz=20;
    if(p.t==='circles'){tile='<circle cx="10" cy="10" r="7" fill="none" stroke="'+p.b+'" stroke-width="1.6"/><circle cx="10" cy="10" r="2.2" fill="'+p.b+'"/>'}
    else if(p.t==='stripe'){sz=14;tile='<rect x="0" y="0" width="5" height="14" fill="'+p.b+'"/>'}
    else if(p.t==='diamond'){tile='<path d="M10 2 18 10 10 18 2 10Z" fill="none" stroke="'+p.b+'" stroke-width="1.6"/>'}
    else if(p.t==='dots'){sz=16;tile='<circle cx="8" cy="8" r="3" fill="'+p.b+'"/>'}
    else if(p.t==='wave'){tile='<path d="M0 10Q5 2 10 10T20 10" fill="none" stroke="'+p.b+'" stroke-width="2"/>'}
    else{tile='<path d="M10 3v14M3 10h14" stroke="'+p.b+'" stroke-width="2" stroke-linecap="round"/>'}
    return '<svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" role="img" aria-label="'+p.n+' pattern"><defs><pattern id="'+id+'" width="'+sz+'" height="'+sz+'" patternUnits="userSpaceOnUse">'+tile+'</pattern></defs><rect width="160" height="120" fill="'+p.a+'"/><rect width="160" height="120" fill="url(#'+id+')" opacity=".85"/></svg>'
  }

  function inCart(id){var l=cart.filter(function(x){return x.id===id})[0];return l?l.q:0}

  function filtered(){
    var q=st.q.trim().toLowerCase(),any=Object.keys(st.cats).some(function(k){return st.cats[k]});
    var out=P.filter(function(p){
      if(q&&(p.n+' '+p.c+' '+p.m).toLowerCase().indexOf(q)<0)return false;
      if(any&&!st.cats[p.c])return false;
      if(p.p>st.max)return false;
      if(p.r<st.rate)return false;
      if(st.stock&&p.s<1)return false;
      return true});
    var s=st.sort;
    if(s==='plow')out.sort(function(a,b){return a.p-b.p});
    else if(s==='phigh')out.sort(function(a,b){return b.p-a.p});
    else if(s==='rate')out.sort(function(a,b){return b.r-a.r||b.rv-a.rv});
    else if(s==='rev')out.sort(function(a,b){return b.rv-a.rv});
    return out}

  function renderCats(){
    $('f-cats').innerHTML=CATS.map(function(c){
      var n=P.filter(function(p){return p.c===c}).length;
      return '<label class="check"><input type="checkbox" data-cat="'+c+'"'+(st.cats[c]?' checked':'')+'> '+c+'<span class="ct mono">'+n+'</span></label>'}).join('')}

  function renderGrid(){
    var list=filtered();
    $('count').innerHTML='<b>'+list.length+'</b> of '+P.length+' products';
    var chips=[];
    if(st.q.trim())chips.push(['q','“'+st.q.trim()+'”']);
    CATS.forEach(function(c){if(st.cats[c])chips.push(['cat:'+c,c])});
    if(st.max<MAXP)chips.push(['max','Up to '+money(st.max)]);
    if(st.rate)chips.push(['rate',st.rate.toFixed(1)+'+ rating']);
    if(st.stock)chips.push(['stock','In stock']);
    $('chips').innerHTML=chips.map(function(c){return '<span class="chip">'+c[1]+'<button type="button" data-chip="'+c[0]+'" aria-label="Remove filter '+c[1]+'">×</button></span>'}).join('');
    $('chips').hidden=!chips.length;
    if(!list.length){$('grid').innerHTML='<div class="empty" style="grid-column:1/-1"><h2>Nothing matches yet</h2><p>Try a wider price range or remove a filter.</p></div>';return}
    $('grid').innerHTML=list.map(function(p){
      var out=p.s<1,have=inCart(p.id),maxed=have>=p.s;
      var badges=(p.o?'<span class="badge sale">Sale</span>':'')+(out?'<span class="badge">Sold out</span>':(p.s<=6?'<span class="badge low">'+p.s+' left</span>':''));
      return '<article class="card'+(out?' out':'')+'"><div class="img">'+art(p)+'<div class="badges">'+badges+'</div></div>'+
        '<div class="body"><div class="made">'+p.m+' · '+p.c+'</div><h2>'+p.n+'</h2>'+
        '<div class="rating"><b>'+p.r.toFixed(1)+'</b> ★ ('+p.rv+')</div>'+
        '<div class="buy"><div class="price">'+(p.o?'<s>'+money(p.o)+'</s>':'')+money(p.p)+'</div>'+
        '<button class="add" type="button" data-add="'+p.id+'"'+(out||maxed?' disabled':'')+'>'+(out?'Sold out':(maxed?'In cart':'Add to cart'))+'</button></div></div></article>'}).join('')}

  function renderCart(){
    var n=cart.reduce(function(a,l){return a+l.q},0),sub=cart.reduce(function(a,l){return a+byId(l.id).p*l.q},0);
    $('cart-n').textContent=n;
    $('open-cart').setAttribute('aria-label','Open cart, '+n+' items');
    if(!cart.length){
      $('dlist').innerHTML='<li class="dempty">Your cart is empty. Add something from the shelves.</li>';
      $('dfoot').innerHTML='<button class="go" type="button" disabled>Checkout</button>';return}
    $('dlist').innerHTML=cart.map(function(l){
      var p=byId(l.id);
      return '<li class="line"><div class="thumb">'+art(p).replace(/id="pt/g,'id="cpt').replace(/url\(#pt/g,'url(#cpt')+'</div><div style="min-width:0"><div class="nm">'+p.n+'</div><div class="made">'+p.m+'</div>'+
        '<div class="meta"><div class="qty"><button type="button" data-dec="'+p.id+'" aria-label="Decrease quantity">−</button><span>'+l.q+'</span><button type="button" data-inc="'+p.id+'" aria-label="Increase quantity"'+(l.q>=p.s?' disabled':'')+'>+</button></div>'+
        '<span class="mono">'+money(p.p*l.q)+'</span></div><button class="rm" type="button" data-rm="'+p.id+'">Remove</button></div></li>'}).join('');
    var left=Math.max(0,FREE-sub),pct=Math.min(100,Math.round(sub/FREE*100)),ship=left===0?0:3500;
    $('dfoot').innerHTML='<div class="ship">'+(left===0?'You get free delivery.':'Add '+money(left)+' more for free delivery.')+'<div class="meter"><i style="width:'+pct+'%"></i></div></div>'+
      '<div class="row"><span>Subtotal</span><span class="mono">'+money(sub)+'</span></div>'+
      '<div class="row"><span>Delivery</span><span class="mono">'+(ship?money(ship):'Free')+'</span></div>'+
      '<div class="row total"><span>Total</span><span class="mono">'+money(sub+ship)+'</span></div>'+
      '<button class="go" type="button" id="checkout">Checkout</button><p class="note" id="note" hidden>This is a demo storefront. No payment is taken.</p>'}

  var tt;function toast(m){var t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('on')},1800)}
  var lastFocus=null;
  function openCart(){lastFocus=document.activeElement;$('drawer').classList.add('on');$('scrim').classList.add('on');$('drawer').setAttribute('aria-hidden','false');$('close-cart').focus()}
  function closeCart(){$('drawer').classList.remove('on');$('scrim').classList.remove('on');$('drawer').setAttribute('aria-hidden','true');if(lastFocus&&lastFocus.focus)lastFocus.focus()}
  function setQty(id,q){var p=byId(id);q=Math.min(q,p.s);cart=cart.filter(function(l){return l.id!==id});if(q>0)cart.push({id:id,q:q});save();renderCart();renderGrid()}

  $('q').addEventListener('input',function(e){st.q=e.target.value;renderGrid()});
  $('sort').addEventListener('change',function(e){st.sort=e.target.value;renderGrid()});
  $('f-price').addEventListener('input',function(e){st.max=+e.target.value;$('f-price-v').textContent=(st.max>=MAXP?'Up to ':'Up to ')+money(st.max);renderGrid()});
  $('f-stock').addEventListener('change',function(e){st.stock=e.target.checked;renderGrid()});
  $('f-cats').addEventListener('change',function(e){var c=e.target.getAttribute('data-cat');if(c){st.cats[c]=e.target.checked;renderGrid()}});
  $('f-rate').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;st.rate=+b.getAttribute('data-r');syncRate();renderGrid()});
  function syncRate(){[].forEach.call($('f-rate').children,function(b){b.setAttribute('aria-pressed',String(+b.getAttribute('data-r')===st.rate))})}
  function reset(){st={q:'',cats:{},max:MAXP,rate:0,stock:false,sort:st.sort};$('q').value='';$('f-price').value=MAXP;$('f-price-v').textContent='Up to '+money(MAXP);$('f-stock').checked=false;renderCats();syncRate();renderGrid()}
  $('clear').addEventListener('click',reset);
  $('chips').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var k=b.getAttribute('data-chip');
    if(k==='q'){st.q='';$('q').value=''}
    else if(k.indexOf('cat:')===0){st.cats[k.slice(4)]=false;renderCats()}
    else if(k==='max'){st.max=MAXP;$('f-price').value=MAXP;$('f-price-v').textContent='Up to '+money(MAXP)}
    else if(k==='rate'){st.rate=0;syncRate()}
    else if(k==='stock'){st.stock=false;$('f-stock').checked=false}
    renderGrid()});
  $('fbtn').addEventListener('click',function(){var o=$('filters').classList.toggle('open');this.setAttribute('aria-expanded',String(o))});
  $('grid').addEventListener('click',function(e){var b=e.target.closest('[data-add]');if(!b)return;var id=+b.getAttribute('data-add');setQty(id,inCart(id)+1);toast(byId(id).n+' added to cart')});
  $('dlist').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
    var g=function(a){var v=b.getAttribute(a);return v?+v:null};
    if(g('data-inc')!==null)setQty(g('data-inc'),inCart(g('data-inc'))+1);
    else if(g('data-dec')!==null)setQty(g('data-dec'),inCart(g('data-dec'))-1);
    else if(g('data-rm')!==null)setQty(g('data-rm'),0)});
  $('dfoot').addEventListener('click',function(e){if(e.target.id==='checkout'){$('note').hidden=false}});
  $('open-cart').addEventListener('click',openCart);
  $('close-cart').addEventListener('click',closeCart);
  $('scrim').addEventListener('click',closeCart);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&$('drawer').classList.contains('on'))closeCart()});

  renderCats();renderGrid();renderCart();
})();