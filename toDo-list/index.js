const fs = require('fs');
const {Command} = require('commander');
const program =new Command();
let increament=1;
let path='./todo.json';

program
  .name('toDo app')
  .description('CLI to make toDo list')
  .version('0.8.0');

program.command('add')
    .description('add task title')
    .requiredOption('--title,-t <title>','add title')
    .action((op)=>{
        let content={'id':increament,'title':op.T};
        // console.log(content);
        if(fs.existsSync(path)){
            fs.readFile(path,'utf-8',(err,data)=>{
                if(err){
                    console.log(Error('there is no such file called this'));
                }else{
                    let jsData=JSON.parse(data);
                    // console.log(jsData.length);
                    content={'id':jsData.length+1,'title':op.T};
                    jsData.push(content);
                    fs.writeFile(path,JSON.stringify(jsData),'utf-8',(err)=>{
                        if(err){
                            console.log(Error('there is no such file called this'));
                        }else{
                            console.log('task was add');
                        }
                    })
                }
            })
        }else{
            fs.writeFile(path,JSON.stringify([content]),'utf-8',(err)=>{
                if(err){
                    console.log(Error('there is no such file called this'));
                }else{
                    console.log('task was add');
                }
            })
        }
    })

program.command('list')
    .description('list all to-do tasks')
    .action(()=>{
        fs.readFile(path,'utf-8',(err,tasks)=>{
            if(err){
                console.log(Error('there is no such file called this'));
            }else{
                let tasksList=JSON.parse(tasks);
                console.table(tasksList);
            }
        })
    })

program.command('edit')
    .description('edit title using id of task')
    .requiredOption('-t|--title <title>','edit title')
    .requiredOption('-i|--id <id>','edit id')
    .action((...op)=>{
        fs.readFile(path,'utf-8',(err,tasks)=>{
            if(err){
                console.log(Error('there is no such file called this'));
            }else{
                let tasksList=JSON.parse(tasks);
                // console.log(op[0].id);
                for(let i=0;i<tasksList.length;i++){
                    if(tasksList[i].id==op[0].id){
                        // tasksList.splice(i, 1);
                        let content={"id":+op[0].id,"title":op[0].title};
                        tasksList.splice(i,1,content);
                        // console.table(tasksList)
                        fs.readFile(path,'utf-8',(err,data)=>{
                            if(err){
                                console.log(Error('there is no such file called this'));
                            }else{
                                // console.log(tasksList);
                                fs.writeFile(path,JSON.stringify(tasksList),'utf-8',(err)=>{
                                    if(err){
                                        console.log(Error('there is no such file called this'));
                                    }else{
                                        console.log('task was edited');
                                    }
                                })
                            }
                        })
                        break;
                    }
                }
            }
        })
    })

program.command('delete')
    .description('delete task from to-do list')
    .argument('<id>')
    .action((arg)=>{
        fs.readFile(path,'utf-8',(err,task)=>{
            if(err){
                console.log(Error('there is no such file called this'));
            }else{
                let tasksList=JSON.parse(task);
                for(let i=0;i<tasksList.length;i++){
                    if(tasksList[i].id==arg){
                        tasksList.splice(i,1);
                        // console.log(tasksList);
                        fs.writeFile(path,JSON.stringify(tasksList),'utf-8',(err)=>{
                            if(err){
                                console.log(Error('there is no such file called this'));
                            }else{
                                console.log('task was deleted');
                            }
                        })
                    }
                }
            }
        })
    })


program.parse();