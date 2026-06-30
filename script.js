let menu = JSON.parse(localStorage.getItem("menu")) || [];

// نمایش محصولات
function render() {

    const menuBox = document.getElementById("menu");
    menuBox.innerHTML = "";

    menu.forEach((item, index) => {

        menuBox.innerHTML += `
        <div class="card" data-category="${item.category || 'سایر'}">

            <img src="${item.img}" alt="${item.name}">

            <div class="info">

                <p>${item.name}</p>

                <span>${item.price} تومان</span>

                <br><br>

                <button onclick="removeItem(${index})">
                حذف
                </button>

            </div>

        </div>
        `;

    });

}

// باز کردن پنل
function openPanel(){
    document.getElementById("panel").style.display="block";
}

// بستن پنل
function closePanel(){
    document.getElementById("panel").style.display="none";
}

// ورود
function login(){

    const pass=document.getElementById("pass").value;

    if(pass==="4030"){

        document.getElementById("adminArea").style.display="block";
        document.getElementById("pass").style.display="none";

    }else{

        alert("رمز اشتباه است");

    }

}

// افزودن محصول
function addItem(){

    const name=document.getElementById("name").value.trim();
    const price=document.getElementById("price").value.trim();
    const category=document.getElementById("category").value;
    const file=document.getElementById("img").files[0];

    if(!name || !price || !file){

        alert("همه فیلدها را کامل کنید");
        return;

    }

    const reader=new FileReader();

    reader.onload=function(){

        menu.push({

            name:name,
            price:price,
            category:category,
            img:reader.result

        });

        localStorage.setItem("menu",JSON.stringify(menu));

        document.getElementById("name").value="";
        document.getElementById("price").value="";
        document.getElementById("category").selectedIndex=0;
        document.getElementById("img").value="";

        render();

    }

    reader.readAsDataURL(file);

}

// حذف محصول
function removeItem(index){

    if(confirm("حذف شود؟")){

        menu.splice(index,1);

        localStorage.setItem("menu",JSON.stringify(menu));

        render();

    }

}

// فیلتر دسته‌بندی
function filterMenu(category){

    const cards=document.querySelectorAll(".card");

    cards.forEach(card=>{

        if(category==="همه" || card.dataset.category===category){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

}

// اجرای اولیه
render();
