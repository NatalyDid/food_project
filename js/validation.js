function setValidator(id) {
    id.validate({
        rules: {
            select_kat: "required",
            select_type: "required",
            select_portion: "required",
            select_number: "required",
            select_opt: "required",
            food_sort: "required",
            food_params: {
                required: true,
                minlength: 1
            },
            login: "required",
            pswd: "required",
            email_address: {
                required: true,
                email_pattern: true
            },
            optionsGender: "required",
            firstName: "required",
            surname: "required",
            email: {
                required: true,
                email_pattern: true
            },
            nick: {
                required: true,
                minlength: 3,
                maxlength: 20
            },
            tel: {
                required: true,
                tel_num: true,
                normalizer: function (value) {
                    var tel_num = value;
                    if (tel_num && tel_num.substr(0, 2) === "00") {
                        tel_num = "0" + tel_num.substr(2);
                    }

                    $(this).val(tel_num);
                    return tel_num;
                }
            },
            pswd_reg: {
                required: true,
                minlength: 6,
                maxlength: 20,
                pswd_pattern: true
            },
            pswd_reg_rep: {
                required: true,
                equalTo: "#pswd_reg"
            },
            new_pswd: {
                required: true,
                minlength: 6,
                maxlength: 20,
                pswd_pattern: true
            },
            new_pswd_rep: {
                required: true,
                equalTo: "#new_pswd"
            },
            accept: "required",
            address: "required",
            zip: "required",
            place: "required",
            proposal_name: "required",
            price: {
                required: true,
                number: true
            },
            description: "required",
            ingredients: "required",
            conf_pswd: "required"
        },
        messages: {
            select_kat:"Dieses Feld muss ausgefüllt werden.",
            select_type: "Dieses Feld muss ausgefüllt werden.",
            select_portion: "Dieses Feld muss ausgefüllt werden.",
            select_number: "Dieses Feld muss ausgefüllt werden.",
            select_opt: "Dieses Feld muss ausgefüllt werden.",
            food_sort: "Dieses Feld muss ausgefüllt werden.",
            food_params: "Dieses Feld muss ausgefüllt werden.",
            login: "Bitte geben Sie Ihren Benutzernamen oder E-Mail Adresse ein.",
            pswd: "Bitte geben Sie Ihren Passwort ein.",
            email_address: "Bitte geben Sie Ihre E-Mail Adresse ein.",
            optionsGender: "Bitte wählen Sie die Anrede aus.",
            firstName: "Bitte geben Sie Ihren Vornamen ein.",
            surname: "Bitte geben Sie Ihren Nachnamen ein.",
            email: {
                required: "Bitte geben Sie Ihre E-Mail Adresse ein."
            },
            nick: {
                required: "Bitte geben Sie Ihren Benutzernamen ein.",
                minlength: "Der Benutzername darf mindestens 3 und höchstens 20 Zeichen lang sein.",
                maxlength: "Der Benutzername darf mindestens 3 und höchstens 20 Zeichen lang sein."
            },
            tel: {
                required: "Bitte geben Sie Ihren Rufnummer ein.",
                digits: "Die Angabe ist nicht korrekt."
            },
            pswd_reg: {
                required: "Bitte geben Sie Ihren Passwort ein.",
                minlength: "Das Passwort muss mindestens 8 und höchstens 20 Zeichen lang sein, Zahlen und Großbuchstaben beinhalten.",
                maxlength: "Das Passwort muss mindestens 8 und höchstens 20 Zeichen lang sein, Zahlen und Großbuchstaben beinhalten."
            },
            pswd_reg_rep: {
                required: "Bitte geben Sie Ihren Passwort ein.",
                equalTo: "Die Angaben stimmen nicht überein."
            },
            new_pswd: {
                required: "Bitte geben Sie Ihren Passwort ein.",
                minlength: "Das Passwort muss mindestens 8 und höchstens 20 Zeichen lang sein, Zahlen und Großbuchstaben beinhalten.",
                maxlength: "Das Passwort muss mindestens 8 und höchstens 20 Zeichen lang sein, Zahlen und Großbuchstaben beinhalten."
            },
            new_pswd_rep: {
                required: "Bitte geben Sie Ihren Passwort ein.",
                equalTo: "Die Angaben stimmen nicht überein."
            },
            accept: "Bitte bestätigen Sie die Datenschutzerklärung und Nutzungsbedingungen.",
            address: "Bitte geben Sie hier Ihre Straße und Hausnummer ein.",
            zip: "Bitte geben Sie Ihre Postleitzahl ein.",
            place:  "Bitte geben Sie Ihren Wohnort ein.",
            proposal_name: "Dieses Feld muss ausgefüllt werden",
            price: {
                required: "Dieses Feld muss ausgefüllt werden",
                number: "In diesem Feld muss es Zahlen geben."
            },
            description: "Dieses Feld muss ausgefüllt werden",
            ingredients: "Dieses Feld muss ausgefüllt werden",
            conf_pswd: "Dieses Feld muss ausgefüllt werden"
        }
    });
}

$(function () {
    $.validator.addMethod("pswd_pattern", function (value, element) {
        return this.optional(element) || /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/.test(value);
    }, "Das Passwort muss mindestens 8 und höchstens 20 Zeichen lang sein, Zahlen und Großbuchstaben beinhalten.");

    $.validator.addMethod("tel_num", function (value, element) {
        return this.optional(element) || /^0\d{3,4}\ \d{7}$/.test(value);
    }, "Die Angabe ist nicht korrekt.");

    $.validator.addMethod("email_pattern", function (value, element) {
        return this.optional(element) || /[a-z0-9]+@[a-z]+\.[a-z]+/.test( value );
    }, "lalala.");
});



