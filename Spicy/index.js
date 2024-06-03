const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('.cart-close');

btnCart.addEventListener('click',()=>{
cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
    });

document.addEventListener('DOMContentLoaded',loadSpice);

function loadSpice(){
    loadContent();
}

function loadContent(){
    // remove item from cart
    let btnRemove=document.querySelectorAll('.cart-remove');
    btnRemove.forEach((del)=>{
        del.addEventListener('click',removeItem);
    });

    // item quantity change
    let qtyRemove=document.querySelectorAll('.cart-quantity');
    qtyRemove.forEach((quantity)=>{
        quantity.addEventListener('change',changeQty);
    });

    // Add product

    let cartBtn=document.querySelectorAll('.add-cart');
    cartBtn.forEach((btn)=>{
        btn.addEventListener('click',addcart);

    });

    updateTotal();

}

function removeItem(){
    if (confirm('Are you sure!')) {
        let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList=itemList.filter(el=>el.title!=title);
        this.parentElement.remove();
        loadContent();
    }
}

function changeQty(){
    if (isNaN(this.value) || this.value<1) {
        this.value=1;
    }
    loadContent();
}

let itemList=[];

function addcart() {
    let order=this.parentElement;
    let title=order.querySelector('.card-title').innerHTML;
    let amt=order.querySelector('.price').innerHTML;
    let img=order.querySelector('.product-img').src;
    // console.log(title,amt,img);

    let newProduct={title,amt,img};

    //check product already exist in cart
    if(itemList.find((el)=>el.title==newProduct.title)){
        alert("product already added in cart")
        return;
    }else{
        itemList.push(newProduct);
    }

    let newProductElement=createCartProduct(title,amt,img);
    let element=document.createElement('div');
    element.innerHTML=newProductElement;
    let cartBasket=document.querySelector('.cart-container');
    cartBasket.append(element);

    cart.classList.add('cart-active');

    loadContent();
}


function createCartProduct(title,amt,img){

    return ` <div class="cart-box">
    <img src="${img}" class="cart-img">
    <div class="detail-box">
       <div class="cart-food-title">${title}</div>
       <div class="price-box">
         <div class="product-price">${amt}</div>
         <div class="cart-amt">${amt}</div>
       </div>
       <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="fa-solid fa-trash cart-remove"></i>
  </div> `;
}

function updateTotal() {
    const cartItems=document.querySelectorAll('.cart-box');
    const totalValue=document.querySelector('.total-price');
    let total=0;

    cartItems.forEach(product=>{
        let priceEelement=product.querySelector('.product-price');
        let price=parseFloat(priceEelement.innerHTML.replace("RS.",""));
        let qty=product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText="RS."+price*qty;
    });

    totalValue.innerHTML='RS.'+total;
}