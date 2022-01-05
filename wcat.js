#!/usr/bin/env node 
let fs = require("fs");
// input
let inputArray = process.argv.slice(2);

lengthOfcmnds = 0;
for(let i = 0 ; i < inputArray.length ; i++){
    if(inputArray[i].charAt(0) != '-') {lengthOfcmnds = i;  break;}
}

/// calls to respective functions
let commands = inputArray.slice(0,lengthOfcmnds);
let filesArray = inputArray.slice(lengthOfcmnds);

//validity of files 

for(let i = 0 ; i < filesArray.length ; i++){
    if(fs.existsSync(filesArray[i]) == false){
        console.log(`Please 😊 enter correct file -> ${filesArray[i]} not found`);
        return;
    }
}

if(commands.includes('-s')) removeBlankLines(filesArray);
if(commands.includes('-b') && commands.includes('-n')){
    if(commands.indexOf('-b')<commands.indexOf('-n')) addLineNumberToEveryNonEmptyLine(filesArray);
    else addLineNumberToEveryLine(filesArray);
}
else{
    if(commands.includes('-b')) addLineNumberToEveryNonEmptyLine(filesArray);
    if(commands.includes('-n')) addLineNumberToEveryLine(filesArray);  
} 

readFiles(filesArray)

function removeBlankLines(filesArray) {
    console.log('in  ssssssssssssssssssssssssssss');
    for (let i = 0; i < filesArray.length; i++) {
        
        let filepath = filesArray[i];
        let content = fs.readFileSync(filepath) + "";
        let contentArray = content.split("\n");
   
     
        for (let j = 1; j < contentArray.length; j++) {
            if (contentArray[j] == '' && contentArray[j - 1] == '') {
                contentArray[j] = null;
            }
        }
        let text = '';
        for (let j = 0; j < contentArray.length; j++) {
            if (contentArray[j] == null) {
                continue;
            }
            text += contentArray[j] + "\n" ;
        }
    
        fs.writeFileSync(filepath,text);
    }

}

function readFiles(inputArray) {

    for (let i = 0; i < inputArray.length; i++) {
        let filepath = inputArray[i];
        console.log(fs.readFileSync(filepath) + "");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    }

}

function addLineNumberToEveryLine(filesArray) {
    for (let i = 0; i < filesArray.length; i++) {
        let filepath = filesArray[i];
        let content = fs.readFileSync(filepath) + "";
        let contentArray = content.split("\n");
        // console.log(contentArray);
        

        for(let j = 0 ; j < contentArray.length ; j++){
        contentArray[j] = `${j+1}. ${contentArray[j]}`
        }



        fs.writeFileSync(filepath,contentArray.join('\n'));
        

    }
}

function addLineNumberToEveryNonEmptyLine(filesArray){
    for (let i = 0; i < filesArray.length; i++) {
        let filepath = filesArray[i];
        let content = fs.readFileSync(filepath) + "";
        let contentArray = content.split("\n");
        // console.log(contentArray);
        

        for(let j = 0 ; j < contentArray.length ; j++){
        if(contentArray[j] != '\r'){
            contentArray[j] = `${j+1}. ${contentArray[j]}`
        }
        }

        fs.writeFileSync(filepath,contentArray.join('\n'));
        


    }
}
