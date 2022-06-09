config = {
    customer:{
        name:"",
        type:"",
        __comment:"there are 3 types Regular,UnRegistered,Composition",
        gstno:0,
        contact:{
            email:"",
            mobile:"",
            website:"",
            address:""
        },
        buzsession:"2022-2023",
        buzCategory:"",
        productCategory:"",
        __BuzcatComment:"",
        __ProductcatComment:""
        
    },
    receipt:{
        height:0,
        width:0,
        fontSize:14,
        fontFamily:"",
        footer:"",
        finalDiscount:false
    },
    application:{
        subscription:{
            id:"",
            key:"",
            accountId:"",
            dateValidUpto:"2012-04-23T18:25:43.511Z"
        },
        theme:{
            color:{
                backgroundColor:"#efefef",
                header:"#224",
                footer:"#224",
                menu:"#224"
            }
        },
        isBarcord:false,
        purchase:{
            _inputs:[
                {
                    label:"Product Name",
                    type:"text",
                    placeholder:"name",
                    name:"pname",
                    id:"productName",
                    maxLimit:10,
                    isRequeried:true
                },
                // {
                //     label:"Product Discription",
                //     type:"text",
                //     placeholder:"Discription",
                //     name:"pdesc",
                //     id:"",
                //     maxLimit:10,
                //     isRequeried:true
                // },
                {
                    label:"Purchase Price",
                    type:"number",
                    placeholder:"100",
                    name:"pprice",
                    id:"",
                    maxLimit:10,
                    isRequeried:true
                },
                {
                    label:"Qty",
                    type:"number",
                    placeholder:"1",
                    name:"qty",
                    id:"",
                    maxLimit:10,
                    isRequeried:true
                },
                {
                    label:"Selling Price",
                    type:"number",
                    placeholder:"100",
                    name:"sprice",
                    id:"",
                    maxLimit:10,
                    isRequeried:true
                }
            ]
        }
        
    }
}