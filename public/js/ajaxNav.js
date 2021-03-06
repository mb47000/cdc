$(function () {
    $(document).on("click", ".nav-link", function (e) {
        e.preventDefault();

        $(".nav-link").removeClass('active');
        $(this).addClass('active');
        document.title = this.textContent;
        $.ajax({
            type: "POST",
            url: "index.php",
            data: {
                navSection: this.textContent,
            },
            dataType: "html",
            success: function (response) {
                $('body').css('overflow-y', 'hidden');
                $('#content').removeClass('fadeInUP animated faster').addClass('fadeOutDown animated faster').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $("#content").html(response);
                    $('#content').removeClass('fadeOutDown animated faster').addClass('fadeInUp animated faster').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $(this).removeClass('fadeInUp animated faster');
                        $('body').css('overflow-y', 'auto');  
                    });
                });
            }
        });
    });
});