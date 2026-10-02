const API_BASE="/api";
const DEFAULT_IMAGE="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";

const state={
  search:"",category:"Semua",status:"semua",sortBy:"id",order:"DESC",
  page:1,limit:12,totalPages:1,totalItems:0,items:[],categories:[],
  cart:[],currentDetailItem:null,deleteTargetId:null
};

try{
  const savedCart=JSON.parse(localStorage.getItem("luvvsCart")||"[]");
  if(Array.isArray(savedCart))state.cart=savedCart.filter(item=>Number.isInteger(Number(item.menuId))&&Number(item.menuId)>0&&Number.isInteger(Number(item.quantity))&&Number(item.quantity)>0&&typeof item.name==="string"&&Number.isFinite(Number(item.price))).map(item=>({
    menuId:Number(item.menuId),name:item.name,price:Number(item.price),image:item.image||DEFAULT_IMAGE,quantity:Math.min(99,Number(item.quantity))
  }));
}catch{state.cart=[]}

const $=id=>document.getElementById(id);
const desktopModeButton=$("btnDesktopMode");
const desktopModeLabel=$("desktopModeLabel");
const viewportMeta=document.querySelector('meta[name="viewport"]');

function applyDesktopMode(enabled,save=true){
  document.body.classList.toggle("desktop-mode",enabled);
  viewportMeta.content=enabled
    ?"width=1200, initial-scale=0.32, maximum-scale=5, user-scalable=yes"
    :"width=device-width, initial-scale=1.0";
  desktopModeButton.setAttribute("aria-pressed",String(enabled));
  desktopModeButton.title=enabled?"Kembali ke tampilan ponsel":"Aktifkan tampilan desktop";
  desktopModeLabel.textContent=enabled?"Mode HP":"Desktop";
  if(save){
    try{localStorage.setItem("luvvsDesktopMode",String(enabled))}catch{}
  }
}

let savedDesktopMode=false;
try{savedDesktopMode=localStorage.getItem("luvvsDesktopMode")==="true"}catch{}
applyDesktopMode(savedDesktopMode,false);

const el={
  serverStatus:$("serverStatus"),search:$("searchInput"),clear:$("btnClearSearch"),
  sort:$("sortSelect"),status:$("statusFilter"),reset:$("btnResetFilters"),
  categories:$("categoriesContainer"),badgeAll:$("badgeAll"),result:$("resultInfoText"),
  limit:$("limitSelect"),grid:$("menuGrid"),empty:$("emptyState"),emptyReset:$("btnEmptyReset"),
  prev:$("btnPrevPage"),next:$("btnNextPage"),pageInfo:$("pageInfo"),
  statTotal:$("statTotal"),statAvailable:$("statAvailable"),statCategories:$("statCategories"),statAverage:$("statAverage"),
  menuModal:$("menuModal"),detailModal:$("detailModal"),deleteModal:$("deleteModal"),
  form:$("menuForm"),modalTitle:$("modalTitle"),modalEyebrow:$("modalEyebrow"),
  id:$("inputId"),nama:$("inputNama"),kategori:$("inputKategori"),harga:$("inputHarga"),
  inputStatus:$("inputStatus"),deskripsi:$("inputDeskripsi"),gambar:$("inputGambar"),preview:$("imagePreview"),
  detailImage:$("detailImage"),detailCategory:$("detailCategory"),detailStatus:$("detailStatus"),
  detailName:$("detailName"),detailPrice:$("detailPrice"),detailDescription:$("detailDescription"),
   deleteText:$("deleteText"),toast:$("toast"),
   cartButton:$("btnOpenCart"),cartCount:$("cartCount"),cartModal:$("cartModal"),
   cartItems:$("cartItems"),cartEmpty:$("cartEmpty"),checkoutForm:$("checkoutForm"),
   customerName:$("customerName"),customerPhone:$("customerPhone"),
   fulfillmentMethod:$("fulfillmentMethod"),deliveryAddressField:$("deliveryAddressField"),
   deliveryAddress:$("deliveryAddress"),orderNotes:$("orderNotes"),cartTotal:$("cartTotal"),
   submitOrderButton:$("btnSubmitOrder"),successModal:$("orderSuccessModal"),
   successText:$("orderSuccessText"),successCode:$("orderSuccessCode"),successTotal:$("orderSuccessTotal")
};

