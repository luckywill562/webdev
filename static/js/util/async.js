export default async(url,data,result)=>{
       await fetch(url,{
            method: "POST",
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: data
        }).then(res=>res.json())
        .then(result).catch();
}


