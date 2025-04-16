const { SummaryApi } = require("../common")

const fetchSaleTypeWiseProduct = async(saleType)=>{
    const response = await fetch(SummaryApi.SaleType.url,{
        method : SummaryApi.SaleType.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            saleType : saleType
        })
    })

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchSaleTypeWiseProduct