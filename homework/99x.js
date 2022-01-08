import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = `
  <html>
    <style>
      table{width:500px;
        border :1px solid #dddddd     
    }  
      th{text-align:left;
        padding : 8px;
    background-color: aquamarine;
    }
      td {
        border: 1px solid #dddddd;
        padding : 8px;
        background-color: green;
        
    }
    </style>
<body>
${table99()};
  `
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });



function table99(){
    let table=["<table><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>"]
    for(let i=1;i<=9;i++){
        let row=`<tr><th>${i}</th>`
        for(let j=1;j<=9;j++){
            row+=`<td>${i*j}</td>`
        }    
        row+="</tr>"   
        table.push (row)
    }
    return table.join('\n')+"<table>"
}