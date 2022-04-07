var common:object = {
    test : function(){
        alert('test');
    }
    ,qs : function(ele:HTMLElement,query:string){ //querySelector
        if(ele == null){
            return document.querySelector(query);
        }else{
            return ele.querySelector(query);
        }
    }
   ,qsa : function(ele:HTMLElement, query,string){
       if(ele == null){
           return document.querySelectorAll(query);
       }else{
           return ele.querySelectorAll(query);
       }
   }
   


};

