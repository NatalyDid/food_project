function setValidator(id) {
    id.validate({
        rules: {
            select: "required",
            login: "required",
            pswd: "required",
            email_address: {
                required: true,
                email: true
            },
            optionsGender: "required",
            firstName: "required",
            surname: "required",
            email: {
                required: true,
                email: true
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
            price: "required",
            description: "required"
        },
        messages: {
            select: {
                required: "Dieses Feld muss ausgefüllt werden."
            },
            login: {
                required: "Bitte geben Sie Ihren Benutzernamen oder E-Mail Adresse ein."
            },
            pswd: {
                required: "Bitte geben Sie Ihren Passwort ein."
            },
            email_address: {
                required: "Bitte geben Sie Ihre E-Mail Adresse ein."
            },
            optionsGender: {
                required: "Bitte wählen Sie die Anrede aus."
            },
            firstName: {
                required: "Bitte geben Sie Ihren Vornamen ein."
            },
            surname: {
                required: "Bitte geben Sie Ihren Nachnamen ein."
            },
            email: {
                required: "Bitte geben Sie Ihre E-Mail Adresse ein.",
                email: "Die Angabe ist nicht korrekt."
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
            accept: {
                required: "Bitte bestätigen Sie die Datenschutzerklärung und Nutzungsbedingungen."
            },
            address: {
                required: "Bitte geben Sie hier Ihre Straße und Hausnummer ein."
            },
            zip: {
                required: "Bitte geben Sie Ihre Postleitzahl ein."
            },
            place: {
                required: "Bitte geben Sie Ihren Wohnort ein."
            },
            proposal_name: {
                required: "Dieses Feld muss ausgefüllt werden"
            },
            price: {
                required: "Dieses Feld muss ausgefüllt werden"
            },
            description : {
                required: "Dieses Feld muss ausgefüllt werden"
            }
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
});



