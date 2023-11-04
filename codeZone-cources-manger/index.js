
// console.log("Hello from Code Zone courses using Commander");

const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
const path='./courses.Json';

program
  .name('codeZone-cources-manger')
  .description('CLI to make courses')
  .version('0.8.0');

program.command('add')
    .alias('a')
    .description('add course')
    .argument('<course>','add cource')
    .argument('<price>','add price')
    .action((...arg)=>{
        const content = {course:arg[0],price:arg[1]}
        if(fs.existsSync(path)){
            fs.readFile(path,'utf-8',(err,data)=>{
                if(err){
                    console.log(Error('error'));
                }else{
                    // console.log(data);
                    const jsData=JSON.parse(data);
                    jsData.push(content);
                    fs.writeFile(path,JSON.stringify(jsData),()=>{
                        console.log('courses was added');
                    });
                }
            })
        }else{
            fs.writeFile(path,JSON.stringify([content]),()=>{
                console.log('courses was added');
            });
        }
    })

program.command('list')
    .alias('l')
    .description('List all courses')
    .action(()=>{
        fs.readFile(path,'utf-8',(err,data)=>{
            if(err){
                console.log(Error('error'));
            }else{
                const tableContent=JSON.parse(data);
                console.table(tableContent);
            }
        })
    })

program.command('delete')
    .alias('d')
    .description('delete course')
    .argument('<course>','delete course')
    .action((arg)=>{
        fs.readFile(path,'utf-8',(err,data)=>{
            if(err){
                console.log(Error('error'));
            }else{
                const tableContent=JSON.parse(data);
                for(let i=0;i<tableContent.length;i++){
                    if(arg==tableContent[i].course){
                        // console.log(tableContent[i].course);
                        // console.log(i);
                        tableContent.splice(i, 1);
                        fs.writeFile(path,JSON.stringify(tableContent),()=>{
                            console.log('courses was deleted');
                        });
                        break;
                    }
                }
            }
        })
    })




program.parse()