function rupiah(value){
  return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(Number(value)||0);
}
function escapeHTML(value=""){
  return String(value).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function showToast(message,error=false){
  el.toast.textContent=message;
  el.toast.className=`toast show${error?" error":""}`;
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>el.toast.className="toast",2800);
}
function setServer(online){
  el.serverStatus.className=`server-status ${online?"online":"offline"}`;
  el.serverStatus.innerHTML=`<i></i> ${online?"Server online":"Server offline"}`;
}
async function api(url,options={}){
  const response=await fetch(API_BASE+url,{headers:{"Content-Type":"application/json"},...options});
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.message||"Terjadi kesalahan pada server");
  return data;
}
async function checkServerHealth(){
  try{await api("/health");setServer(true)}catch{setServer(false)}
}
async function loadStats(){
  try{
    const r=await api("/menu/stats"),s=r.data;
    el.statTotal.textContent=s.totalMenu;
    el.statAvailable.textContent=s.totalTersedia;
    el.statCategories.textContent=s.totalKategori;
    el.statAverage.textContent=rupiah(s.hargaRataRata);
  }catch{}
}
async function loadCategories(){
  try{
    const r=await api("/menu/categories");
    state.categories=r.data||[];
    renderCategories();
  }catch{
    state.categories=[];renderCategories();
  }
}
function renderCategories(){
  const total=state.categories.reduce((n,c)=>n+Number(c.count),0);
  el.badgeAll.textContent=total;
  const buttons=[`<button class="category ${state.category==="Semua"?"active":""}" data-category="Semua">Semua <span>${total}</span></button>`];
  for(const c of state.categories){
    buttons.push(`<button class="category ${state.category===c.kategori?"active":""}" data-category="${escapeHTML(c.kategori)}">${escapeHTML(c.kategori)} <span>${c.count}</span></button>`);
  }
  el.categories.innerHTML=buttons.join("");
  el.categories.querySelectorAll(".category").forEach(btn=>{
    btn.addEventListener("click",()=>{
      state.category=btn.dataset.category;state.page=1;renderCategories();loadMenu();
    });
  });
}
async function loadMenu(){
  el.grid.innerHTML=`<div class="empty-state"><div class="empty-icon">⏳</div><h3>Memuat menu...</h3></div>`;
  const params=new URLSearchParams({
    q:state.search,kategori:state.category,status:state.status,
    sortBy:state.sortBy,order:state.order,page:state.page,limit:state.limit
  });
  try{
    const r=await api(`/menu?${params}`);
    state.items=r.data||[];
    state.totalItems=Number(r.pagination?.totalItems||0);
    state.totalPages=Number(r.pagination?.totalPages||1);
    state.page=Number(r.pagination?.currentPage||1);
    renderMenu();renderPagination();
  }catch(err){
    el.grid.innerHTML="";
    el.empty.classList.remove("hidden");
    el.result.textContent="Gagal mengambil data menu";
    showToast(err.message,true);
  }
}
function renderMenu(){
  if(!state.items.length){
    el.grid.innerHTML="";el.empty.classList.remove("hidden");
    el.result.textContent="Tidak ada menu yang cocok dengan filter";
    return;
  }
  el.empty.classList.add("hidden");
  const start=(state.page-1)*state.limit+1;
  const end=Math.min(start+state.items.length-1,state.totalItems);
  el.result.textContent=`Menampilkan ${start}–${end} dari ${state.totalItems} menu`;
  el.grid.innerHTML=state.items.map(item=>{
    const available=item.status==="tersedia";
    return `<article class="menu-card" data-id="${item.id}">
      <div class="menu-image">
        <img src="${escapeHTML(item.gambar||DEFAULT_IMAGE)}" alt="${escapeHTML(item.nama)}" loading="lazy" onerror="this.src='${DEFAULT_IMAGE}'">
        <span class="menu-status ${available?"available":"sold"}">${available?"● Tersedia":"● Habis"}</span>
      </div>
      <div class="menu-content">
        <div class="menu-category">${escapeHTML(item.kategori)}</div>
        <h3 class="menu-name">${escapeHTML(item.nama)}</h3>
        <p class="menu-description">${escapeHTML(item.deskripsi||"Tidak ada deskripsi.")}</p>
        <div class="menu-bottom"><strong class="menu-price">${rupiah(item.harga)}</strong><button class="menu-add-btn" type="button" data-add-id="${item.id}" ${available?"":"disabled"}>+ Tambah</button></div>
      </div>
    </article>`;
  }).join("");
  el.grid.querySelectorAll(".menu-card").forEach(card=>card.addEventListener("click",event=>{
    const addButton=event.target.closest(".menu-add-btn");
    if(addButton){event.stopPropagation();addToCart(Number(addButton.dataset.addId));return}
    openDetail(Number(card.dataset.id));
  }));
}
function renderPagination(){
  el.pageInfo.textContent=`Halaman ${state.page} dari ${state.totalPages}`;
  el.prev.disabled=state.page<=1;el.next.disabled=state.page>=state.totalPages;
}
function saveCart(){
  try{localStorage.setItem("luvvsCart",JSON.stringify(state.cart))}catch{}
}
function renderCart(){
  const itemCount=state.cart.reduce((total,item)=>total+item.quantity,0);
  const total=state.cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  el.cartCount.textContent=itemCount>99?"99+":String(itemCount);
  el.cartEmpty.classList.toggle("hidden",state.cart.length>0);
  el.checkoutForm.hidden=state.cart.length===0;
  el.cartTotal.textContent=rupiah(total);
  el.cartItems.innerHTML=state.cart.map(item=>`<article class="cart-item" data-cart-id="${item.menuId}">
    <img class="cart-item-image" src="${escapeHTML(item.image||DEFAULT_IMAGE)}" alt="" onerror="this.src='${DEFAULT_IMAGE}'">
    <div><strong class="cart-item-name">${escapeHTML(item.name)}</strong><span class="cart-item-price">${rupiah(item.price*item.quantity)}</span></div>
    <div class="cart-item-actions">
      <button class="cart-qty-btn" type="button" data-cart-action="decrease" aria-label="Kurangi ${escapeHTML(item.name)}">−</button>
      <span class="cart-quantity">${item.quantity}</span>
      <button class="cart-qty-btn" type="button" data-cart-action="increase" aria-label="Tambah ${escapeHTML(item.name)}">+</button>
      <button class="cart-remove-btn" type="button" data-cart-action="remove" aria-label="Hapus ${escapeHTML(item.name)}">×</button>
    </div>
  </article>`).join("");
}
function addToCart(menuId){
  const item=state.items.find(menu=>Number(menu.id)===menuId);
  if(!item||item.status!=="tersedia")return;
  const existing=state.cart.find(cartItem=>cartItem.menuId===menuId);
  if(existing){
    if(existing.quantity>=99){showToast("Maksimal 99 item untuk satu menu",true);return}
    existing.quantity++;
  }else{
    state.cart.push({menuId:Number(item.id),name:item.nama,price:Number(item.harga),image:item.gambar||DEFAULT_IMAGE,quantity:1});
  }
  saveCart();renderCart();showToast(`${item.nama} masuk ke keranjang`);
}
function changeCartItem(menuId,action){
  const item=state.cart.find(cartItem=>cartItem.menuId===menuId);
  if(!item)return;
  if(action==="remove"||action==="decrease"&&item.quantity===1){
    state.cart=state.cart.filter(cartItem=>cartItem.menuId!==menuId);
  }else if(action==="increase"){
    if(item.quantity>=99){showToast("Maksimal 99 item untuk satu menu",true);return}
    item.quantity++;
  }else if(action==="decrease")item.quantity--;
  saveCart();renderCart();
}
function openCart(){renderCart();el.cartModal.classList.remove("hidden")}
function closeCart(){el.cartModal.classList.add("hidden")}
function updateFulfillmentFields(){
  const delivery=el.fulfillmentMethod.value==="delivery";
  el.deliveryAddressField.classList.toggle("hidden",!delivery);
  el.deliveryAddress.required=delivery;
  if(!delivery)el.deliveryAddress.value="";
}
async function submitOrder(event){
  event.preventDefault();
  if(!state.cart.length)return;
  const button=el.submitOrderButton;
  button.disabled=true;button.textContent="Mengirim pesanan...";
  const payload={
    customerName:el.customerName.value.trim(),customerPhone:el.customerPhone.value.trim(),
    fulfillmentMethod:el.fulfillmentMethod.value,deliveryAddress:el.deliveryAddress.value.trim(),
    notes:el.orderNotes.value.trim(),items:state.cart.map(item=>({menuId:item.menuId,quantity:item.quantity}))
  };
  try{
    const response=await api("/orders",{method:"POST",body:JSON.stringify(payload)});
    state.cart=[];saveCart();renderCart();el.checkoutForm.reset();updateFulfillmentFields();closeCart();
    el.successCode.textContent=response.order.code;
    el.successTotal.textContent=rupiah(response.order.totalAmount);
    el.successText.textContent=response.message||"Pesananmu sudah masuk ke dapur kami.";
    el.successModal.classList.remove("hidden");
  }catch(error){showToast(error.message,true)}
  finally{button.disabled=false;button.textContent="Buat pesanan"}
}
function resetFilters(){
  state.search="";state.category="Semua";state.status="semua";state.sortBy="id";state.order="DESC";state.page=1;
  el.search.value="";el.clear.hidden=true;el.sort.value="id-desc";el.status.value="semua";
  renderCategories();loadMenu();
}
function openAddModal(){
  el.form.reset();el.id.value="";el.preview.hidden=true;el.preview.removeAttribute("src");
  el.modalEyebrow.textContent="MENU BARU";el.modalTitle.textContent="Tambah Menu";
  el.menuModal.classList.remove("hidden");el.nama.focus();
}
function openEditModal(item){
  el.id.value=item.id;el.nama.value=item.nama;el.kategori.value=item.kategori;el.harga.value=item.harga;
  el.inputStatus.value=item.status;el.deskripsi.value=item.deskripsi||"";el.gambar.value=item.gambar||"";
  if(item.gambar){el.preview.src=item.gambar;el.preview.hidden=false}else el.preview.hidden=true;
  el.modalEyebrow.textContent="EDIT MENU";el.modalTitle.textContent="Edit Menu";
  el.menuModal.classList.remove("hidden");el.nama.focus();
}
function closeMenuModal(){el.menuModal.classList.add("hidden")}
function openDetail(id){
  const item=state.items.find(x=>Number(x.id)===id);
  if(!item)return;
  state.currentDetailItem=item;
  el.detailImage.src=item.gambar||DEFAULT_IMAGE;el.detailImage.onerror=()=>el.detailImage.src=DEFAULT_IMAGE;
  el.detailImage.alt=item.nama;el.detailCategory.textContent=item.kategori;
  el.detailStatus.textContent=item.status==="tersedia"?"● Tersedia":"● Habis";
  el.detailStatus.style.color=item.status==="tersedia"?"#6ee7a1":"#ff8989";
  el.detailName.textContent=item.nama;el.detailPrice.textContent=rupiah(item.harga);
  el.detailDescription.textContent=item.deskripsi||"Tidak ada deskripsi untuk menu ini.";
    const addButton=$("btnAddToCartFromDetail");
    addButton.disabled=item.status!=="tersedia";
    addButton.textContent=item.status==="tersedia"?"♡ Tambah ke keranjang":"Menu sedang habis";
  el.detailModal.classList.remove("hidden");
}
function closeDetailModal(){el.detailModal.classList.add("hidden")}
function openDeleteModal(item){
  state.deleteTargetId=item.id;
  el.deleteText.textContent=`Menu "${item.nama}" akan dihapus secara permanen.`;
  el.deleteModal.classList.remove("hidden");
}
function closeDeleteModal(){el.deleteModal.classList.add("hidden")}
async function submitMenu(event){
  event.preventDefault();
  const id=el.id.value;
  const payload={
    nama:el.nama.value.trim(),kategori:el.kategori.value.trim(),harga:Number(el.harga.value),
    status:el.inputStatus.value,deskripsi:el.deskripsi.value.trim(),gambar:el.gambar.value.trim()
  };
  if(!payload.nama||!payload.kategori||!payload.harga){showToast("Nama, kategori, dan harga wajib diisi",true);return}
  const btn=$("btnSubmitMenu");btn.disabled=true;btn.textContent="Menyimpan...";
  try{
    const result=id?await api(`/menu/${id}`,{method:"PUT",body:JSON.stringify(payload)}):await api("/menu",{method:"POST",body:JSON.stringify(payload)});
    showToast(result.message||"Menu berhasil disimpan");
    closeMenuModal();await Promise.all([loadMenu(),loadStats(),loadCategories()]);
  }catch(err){showToast(err.message,true)}
  finally{btn.disabled=false;btn.textContent="Simpan Menu"}
}
async function deleteMenu(){
  if(!state.deleteTargetId)return;
  try{
    const r=await api(`/menu/${state.deleteTargetId}`,{method:"DELETE"});
    showToast(r.message||"Menu berhasil dihapus");closeDeleteModal();closeDetailModal();
    await Promise.all([loadMenu(),loadStats(),loadCategories()]);
  }catch(err){showToast(err.message,true)}
}
el.search.addEventListener("input",e=>{
  state.search=e.target.value;el.clear.hidden=!state.search;state.page=1;
  clearTimeout(loadMenu.timer);loadMenu.timer=setTimeout(loadMenu,300);
});
el.clear.addEventListener("click",()=>{el.search.value="";state.search="";el.clear.hidden=true;state.page=1;loadMenu()});
el.sort.addEventListener("change",e=>{[state.sortBy,state.order]=e.target.value.split("-");state.page=1;loadMenu()});
el.status.addEventListener("change",e=>{state.status=e.target.value;state.page=1;loadMenu()});
el.limit.addEventListener("change",e=>{state.limit=Number(e.target.value);state.page=1;loadMenu()});
el.reset.addEventListener("click",resetFilters);el.emptyReset.addEventListener("click",resetFilters);
el.prev.addEventListener("click",()=>{if(state.page>1){state.page--;loadMenu();window.scrollTo({top:350,behavior:"smooth"})}});
el.next.addEventListener("click",()=>{if(state.page<state.totalPages){state.page++;loadMenu();window.scrollTo({top:350,behavior:"smooth"})}});
$("btnOpenAddModal").addEventListener("click",openAddModal);$("btnCloseModal").addEventListener("click",closeMenuModal);$("btnCancelModal").addEventListener("click",closeMenuModal);
desktopModeButton.addEventListener("click",()=>applyDesktopMode(!document.body.classList.contains("desktop-mode")));
el.form.addEventListener("submit",submitMenu);
el.gambar.addEventListener("input",()=>{const url=el.gambar.value.trim();if(url){el.preview.src=url;el.preview.hidden=false;el.preview.onerror=()=>el.preview.src=DEFAULT_IMAGE}else el.preview.hidden=true});
$("btnCloseDetail").addEventListener("click",closeDetailModal);
$("btnEditFromDetail").addEventListener("click",()=>{const item=state.currentDetailItem;closeDetailModal();openEditModal(item)});
$("btnAddToCartFromDetail").addEventListener("click",()=>{
  if(state.currentDetailItem){addToCart(Number(state.currentDetailItem.id));closeDetailModal()}
});
$("btnDeleteFromDetail").addEventListener("click",()=>openDeleteModal(state.currentDetailItem));
$("btnCancelDelete").addEventListener("click",closeDeleteModal);$("btnConfirmDelete").addEventListener("click",deleteMenu);
el.cartButton.addEventListener("click",openCart);
$("btnCloseCart").addEventListener("click",closeCart);
$("btnContinueShopping").addEventListener("click",closeCart);
el.cartItems.addEventListener("click",event=>{
  const button=event.target.closest("[data-cart-action]");
  if(button)changeCartItem(Number(button.closest(".cart-item").dataset.cartId),button.dataset.cartAction);
});
el.checkoutForm.addEventListener("submit",submitOrder);
el.fulfillmentMethod.addEventListener("change",updateFulfillmentFields);
$("btnCloseOrderSuccess").addEventListener("click",()=>el.successModal.classList.add("hidden"));
[el.menuModal,el.detailModal,el.deleteModal,el.cartModal,el.successModal].forEach(modal=>modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.add("hidden")}));
window.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenuModal();closeDetailModal();closeDeleteModal();closeCart();el.successModal.classList.add("hidden")}});
renderCart();updateFulfillmentFields();

async function init(){
  await checkServerHealth();
  await Promise.all([loadStats(),loadCategories()]);
  await loadMenu();
  setInterval(checkServerHealth,30000);
}
document.addEventListener("DOMContentLoaded",init);
