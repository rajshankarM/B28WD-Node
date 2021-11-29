const fs = require("fs");

fs.readFile("./welcome.txt", "utf-8", (err, data)=>{
    console.log(data);
})

const quote = "hellow 😊"
const niceQuote = "\nMake Everyday a little less ordinarily 😊 !!!"


// fs.appendFile("./awesome.txt", niceQuote , (err) =>{
//     console.log("completed writing");
// });

// fs.unlink("./awesome.txt", err =>{
//     console.log("Deleting Sucessfully !!!")
// })


// fs.writeFile("./awesome.txt", quote , (err) =>{
//     console.log("completed writing");
// });




// const quote2 = "live more, worry less 😊!!!"


// function creatQuotes(noOfFiles ,quote){
//     for (let i = 0; i < noOfFiles; i++) {
//         fs.writeFile(`./backup/text-${i}.txt`, quote , (err) =>{
//             console.log("completed writing", i);
//         }); 
//     }
// }

// const[, , noOfFiles] = process.argv;

// creatQuotes(noOfFiles , quote2)

fs.readdir("./backup" , (arr, files)=>{
    console.log(files)
})