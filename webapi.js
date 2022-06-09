let productsList = [];
let PurchaseData = [];
let TransactionList = [];
const BASE_URL ="http://localhost:8000/"


//Product List
const getProducts = async () => {
  await fetch(BASE_URL+"products").then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  })
    .then((responseJson) => {
      // Do something with the response
      productsList = responseJson;
      constructProductTable();
      constructSellTable();
      $('.loader_container').remove();
    })
    .catch((error) => {
      console.log(error)
      $('.loader_container').remove();
     // alert("Pls Restart the Server. HTTP-Error: " + error);  TODO
    });
//debug
}
const getTransaction = async () => {
  await fetch(BASE_URL+"transaction")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  })
    .then((responseJson) => {
      // Do something with the response
      
      TransactionList = responseJson;
    constructTransactionTable();
    })
    .catch((error) => {
      $('.loader_container').remove();
      console.log(error)
     // alert("Pls Restart the Server. HTTP-Error: " + error);  TODO
    });;
    
}

const insertProducts  = async () =>{
    PurchaseData.map((val,ind)=>{
        productsList.push(val);
  //add in transaction
  insertTransaction('buy',val.productName,val.purchasePrice,val.purchaseDate,val.qty);
    })
  
    console.log("productsList",productsList)
    updateAllList();
}


const sellProducts = async (sellProduct) =>{
  productsList.map((val,ind)=>{
    if(val.productName == sellProduct.productName && val.purchasePrice == sellProduct.purchasePrice){

        val.qty = val.qty - sellProduct.qty;
        //add in transaction
        insertTransaction("sell",sellProduct.productName,sellProduct.sellingPrice,sellProduct.sellingDate,sellProduct.qty)
        updateAllList();
        return;
    }
  });
}

const insertTransaction = async (type,name,price,date,qty) => {
    TransactionList.push( {
      "productName":name,
      "price": price,
      "date": date,
      "qty": qty,
      "type": type
  });
}

const updateAllList =async () =>{
  constructProductTable();
    constructSellTable();
    constructTransactionTable();
}
  