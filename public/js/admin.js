$(function () {

    /* 
        ------------------------------------------------------
        | GESTION AFFICHAGE RETOUR DES ERREURS ET DES SUCCÈS |
        ------------------------------------------------------
    */
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
    //__________________________________________________________________________________________________________________________________________________

    /*
        ---------------------------------
        | NAVIGATION MENU LATERAL ADMIN |
        ---------------------------------
    */
    $(document).on("click", ".nav-link", function () {
        var navSection = this.id;
        event.preventDefault();
        $(".nav-item.active").removeClass("active");
        $(this).addClass("active");
        $.ajax({
            type: "POST",
            url: "index.php",
            data: {
                navSection: navSection
            },
            dataType: "html",
            success: function (response) {
                if (response.substr(0, 6) === 'Erreur' || response.substr(0, 6) === '<br />') {
                    displayAlertError(response);
                } else if (response.length == 0) {
                    document.location.reload(true);
                } else {
                    $('#ajax_nav').addClass('fadeOutRight' + ' animated ').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $("#ajax_nav").html(response);
                        $('#ajax_nav').removeClass('fadeOutRight animated').addClass('fadeInUp' + ' animated ').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass('fadeInUp animated');
                        });
                    });
                    setTimeout(function () {
                        $('#table_container').addClass('pulse animated faster').one('animationend', function () {
                            $('#table_container').removeClass('pulse animated faster');
                            clearTimeout();
                        });
                    }, 1500);
                }
            }
        });
    });
    //__________________________________________________________________________________________________________________________________________________
    /*
        ----------
        | CLIENT |
        ----------

    ----------------------------------------------------------------------------------------------------------------------------------------------------

            ----------------------------------------------------
            | I. Chargement fiche client depuis le menu Client |
            ----------------------------------------------------
    */
    $(document).on("click", ".fiche-client", function () {
        var idClient = this.id;
        $.ajax({
            type: "POST",
            url: "index.php",
            data: {
                navSection: "clientCard",
                idClient: idClient
            },
            dataType: "html",
            success: function (response) {
                if (response.substr(0, 6) === 'Erreur' || response.substr(0, 6) === '<br />') {
                    displayAlertError(response);
                } else if (response.length == 0) {
                    document.location.reload(true);
                } else {
                    $('#ajax_nav').addClass('fadeOutRight' + ' animated ').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $("#ajax_nav").html(response);
                        $('#ajax_nav').removeClass('fadeOutRight animated').addClass('fadeInUp' + ' animated ').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass('fadeInUp animated');

                        });
                    });
                    setTimeout(function () {
                        $('#infoCiv').addClass('flash animated ').one('animationend', function () {
                            $('#infoCiv').removeClass('flash animated');
                        })
                    }, 1300);
                }
            }
        });
    });
    //--------------------------------------------------------------------------------------------------------------------------------------------------

    /*
            -------------------------------
            | II. Ajout et Edition Client |
            -------------------------------
    */

    $(document).on("click", "#btnNewUser", function () { // Reset le formulaire nouveau client sur clique bouton nouveau Client
        var form = $("#form_new_user");
        form.removeClass('was-validated');
        form.trigger("reset");
    });


    function verifCivil() { // Verifie que le formulaire comporte soit un nom et prènom, soit une raison social

        var nom = $("#nom"),
            prenom = $("#prenom"),
            raison_social = $("#raison_social");

        if (raison_social.val() || (nom.val() && prenom.val())) {
            if (raison_social.val()) {
                raison_social.prop('required', true);
                nom.prop('required', false);
                prenom.prop('required', false);
            } else {
                raison_social.prop('required', false);
                nom.prop('required', true);
                prenom.prop('required', true);
            }
        } else {
            raison_social.prop('required', true);
            nom.prop('required', true);
            prenom.prop('required', true);
        }
        $("#form_new_user").addClass('was-validated');
    }

    $(document).on("input", "#form_new_user", function () {
        verifCivil();
    });

    $(document).on("submit", ".creat_edit_user", function () { // Submit formulaire nouveau client, edition client et validation données du formulaire
        event.preventDefault();

        var form = $(this);
        var ajax_switch = form.attr('id');
        var nom = $("#nom"),
            prenom = $("#prenom"),
            raison_social = $("#raison_social");

        verifCivil();

        if (form[0].checkValidity()) {
            $('#new_user').modal('hide');
            $('#modalEditClient').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $.ajax({
                type: "POST",
                url: "index.php",
                data: form.serialize(),
                dataType: "html",
                success: function (response) {

                    if (response.substr(0, 6) === 'Erreur' || response.substr(0, 6) === '<br />') {
                        displayAlertError(response);
                    } else if (response.length == 0) {
                        document.location.reload(true);
                    } else {

                        switch (ajax_switch) {
                            case 'form_new_user':
                                $('#table_container').addClass('client-anim animated slower').one('animationstart', function () {
                                    $("#table_container").css("overflow", "hidden");
                                    setTimeout(function () {
                                        $("#table_container").html(response);
                                    }, 1000);
                                }).one('animationend', function () {
                                    $('#table_container').removeClass('client-anim animated slower');
                                    $("#table_container").css("overflow", "");
                                    var message = (nom.val() == '') ? raison_social.val() : (nom.val() + ' ' + prenom.val());
                                    displayAlertSuccess('la fiche client de ' + message + ' à bien été enregistré');
                                })
                                break;
                            case 'edition_client':
                                $("#ajax_nav").html(response);
                                $('#infoCiv').addClass('flash animated').one('animationend', function () {
                                    $('#infoCiv').removeClass('flash animated');
                                })
                                break;

                            default:

                                break;
                        }
                    }
                },
                error: function (xhr, type, thrownError) {
                    displayAlertFatalError(thrownError);
                }
            });
        }
    });
    //--------------------------------------------------------------------------------------------------------------------------------------------------

    /*
            ---------------------------
            | III. Suppression Client |
            ---------------------------
    */

    $(document).on("click", "#delete_client", function () { // Suppression fiche client
        var idClient = $('#idClient').val();
        $('#modalSupprClient').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $.ajax({
            type: "POST",
            url: "index.php",
            data: {
                idClient: idClient,
                adminAction: 'deleteClient'
            },
            dataType: "html",
            success: function (response) {
                if (response.substr(0, 6) === 'Erreur' || response.substr(0, 6) === '<br />') {
                    displayAlertError(response);
                } else if (response.length == 0) {
                    document.location.reload(true);
                } else {
                    $('#ajax_nav').addClass('fadeOutRight' + ' animated ').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $("#ajax_nav").html(response);
                        $('#ajax_nav').removeClass('fadeOutRight animated').addClass('fadeInUp' + ' animated ').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass('fadeInUp animated');
                        });
                    });
                    setTimeout(function () {
                        $('#table_container').addClass('flash animated ').one('animationend', function () {
                            $('#table_container').removeClass('flash animated');
                            displayAlertSuccess('Fiche client désactivé, vous pouvez la réactiver dans le menu paramètre > client ');
                        })
                    }, 1300);
                }
            }
        });
    });
    //__________________________________________________________________________________________________________________________________________________
    /*
        ------------
        | CHANTIER |
        ------------

    ----------------------------------------------------------------------------------------------------------------------------------------------------

            -----------------------------
            | I. AJOUT NOUVEAU CHANTIER |
            -----------------------------
    */

    $(document).on("submit", "#formNewWork", function () { //ajout nouveau chantier
        event.preventDefault();
        event.stopPropagation();
        $('#modalAjoutTrav').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        var idClient = $('#idClient').val();
        var intitule = $("#intitule").val();
        var date = $("#date_debut").val();

        $.ajax({
            type: "POST",
            url: "index.php",
            data: {
                idClient: idClient,
                adminAction: 'newWork',
                intitule: intitule,
                date: date
            },
            dataType: "html",
            success: function (response) {

                $('#ajax_nav').addClass('fadeOutRight' + ' animated slow ').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $("#ajax_nav").html(response);
                    $('#ajax_nav').removeClass('fadeOutRight animated slow').addClass('fadeInUp' + ' animated slow').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $(this).removeClass('fadeInUp animated slow');
                    });
                });
            }
        });
    });
    //--------------------------------------------------------------------------------------------------------------------------------------------------

    /*
            ----------------------------
            | II. SUPPRESSION CHANTIER |
            ----------------------------
    */

    //__________________________________________________________________________________________________________________________________________________
    /*
        ---------------
        | DECONNEXION |
        ---------------
    */
    $(document).on('click', "#deconnexion", function () { //deconnect
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "index.php",
            dataType: "html",
            data: {
                commonAction: 'logout'
            },

            success: function (response) {
                console.log(response);
                document.location.reload(true);
            }
        });
    });
});