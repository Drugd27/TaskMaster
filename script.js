$(document).ready(function () {

    // Datepicker (jQuery UI)
    $("#datePicker").datepicker({
        dateFormat: "yy-mm-dd"
    });

    // Draggable formularz
    $("#taskFormContainer").draggable();

    // Toggle formularza
    $("#toggleForm").click(function () {
        $("#taskFormContainer").slideToggle();
    });

    // Tryb ciemny
    $("#darkModeBtn").click(function () {
        $("body").toggleClass("dark-mode");
    });

    // DataTables
    let table = $("#taskTable").DataTable({
        dom: 'Bfrtip',
        buttons: ['csv', 'pdf'],
        language: {
            search: "Szukaj:",
            lengthMenu: "Pokaż _MENU_ wpisów"
        }
    });

    // Walidacja formularza
    $("#taskForm").validate({
        rules: {
            title: {
                required: true,
                minlength: 3
            },
            date: "required",
            priority: "required"
        },
        messages: {
            title: "Podaj nazwę (min 3 znaki)",
            date: "Wybierz datę",
            priority: "Wybierz priorytet"
        },
        submitHandler: function (form) {

            let title = $("input[name='title']").val();
            let date = $("input[name='date']").val();
            let priority = $("select[name='priority']").val();

            let newRow = table.row.add([
                title,
                date,
                priority,
                "<span class='status'>Aktywne</span>",
                "<button class='complete btn btn-sm btn-success'>✔</button> " +
                "<button class='delete btn btn-sm btn-danger'>✖</button>"
            ]).draw().node();

            $(newRow).hide().fadeIn();

            form.reset();
        }
    });

    // Usuwanie
    $("#taskTable tbody").on("click", ".delete", function () {
        table.row($(this).parents('tr')).remove().draw();
    });

    // Oznacz jako ukończone
    $("#taskTable tbody").on("click", ".complete", function () {
        let row = $(this).closest("tr");
        row.toggleClass("completed");

        let status = row.find(".status");
        if (status.text() === "Aktywne") {
            status.text("Ukończone");
        } else {
            status.text("Aktywne");
        }

        row.animate({ opacity: 0.5 }, 200).animate({ opacity: 1 }, 200);
    });

    // Hover efekt
    $("#taskTable tbody").on("mouseenter", "tr", function () {
        $(this).css("background-color", "#f2f2f2");
    }).on("mouseleave", "tr", function () {
        $(this).css("background-color", "");
    });

});