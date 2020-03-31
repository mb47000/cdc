$(function () {

    function displayAlertError(response) {
        $("nav").after($('<div class="d-flex justify-content-center"><div class="alert alert-danger alert-dismissible fade show d-inline-block" role="alert" id="alert"><strong>' + response.substr(0, 6) + '</strong>' + response.substr(6) + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div>'));
        $('#alert').addClass('bounce animated twice').one('animationend', function () {
            $('#alert').removeClass('bounce animated twice');
        })
    }

    function displayAlertFatalError(errorLog) {
        $("nav").after($('<div class="d-flex justify-content-center"><div class="alert alert-danger alert-dismissible fade show d-inline-block" role="alert" id="alert"><strong>Erreur : </strong>' + errorLog + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div>'));
        $('#alert').addClass('bounce animated twice').one('animationend', function () {
            $('#alert').removeClass('bounce animated twice');
        })
    }

    function displayAlertSuccess(message) {
        $("nav").after($('<div class="d-flex justify-content-center"><div class="alert alert-success alert-dismissible fade show d-inline-block" role="alert" id="alert"><strong>Succès : </strong>' + message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div>'));
        $('#alert').addClass('bounce animated').one('animationend', function () {
            $('#alert').removeClass('bounce animated');
        })
    }










    $(document).on("change", ".clientName", function () {
        var idClient = $(this)[0].selectedOptions[0].value;
        if (idClient > 0) {
            $.ajax({
                type: "POST",
                url: "index.php",
                data: {
                    idClient: idClient,
                    navSection: 'devis',
                    devisProgress: 'workList'
                },
                dataType: "html",
                success: function (response) {

                    $('#taskView').remove();
                    $('#workoption').html($(response));
                    $('#workoption').removeAttr('readonly');
                    $('#devisDate').prop('readonly', true);
                }
            });
        } else {
            $('#devisDate').prop('readonly', true);
            $('#workoption').html($('<option>--Chantier--</option>'));
        }
        $('#devisTotal').val(0);
        $('#taskView').remove();
    });

    $(document).on("change", "#workoption", function () {
        var idWork = $(this)[0].selectedOptions[0].value;
        var date = $(this)[0].selectedOptions[0].innerHTML.split(' ');
        var dateFormat = date[0].split('-');
        if (idWork > 0) {
            $.ajax({
                type: "POST",
                url: "index.php",
                data: {
                    idWork: idWork,
                    navSection: 'devis',
                    devisProgress: 'taskList'
                },
                dataType: "html",
                success: function (response) {

                    $('#taskView').remove();
                    $('#selectDevis').append($(response));
                    $('#devisDate')[0].value = dateFormat[2] + '-' + dateFormat[1] + '-' + dateFormat[0];
                    $('#devisDate').removeAttr('readonly');
                }
            });
        }
        $('#devisTotal').val(0);
        $('#taskView').remove();
    });


    function devisTotal() {
        var devisTotal = 0;
        var rowLength = $('.rowTotal').length;
        for (i = 0; i < rowLength; i++) {
            devisTotal += parseInt($('.rowTotal')[i].innerHTML);
        }
        return devisTotal;
    }


    $(document).on('click', '#add', function () {
        var currentTask = $('#detailsTask')[0].selectedOptions[0];
        var idTask = currentTask.value;
        if (idTask > 0) {
            var qte = $('#quantite').val();
            var pht = currentTask.attributes.prix.value;
            var unite = currentTask.attributes.unite.value;
            var intitule = currentTask.innerHTML;
            var idTask = currentTask.value;

            if ($('#taskDetails').html() === '') {
                $('#taskDetails').html($('<div class="table-responsive container mt-3" id="table_container"><table class="table table-sm table-striped text-white" id="table"><thead><tr><th>Intitulé</th><th>Quantité</th><th>Unité</th><th>PUHT</th><th>PTHT</th><th></th></tr></thead><tbody id="bodyTable"></tbody></table></div>'))
            }
        }
        $('#table').append($('<tr><td idTask="' + idTask + '">' + intitule + '</td><td>' + qte + '</td><td>' + unite + '</td><td>' + pht + '</td><td class="rowTotal">' + (qte * pht) + '</td><td><button class="float-right text-danger deleteRow">X</button></td></tr>'));

        $('#devisTotal').val(devisTotal());
    });


    $(document).on('click', '#valid', function () {

        var taille = $('#bodyTable')[0].childNodes.length;
        var idWork = $('#workoption')[0].selectedOptions[0].value;
        var tableau = new Array();

        for (i = 0; i < taille; i++) {
            var idTask = $('#bodyTable')[0].childNodes[i].cells[0].attributes.idTask.value;
            var quantite = $('#bodyTable')[0].childNodes[i].cells[1].innerText;
            tableau[i] = {
                "idTask": idTask,
                "quantite": quantite
            };
        }

        if (devisTotal() > 0 && idWork > 0) {
            $.ajax({
                type: "POST",
                url: "index.php",
                data: {
                    dataWork: tableau,
                    adminAction: 'newDevis',
                    devisProgress: 'validDevis',
                    idWork: idWork,
                    date: $('#devisDate').val(),
                    devisTotal: $('#devisTotal').val()
                },
                success: function (response) {
                    var iframe = $('<iframe style="width: 100%; height:100vh;">');
                    iframe.attr('src', response);
                    $('#ajax_nav').prepend(iframe);
                    $('#devisTotal').val(0);
                    $('#taskView').remove();
                    displayAlertSuccess('Le devis à bien été enregistré, cliquez sur la croix pour fermer ce message et l\'aperçue du pdf');
                }
            });
        }
    });

    $(document).on('click', '.deleteRow', function () { // Supprime une ligne du devis
        var rowToDelete = $(this)[0].offsetParent.parentNode;
        rowToDelete.remove();
        $('#devisTotal').val(devisTotal());
    });
    
    $(document).on('click', '.close', function () { // Fermeture aperçue pdf sur clique close modal succes
        $('iframe').remove();
    });

});



$(function () {

    $(document).on('submit', '#connexion_form', function () { //connection
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "index.php",
            data: $('#connexion_form').serialize(),
            dataType: "html",
            success: function (response) {
                console.log(response);
                document.location.reload(true);
            }
        });
    });



});