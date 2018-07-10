/**
 * Function script para alterar os sliders
 * 
 * 
 */

function ChangeSrc(frames, i) {


    //verifica o tamanho do array de frames
    var len = frames.length;

    //verifica se o index é >= ao tamanho maximo e zera o index para iniciar novamente
    //a sequencia dos indicadores de TV
    if (i >= len) {
        i = i * 0;
    }

    //Coletando o tempo e a URL dinamicamente, realizando o replace devido o js formatar string de outra forma
    var url = frames[i].url.replace("amp;", "");
    var time = frames[i].time;

    //coletando o horario.
    var countDownDate = new Date().setMilliseconds(time);
    var isPaused = true;
    // Get todays date and time
    var now = new Date().getTime();
    var auxTime = 0;
    var distance = 0;

    $('.pause').on('click', function (e) {
        e.preventDefault();
        isPaused = false;
        $('.pause').hide();
        $('#spanPlay').show();
        

        var timediff = 40 / 1000;
        auxTime = countDownDate - now + timediff;
    });

    $('.play').on('click', function (e) {
        e.preventDefault();
        isPaused = true;
        $('#spanPlay').hide();
        $('.pause').show();
    });

    $('.previous').on('click', function (e) {
        e.preventDefault();
        $('#iframei').attr('src', ' ');
        i = i - 2;

        countDownDate = 0;
    });

    $('.next').on('click', function (e) {
        e.preventDefault();
        isPaused = true;
        $('#iframei').attr('src', ' ');
        countDownDate = 0
    });


    var x = setInterval(function () {

        if (!isPaused) {
            countDownDate = new Date().setMilliseconds(auxTime);
        }

        if (isPaused) {
            now = new Date().getTime();
            distance = countDownDate - now;

            //calculos de  hours, minutes and seconds
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            //acrescenta o 0 quando o numero for apenas de 1 casa.
            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            //altera os dados do timer hours + ":" +
            document.getElementById("demo").innerHTML =  minutes + ":" + seconds + "";

          
            // realiza a finalização do timer
            if (distance < 0) {
                clearInterval(x);

                if (i > 0) {
                    $('#spanPrevious').show();
                } else {
                    $('#spanPrevious').hide();
                }
                document.getElementById("demo").innerHTML = "Alterando ....";
                ChangeSrc(frames, i);
            }
        }
    }, 1000);

    /**
     * verifica se é uma img em formato de url
     */
    var idx = url.indexOf('.PNG');

    //realiza a ativação do iframe ou da tag image
    if (idx == -1) {
        //escondendo div img
        $('#divImg').hide();

        //exibindo iframe
        $('#iframei').show();

        //altera prop src do frame
        $('#iframei').attr('src', url);
    } else {
        //escondendo iframe
        $('#iframei').hide();

        //exibindo o img
        $('#divImg').show();

        //altera a tag igm
        $('#Idimg').attr('src', url);
    }

    //verifica se o index é maior ou igual ao length para que nunca pare de executar as trocas de links
    if (i < len) {
        i++;
    }

    

}

