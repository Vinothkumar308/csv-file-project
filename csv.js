class CsvExtract{
    constructor(table,heading=true){
        this.table=table
        this.rows = Array.from(table.querySelectorAll("tr"))
        
        if(!heading && this.rows[0].querySelectorAll("th")){
            this.rows.shift()
        }
       
    }

    exportcsv(){
        const datas = []
        const column = this._longest()
        for(const row of this.rows){
            let lines = ""
            for(let i=0;i<column;i++){
                if(row.children[i] !== undefined){
                    lines = lines + CsvExtract.safedata(row.children[i])
                }
                lines+=i!==column-1?",":""
            }
            datas.push(lines)
        }
        return datas.join("\n")
    }

    _longest(){
        return this.rows.reduce((length,row)=>(
            row.childElementCount>length?row.childElementCount:length
    
        ),0)
    } 
    static safedata(td){
        let data = td.textContent
        data=data.replace(/"/g,`""`)
        data=/[",/n"]/.test(data)?`"${data}"`:data

        return data

    }
    
}

const tablerow = document.querySelectorAll("tr")
const tableEle = document.querySelector("table")
const button = document.querySelector("#btn")



button.addEventListener("click",()=>{
    const obj = new CsvExtract(tableEle,false)
    const csvdata = obj.exportcsv()
    const blob = new Blob([csvdata],{type:"text/csv"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download="file.csv"
    a.click()

    setTimeout(()=>{
        URL.revokeObjectURL(url)
    },500)
})
