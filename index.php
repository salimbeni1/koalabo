<?php  
 $message = '';  
 $error = '';  

if(isset($_POST["addLink"])){
    echo "looool";
}

 if(isset($_POST["submit"]))  
 {  
      if(empty($_POST["titre"]))  
      {  
           $error = "<label class='text-danger'>Enter titre</label>";  
      }  
      else if(empty($_POST["background"]))  
      {  
           $error = "<label class='text-danger'>Enter background</label>";  
      } 
      else  
      {  
           if(file_exists('results.json'))  
           {  
                $current_data = file_get_contents('results.json');  
                $array_data = json_decode($current_data, true);  
                $sub_array = array('link' => 'www.google.com', 'titre' => 'google');
                $sub_array_data[0] = $sub_array;
                $sub_array_data[1] = $sub_array;
               
               
               
                $extra = array(  
                     'titre'               =>     $_POST['titre'],  
                     'background'          =>     $_POST["background"],
                    'links' => $sub_array_data
                );  
                $array_data[] = $extra;  
                $final_data = json_encode($array_data);  
                if(file_put_contents('results.json', $final_data))  
                {  
                     $message = "<label class='text-success'>File Appended Success fully</p>";  
                }  
           }  
           else  
           {  
                $error = 'JSON File not exits';  
           }  
      }  
 }  
 ?>  
 <!DOCTYPE html>  
 <html>  
      <head>  
           <title>Webslesson Tutorial | Append Data to JSON File using PHP</title>  
           <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>  
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />  
           <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script> 
          
          
          
      </head>  
      <body>  
           <br />  
           <div class="container" style="width:500px;">  
                <h3 align="">Append Data to JSON File</h3><br />                 
                <form method="post">  
                     <?php   
                     if(isset($error))  
                     {  
                          echo $error;  
                     }  
                     ?>  
                     <br />  
                     <label>Titre</label>  
                     <input type="text" name="titre" class="form-control" /><br />  
                     <label>Image de fond</label>  
                     <input type="text" name="background" class="form-control" /><br />  
                    
                    <script>
                    
                    function addFormForLink(){
                      
                        document.getElementById("links").innerHTML = "muahahha<br>"
                        
                    };
                    
                    </script>
                    
                    
                    <div id="links"></div>
                    <input onclick="addFormForLink();" id="btn" type="button" name="addLink" value="new Link" class="btn btn-info" /><br/>   
                     
                     <input type="submit" name="submit" value="Append" class="btn btn-info" /><br />                      
                     <?php  
                     if(isset($message))  
                     {  
                          echo $message;  
                     }  
                     ?>  
                </form>  
           </div>  
           <br />  
      </body>  
 </html> 
