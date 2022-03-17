$(function(){

     //click menu
    $('.mobile').click(function(){
        $('.mobile').find('ul').slideToggle();
    })

    //sistema de pesquisa de preço
    
    var currentValue = 0;
    var isDrag = false;
    var preco_maximo = 70000;
    var preco_atual = 0;

    $('.pointer-barra').mousedown(function(){
        isDrag = true;
    })

    $(document).mouseup(function(){
        isDrag = false;
        enableTextSelection();
    })

    $('.barra-preco').mousemove(function(e){
        if(isDrag){
            disableTextSelection();
            var elBase = $(this); 
            var mouseX = e.pageX - elBase.offset().left; //pegar a localização do mouse
            if(mouseX < 0) mouseX = 0;
            if(mouseX > elBase.width())  mouseX = elBase.width();

            $('.pointer-barra').css('left',(mouseX-20)+'px');
            currentValue =(mouseX / elBase.width()) * 100;
            $('.barra-preco-fill').css('width',currentValue+'%');
            

            preco_atual = (currentValue/100) * preco_maximo;
            preco_atual = formatarPreco(preco_atual);
            $('.preco_pesquisa').html('R$'+preco_atual);


        }   
    })

    function formatarPreco(preco_atual){
        preco_atual = preco_atual.toFixed(2);
        preco_arr = preco_atual.split('.');

        var novo_preco = formatarTotal(preco_arr);
        return novo_preco;
    }

    function formatarTotal(preco_arr){
      
            if(preco_arr[0] < 1000){
                return preco_arr[0]+','+preco_arr[1];
            }else if(preco_arr[0] < 10000){
                return preco_arr[0][0]+','+preco_arr[0].substr(1,preco_arr[0].length)+','+preco_arr[1];
            }else{
                return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+','+preco_arr[1];
            }
        
    }

    function disableTextSelection(){
        $('body').css("-webkit-user-select", "none");
        $('body').css("-moz-user-select", "none");
        $('body').css("-ms-user-select", "none");
        $('body').css("-o-user-select", "none");
        $('body').css("user-select", "none");
    }

    function enableTextSelection(){
        $('body').css("-webkit-user-select", "auto");
        $('body').css("-moz-user-select", "auto");
        $('body').css("-ms-user-select", "auto");
        $('body').css("-o-user-select", "auto");
        $('body').css("user-select", "auto");
    }


    //Sistema de Slider de cda veículos

    var imgShow = 3;
    var maxIndex = Math.ceil($('.min-img-wrapper').length/3) - 1; //maximo da valor
    var curIndex = 0; //posição atual

    initSlider();
    navigaterSlider();
    clickSlider();
    function initSlider(){
        var amt = $('.min-img-wrapper').length * 33.3;
        var elScroll = $('.nav-galeria-wrapper');
        var elSingle = $('.min-img-wrapper');
        elScroll.css('width',amt+'%');
        elSingle.css('width',33.3*(100/amt)+'%');

    }

    function navigaterSlider(){

        $('.arrow-right-nav').click(function(){
            if(curIndex < maxIndex){
                curIndex++;
                var elOff = $('.min-img-wrapper').eq(curIndex*3).offset().left - $('.nav-galeria-wrapper').offset().left;
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            }else{
                
            }
        })

        $('.arrow-left-nav').click(function(){
            if(curIndex > 0){
                curIndex--;
                var elOff = $('.min-img-wrapper').eq(curIndex*3).offset().left - $('.nav-galeria-wrapper').offset().left;
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            }else{
                
            }
        })
    }

    function clickSlider(){
        $('.min-img-wrapper').click(function(){
            $('.min-img-wrapper').css('background-color','transparent');
            $(this).css('background-color','rgb(210,210,210)')
            var img = $(this).children().css('background-image');
            $('.foto-destaque').css('background-image',img);

        })
    }


    //clicar  para section de contato com base no atributo goto

    $('nav a').click(function(){
        var href = $(this).attr('href');
        var offSetTop = $(href).offset().top;

        $('nav a').css('color','black');
        $(this).css('color','#EB2D2D');

        $('html, body').animate({'scrollTop': offSetTop});
        return false;
    })


    //Sistema de nagevação de depoimentos

    var amtDepoimento = $('.depoimentos-single p').length;
    var curIndex = 0;
    iniciarDepoimentos();
    navegarDepoimento();
    
    function iniciarDepoimentos(){
        $('.depoimentos-single p').hide();
        $('.depoimentos-single p').eq(0).show();
    }

    function navegarDepoimento(){
        $('[next]').click(function(){
            curIndex++;
            if(curIndex >= amtDepoimento)
                curIndex = 0;
            $('.depoimentos-single p').hide();
            $('.depoimentos-single p').eq(curIndex).show();
            
        })

        $('[prev]').click(function(){
            curIndex--;
            if(curIndex < 0)
                curIndex = amtDepoimento -1;
            $('.depoimentos-single p').hide();
            $('.depoimentos-single p').eq(curIndex).show();
        })
    }

    
})