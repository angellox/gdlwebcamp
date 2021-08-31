document.addEventListener('DOMContentLoaded', function () {
    runApps();
});

function runApps() {
    // Cargar mapa
    loadMap(); 
    
    // Global Variables
    const calcular = document.getElementById('calcular');
    const pase_dia = document.getElementById('pase_dia');
    const pase_dosdias = document.getElementById('pase_dosdias');
    const pase_completo = document.getElementById('pase_completo');
    // Function for effect typing
    eventListener(calcular, 'click', calcularMontos);
    eventListener(pase_dia, 'blur', mostrarDias);
    eventListener(pase_dosdias, 'blur', mostrarDias);
    eventListener(pase_completo, 'blur', mostrarDias);
}

// FUNCTIONS HERE //
function loadMap(){

    const mapa = document.getElementById('map');

    if (mapa){
        var map = L.map('map').setView([19.39676, -99.156611], 18);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    
        L.marker([19.39676, -99.156611]).addTo(map)
            .bindPopup('GDLWEBCAP 2018 <br> ¡Boletos ya disponibles!')
            .openPopup();
    }

}

function eventListener(evento, tipo, funcion){

    if(evento){
        evento.addEventListener(tipo, funcion);
    }
}

function calcularMontos(event) {

    event.preventDefault();

    // Datos usuarios
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const email = document.getElementById('email');
    const errorDiv = document.getElementById('error');
    const botonRegistro = document.getElementById('btnRegistro');

    // Extras
    const camisas = document.getElementById('camisa_evento')
    const etiquetas = document.getElementById('etiquetas');
    const regalo = document.getElementById('regalo');

    let lista_productos = document.querySelector('.lista-productos');
    const suma = document.getElementById('suma-total');

    if (regalo.value === '') {
        alert('Debes elegir un regalo');
        regalo.focus();
    } else {

        const boletosDia = parseInt(pase_dia.value, 10) || 0;
        const boletos2Dias = parseInt(pase_dosdias.value, 10) || 0;
        const boletoCompleto = parseInt(pase_completo.value, 10) || 0;
        const cantCamisas = parseInt(camisas.value, 10) || 0;
        const cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

        const totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + (0.93) * (cantCamisas * 10) + (cantEtiquetas * 2);

        const listadoProductos = [];

        if (boletosDia >= 1) {
            listadoProductos.push(boletosDia + ' Pase(s) por día');
        }
        if (boletos2Dias >= 1) {
            listadoProductos.push(boletos2Dias + ' Pase(s) por 2 días');
        }
        if (boletoCompleto >= 1) {
            listadoProductos.push(boletoCompleto + ' Pase(s) completo(s)');
        }
        if (cantCamisas >= 1) {
            listadoProductos.push(cantCamisas + ' Camisas');
        }
        if (cantEtiquetas >= 1) {
            listadoProductos.push(cantEtiquetas + ' Etiquetas');
        }

        // Imprimir resultados en HTML
        lista_productos.style.display = "block";
        lista_productos.innerHTML = "";
        for (let i = 0; i < listadoProductos.length; i++) {
            lista_productos.innerHTML += listadoProductos[i] + '<br/>';
        }

        suma.innerHTML = '$ ' + totalPagar.toFixed(2);

    }
}

function mostrarDias() {

    const boletosDia = parseInt(pase_dia.value, 10) || 0;
    const boletos2Dias = parseInt(pase_dosdias.value, 10) || 0;
    const boletoCompleto = parseInt(pase_completo.value, 10) || 0;

    const diasElegidos = [];

    if (boletosDia > 0) {
        diasElegidos.push('viernes');
    }
    if (boletos2Dias > 0) {
        diasElegidos.push('viernes', 'sabado');
    }
    if (boletoCompleto > 0) {
        diasElegidos.push('viernes', 'sabado', 'domingo');
    }
    for (let i = 0; i < diasElegidos.length; i++) {
        document.getElementById(diasElegidos[i]).style.display = "block";
    }
}

$(function() {

    // Lettering
    $('.namesite').lettering();

    // Menú fixed
    const windowHeight = $(window).height();
    const barraHeight = $('.navbar').innerHeight();
    console.log('Pixeles de la ventana: ', windowHeight);

    $(window).scroll(function(){
        const scroll = $(window).scrollTop();
        console.log('Pixeles Scroll: ',scroll)
        if(scroll > windowHeight){
            $('.navbar').addClass('fixed');
            $('body').css({'margin-top': barraHeight + 'px'});
        } else {
            $('.navbar').removeClass('fixed');
            $('body').css({'margin-top': '0px'});
        }
    });

    // Menu Responsive
    $('.menu-mobile').on('click', function(){
        $('.nav-main').slideToggle();
    });

    // Programa de conferencias
    $('.program-event .info-course:first').show();
    $('.menu-program a:first').addClass('activo');

    $('.menu-program a').on('click', function(){
        $('.menu-program a').removeClass('activo');
        $(this).addClass('activo');
        $('.ocultar').hide();
        const enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);

        return false;
    });

    // Animación para los números
    $('.summarize-event li:nth-child(1) p').animateNumber({number: 6}, 1200);
    $('.summarize-event li:nth-child(2) p').animateNumber({number: 15}, 1200);
    $('.summarize-event li:nth-child(3) p').animateNumber({number: 3}, 1500);
    $('.summarize-event li:nth-child(4) p').animateNumber({number: 9}, 1500);

    // Animación de cuenta regresiva
    $('.cuenta-regresiva').countdown('2021/12/10 09:00:00', function(event){
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));
    });

});
