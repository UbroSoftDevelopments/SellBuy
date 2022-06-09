const inputs = config.application.purchase.inputs;
Date.prototype.toDateInputValue = (function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
});
let RowCounter = 1;
let sellProduct = {
  productName:"",
  purchasePrice:"",
  qty:"",
  sellingPrice:"",
  sellingDate:"",
  total_Amount:""
}




const addPurchaseRow = () => {

  var forms = document.getElementById('purchaseInput');
  var prow = document.createElement('div');
  prow.className = 'grid-container';

  //need to be change in submit btn
  prow.innerHTML = `
    <label>${RowCounter}</label>
    <input type="text" required  placeholder="Name" name="pname" id="pname${RowCounter}" >
    <input type="number" required   placeholder="Purchase Price" name="pprice" id="pprice${RowCounter}">
    <input type="number" required  placeholder="Quantity" name="qty" >
    <input type="number" placeholder="Selling Price " name="sprice" id="sprice${RowCounter}">
  `;


  /*   var row1 = document.createElement('fieldset');
     var box = document.createElement('div');
     box.className = "grid-container";
 
     inputs.map((val,ind)=>{
       
        var lbl =  document.createElement('label');
     
         var input_box = document.createElement('input');
         lbl.innerHTML = val.label;
         input_box.type = val.type;
         input_box.placeholder = val.placeholder;
         input_box.name = val.name;
         input_box.id = val.id+RowCounter;
       
         lbl.appendChild(input_box);
         box.appendChild(lbl);
 
     })
     
 
     row1.append(box); */

  forms.appendChild(prow);

  autocomplete($("#pname" + RowCounter),$("#pprice" + RowCounter),$("#sprice" + RowCounter));
  RowCounter++;
}
const removePurchaseRow = () => {
  if ($('#purchaseInput').children().length > 2) {
    $('#purchaseInput').children().last().remove();
    RowCounter--;
    return;
  }
  $('#msform').trigger('reset');
  $('#pDate').val(new Date().toDateInputValue());

}
// Get the modal
var sellModal = $("#SellModal");
var purchaseModal = $("#PurchaseModal");

function closeSellModel() {
  sellModal.hide();
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == sellModal) {
    sellModal.hide();
  }
  if (event.target == purchaseModal) {
    sellModal.hide();
  }
}



//



function handleProductFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  // for multi-selects, we need special handling


  formJSON.pname = data.getAll('pname')
  formJSON.pprice = data.getAll('pprice')
  formJSON.qty = data.getAll('qty')
  formJSON.sprice = data.getAll('sprice')


  $('#puchaseDate').text('Date: ' + formJSON.pDate)
  PurchaseData = [];

  for (let index = 0; index < RowCounter - 1; index++) {

    PurchaseData.push({
      purchaseDate:formJSON.pDate,
      productName: formJSON.pname[index],
      purchasePrice: parseFloat(formJSON.pprice[index]),
      qty: parseFloat(formJSON.qty[index]),
      sellingPrice: parseFloat(formJSON.sprice[index])

    });
  }



  console.log(JSON.stringify( PurchaseData))  ;
  constructPurchseTable('#purchaseTable', PurchaseData);
  purchaseModal.show();


}

const purchaseCfm = () =>{
  console.log("PurchaseData",PurchaseData)
  $('#PurchaseModal').hide()
  insertProducts();
  $('#msform').trigger('reset');
  $('#pDate').val(new Date().toDateInputValue());
}


const purchaseForm = $('#msform');

purchaseForm.bind("submit", handleProductFormSubmit);



// Autocomplete

function autocomplete(inp,pinp,sinp) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.bind("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < productsList.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (productsList[i].productName.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + productsList[i].productName.substr(0, val.length) + "</strong>";
        b.innerHTML += productsList[i].productName.substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + productsList[i].productName + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/

        b.onmousedown = function () {
          /*insert the value for the autocomplete text field:*/
          inp.val(this.getElementsByTagName("input")[0].value);
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
          updatePurchaseSelling(inp,pinp,sinp);
        }
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.bind("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].onmousedown();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.onclick = function (e) {
    closeAllLists(e.target);
  };

}


const updatePurchaseSelling = async (inp,pinp,sinp) =>{
 let temPname = inp.val();
 console.log(temPname,pinp,sinp)
 productsList.map((val,ind)=>{
      if (val.productName == temPname) {
          pinp.val(val.purchasePrice);
          sinp.val(val.sellingPrice);
        return;
      }
 });

  
}
/*An array containing all the country names in the world:*/

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
// autocomplete($("#productName"), countries);




/*  Create One ROW by defalut */
addPurchaseRow();


$(document).ready(function () {
  $('#pDate').val(new Date().toDateInputValue());

  getProducts();
  getTransaction();


  $('#SellTable tbody').on('click', 'button', function () {
    var sellrow = $(this).parents('tr').children();
    var indata = sellrow.find('input');
   
    if(0 >indata[0].value || indata[0].max < indata[0].value ){
      alert('Please Enter Valid Qty!')
      return;
    }
    sellProduct.productName = sellrow[0].innerHTML;
    sellProduct.purchasePrice = sellrow[1].innerHTML
    sellProduct.qty =  indata[0].value;
    sellProduct.sellingPrice = indata[1].value;
    sellProduct.sellingDate =new Date().toDateInputValue();
    sellProduct.total_Amount = indata[0].value*indata[1].value;

    openSellModel();
   console.log(sellProduct);
  });
});

const openSellModel = () => {
    $('#sellModelname').text(sellProduct.productName);
    $('#sellModelqty').text(sellProduct.qty);
    $('#sellModelsprice').text(sellProduct.sellingPrice);
    $('#sellModeltprice').text(sellProduct.total_Amount);
  sellModal.show();
}

const sellConfirm = () =>{
  
  sellProducts(sellProduct);
  sellModal.hide();
}


