$(function () {

    function displayAlertSuccess(message) {
        $(".formDiv").prepend($('<div class="d-flex justify-content-center"><div class="alert alert-success alert-dismissible fade show d-inline-block" role="alert" id="alert"><strong>Succès : </strong>' + message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div>'));
        $('#alert').addClass('bounce animated').one('animationend', function () {
            $('#alert').removeClass('bounce animated');
        })
    }

    function displayAlertError(response) {
        $(".formDiv").prepend($('<div class="d-flex justify-content-center"><div class="alert alert-danger alert-dismissible fade show d-inline-block" role="alert" id="alert"><strong>' + response.substr(0, 6) + '</strong>' + response.substr(6) + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div>'));
        $('#alert').addClass('bounce animated twice').one('animationend', function () {
            $('#alert').removeClass('bounce animated twice');
        })
    }

    $(document).on("submit", "#contact", function (event) {
        event.preventDefault();
        $("#contact").addClass('was-validated');

        if (this.checkValidity()) {
            $.ajax({
                type: "POST",
                url: "index.php",
                data: $(this).serialize(),
                dataType: "html",
                success: function (response) {
                    if (response.substr(0, 6) === 'Erreur' || response.substr(0, 6) === '<br />') {
                        displayAlertError(response);
                    } else {
                        $("#contact").removeClass('was-validated');
                        $("#contact").trigger("reset");
                        displayAlertSuccess('Votre message a bien été envoyé ! Merci.');
                    }

                }
            });
        }
    });

    $(document).on("input", "#contact", function () {
        $("#contact").addClass('was-validated');
    });
});