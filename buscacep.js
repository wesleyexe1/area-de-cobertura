//variavel Global 
var municipio,bairro,logradouro,plano;

var verificaSePlanoFoiSelecionado = false;

 $(window).load(function(){
    $('#exampleModal').modal('show');
 });



function mostradiv(div){

  if(div == 'Suporte' || div == 'Boleto'){
      document.getElementById('titular').style.display = 'block';

  }

  else{
      document.getElementById('titular').style.display = 'none';
  
    }

 }

function guardaPlano(gPlano){

  plano = ($(gPlano).attr("value"));
  //document.getElementById('nome1').value = plano;
  verificaSePlanoFoiSelecionado = true; 
  document.getElementById('btn3').style.backgroundColor = 'green';

}

$("#btn1").on("click", function(){
   
  var cep = $("#cep").val(); //Pega o valor do ID="cep" digitado pelo usuario e armazeno na variavel cep 
  //Removendo "-" do cep.
   var cep = cep.replace(/\D/g,'');
   var validaCep = /^[0-9]{8}$/;
 
   let areaCobertura = [ {nome: 'Vale', cMin:33830000, cMax:33830390},
                         {nome: 'Veneza', cMin:33820010, cMax:33820970},
                         {nome: 'Conjunto', cMin:33823000, cMax:33823730},
                         {nome: 'Florença', cMin:33825000, cMax:33825615},
                         {nome:'Metropolitano', cMin:33826001, cMax:33826194},
                         {nome: 'Esmeraldas',cMin:35740000,cMax:35740001},
                         {nome: 'Ouro', cMin:33833000,cMax:33833-240},
                         {nome: 'Belvedere', cMin:33821-409, cMax:33821-492}
]

     //verifica se o campo input não tem nenhum valor informado ou se cotem 8 ou 9 digitos
   if(cep != "" && validaCep.test(cep)){
     $('#uf').val('...');
     $('#cidade').val('...');
     $('#a-frente1').val('...');
     $('#bairro').val('...');

       // função que verifica se faixa de cep informado pelo usuario está dentro do array
       var cidade = areaCobertura.find((cd) => cep >= cd.cMin && cep <= cd.cMax)
       if(cidade){
        
        var url ="https://viacep.com.br/ws/"+cep+"/json/";
        $.ajax({
          url: url,
          type:"get",
          dataType:"json",

         
          success:function(dados){
  
            if(!("erro" in dados)){
            $('#uf').val(dados.uf);
            $('#cidade').val(dados.localidade);
            $('#a-frente1').val(dados.logradouro);
            $('#bairro').val(dados.bairro);

            $('#uf1').val(dados.uf);
            $('#cidade1').val(dados.localidade);
            $('#a-frente3').val(dados.logradouro);
            $('#bairro1').val(dados.bairro);

            municipio = dados.localidade;
            bairro = dados.bairro;
            logradouro = dados.logradouro;

            $("#btn3").on("click", function(){
              if(verificaSePlanoFoiSelecionado === true){
           
                document.getElementById('btn3').href = "https://api.whatsapp.com/send?phone=5531993131083&text=CEP: "+cep+",CIDADE: "+municipio+",BAIRRO: "+bairro+",RUA: "+logradouro+",PLANO: "+plano;
               
                  
              }else{
                alert("SELECIONE PELO MENOS UM PLANO");
                document.getElementById('btn3').style.backgroundColor = "red";
              }
            
            });

            document.getElementById('assine').style.display = 'block';
            document.getElementById("img2").style.backgroundImage = 'url(images/self_2.jpg)';

            if(cep == 35740000){
               $('#bairro').val('Esmeraldas não contém CEP por RUA');
               document.getElementById("img2").style.backgroundImage = 'url(images/self_4.jpg)';
              
            }
             else{
               return;
             }
            }
          }

        })
      }
      else{
        document.getElementById("img2").style.backgroundImage = 'url(images/self_3.jpg)';
        document.getElementById('assine').style.display = 'none';
         }
     }
   // fim if   if(cep != "" && validaCep.test(cep)){
     // e inicio do else por favor digite o valido
   else{
       var mgs = "POR FAVOR DIGITE CEP VALIDO";
       document.getElementById("infoErro").innerHTML=mgs;
       document.getElementById("infoErro").style.color ='red';
       
 
       $(document).ready(function () {
         setTimeout(function () {
             $('#infoErro').fadeOut(1500);
         }, 700);
 
                   });
       
 
       }
   }); 