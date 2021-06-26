import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
   list:any=[];
ischecked:boolean=true;

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.taskService.getList().subscribe(
      (todoList:any) =>{       
        this.list=todoList.list
 console.log(this.list);
 
       }
       )
       
 }
 add(data:string){ 
   if(data==''){
     alert("You must write something!")
   }else{
    this.taskService.addItem(data)
    .subscribe(
      (response:any) =>{         
        console.log(response)
        this.ngOnInit();
     
      }
    )
   }

  }

  delete(data:any){
    this.taskService.deleteItem(data._id)
      .subscribe(
        (response:any) =>{         
          console.log(response)
        this.ngOnInit();
        }
      )
    }
    update(data:any){
        if(data.status==='completed'){
          this.ischecked=false  
        }
        this.taskService.updateItem(data._id,this.ischecked)
        .subscribe(
          (response:any) =>{         
            console.log(response)
            this.ischecked=true
           this.ngOnInit();
          }
        )
  
      }
  }
