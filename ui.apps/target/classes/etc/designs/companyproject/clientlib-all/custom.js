'use strict';

function backToHistory() {
	if (window.history.length > 1) {
        window.history.go(-2);
    } else {
        window.location = backToUrl;
    }
}
(function (document, $) {
    "use strict";

    var _satellite = window._satellite || {
            track: function () {
                console.log("Error, cannot connect dtm service");
            }
        };

    var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var alphaOnlyRegex = /^[-_'àèìòùáéíóúýâêîôûãñõäëïöüŸ¡¿çœßøåæÞþÐða-z\u00E0-\u00FC ]+$/i;
    var alphaNumOnlyRegex = /^[+€àèìòùáéíóúýâêîôûãñõäëïöüŸ¡¿çœßøåæÞþÐða-z\u00E0-\u00FC0-9 ]+$/i;
    var numberOnlyRegex = /^[0-9]*$/i;

    var checkEmailValid = function checkEmailValid(val) {
        return emailRegex.test(val);
    };
    var checkAlphaOnly = function checkAlphaOnly(val) {
        return alphaOnlyRegex.test(val);
    };
    var checkAlphaNumberOnly = function checkAlphaNumberOnly(val) {
        return alphaNumOnlyRegex.test(val);
    };
    var checkNumberOnly = function checkNumberOnly(val) {
        return numberOnlyRegex.test(val);
    };

    function isFormValid($form) {
        var error = false;
        var $formElements = $($form.prop('elements'));
        $formElements.each(function (i, o) {
            var $element = $(o); //
            var isRequired = !!$element.attr('required');
            var isEmail = $element.hasClass('JS_valid_email');
            var isAlpha = $element.hasClass('JS_only-alpha');
            var isAlphaNum = $element.hasClass('JS_only-alphanum');
            var isNumber = $element.hasClass('JS_only-number');
            var isNotrequired = $element.hasClass('.isNotrequired');
            var value = o.value;
            var isEmpty = value === '';

            if (isAlpha && !isEmpty) {
                if (!checkAlphaOnly(value)) {
                    error = true;
                }
            }
            if ((isAlphaNum || isNotrequired) && !isEmpty) {
                if (!checkAlphaNumberOnly(value)) {
                    error = true;
                }
            }

            if (isNumber && !isEmpty) {
                if (!checkNumberOnly(value)) {
                    error = true;
                }
            }
            if (isRequired) {
                if (isEmpty) {
                    error = true;
                }
                if (/radio|checkbox/i.test($element[0].type)) {
                    var _name = $element.prop('name');
                    var isChecked = $formElements.filter('[name=' + _name + ']:checked').length;
                    if (!isChecked) {
                        error = true;
                    }
                }
            }

            if (isEmail && !isEmpty) {
                var isValidEmail = checkEmailValid(value);
                if (!isValidEmail) {
                    error = true;
                }
            }
        });

        if (!error) {
            error = isResaFormValid($form);
        }

        return !error;
    }

    var convert = {
        'h': 'destiny',
        'g': 'destiny',
        'f': 'fdating',
        'd': 'ddating',
        'r': 'rooming',
        'a': 'rooming',
        'k': 'rooming',
        'e': 'events'
    };
    var CSS_CLASS_RESA_ACTIVE = 'resa-active-label';
    var CSS_CLASS_ROOM_HIDDEN = 'room-hidden';

    function isResaFormValid($form) {
        var error = false;

        var checkNames = {};
        var validName = {};
        $form.find('.JS_resa_input.JS_resa_valid').each(function (i, o) {
            checkNames[o.name] = isNaN(o.value) ? !!o.value : o.value > 0;
        });
        for (var label in checkNames) {
            if (checkNames.hasOwnProperty(label)) {
                var itemName = convert[label];
                validName[itemName] = validName[itemName] ? validName[itemName] : checkNames[label];
            }
        }
        for (var label in validName) {
            if (validName.hasOwnProperty(label)) {
                if (!validName[label]) {
                    error = true;
                    break;
                }
            }
        }

        if (!error) {
            $form.find('.JS_room').each(function (i, o) {
                var adults = $(o).find('[data-type="adult"]').val();
                var kidos = $(o).find('[data-type="kidos"]').val();
                if (kidos > 0 && adults == 0) {
                    error = true;
                }
            });
        }

        return error;
    }

    /**
     * Common tagging method on click button
     * @param category
     * @param label
     * @param url
     */
    function onClickButton(category, label, url) {
        digitalData.clic.category = category;
        digitalData.clic.label = label;
        digitalData.clic.url = url;

        _satellite.track('clic');
    }

    function onClickReservationHotel(destination, hotelName, dateDebut, dateArrivee, dureeSejour, nombreChambres, nombrePersonnes, typeChambre, codePromo) {
        digitalData.reservation_hotel.destination = destination;
        digitalData.reservation_hotel.nom_hotel = hotelName;
        digitalData.reservation_hotel.date_debut = dateDebut;
        digitalData.reservation_hotel.date_arrivee = dateArrivee;
        digitalData.reservation_hotel.duree_sejour = dureeSejour;
        digitalData.reservation_hotel.nombre_chambres = nombreChambres;
        digitalData.reservation_hotel.nombre_personnes = nombrePersonnes;
        digitalData.reservation_hotel.type_chambre = typeChambre;
        digitalData.reservation_hotel.code_promo = codePromo;

        _satellite.track('reservation_hotel');
    }

    function getDestinations($form) {
        var destinationList = [];
        $form.find('.JS_destination_cota[data-checked="true"]:checked').each(function (index, item) {
            destinationList.push(item.id);
        });

        return destinationList.join();
    }

    function countRoom($form) {
        var index = 1;
        $form.find('.JS_room').not('.' + CSS_CLASS_ROOM_HIDDEN).each(function () {
            $(this).find('.JS_room_index').html(index++);
        });
        return index - 1;
    }

    function countPeople($form) {
        var count = 0;
        $form.find('.JS_select_people').each(function (i, o) {
            var value = o.value;
            count += value >> 0;
        });
        return count;
    }

    var HotelsTagging = {
        /* Tagging for Header */
        headerMenuClick: function (label, url) {
            onClickButton('Header', label, url);
        },
        /* End tagging for Header */
        /* Tagging for Slider */
        sliderItemClick: function (label, url) {
            onClickButton('Slider', label, url);
        },
        /* End tagging for Slider */
        /* Tagging for Footer */
        footerItemClick: function (label, url) {
            onClickButton('Footer', label, url);
        },
        /* End tagging for Footer */
        /* Tagging for National Home page */
        nationalHomepageItemClick: function (label, url) {
            onClickButton('Homepage national', label, url);
        },
        /* End tagging for National Home page */
        /* Tagging for National Home page */
        transportItemClick: function (label, url) {
            onClickButton('Transport', label, url);
        },
        /* End tagging for National Home page */
        /* Tagging for Activities */
        activitiesItemClick: function (label, url) {
            onClickButton('Activites', label, url);
        },
        /* End tagging for Activities */
        /* Tagging for Gallery */
        galleryItemClick: function (label, url) {
            onClickButton('Galerie', label, url);
        },
        /* End tagging for Gallery */
        /* Tagging for MPG Form */
        mpgFormSubmit: function (event) {
            var $form = $(event.target).closest("form");
            if (!isFormValid($form)) {
                return;
            }

            var sexe = '';
            if ($form.find('#contact_Mme')[0].checked == true) {
                sexe = 'femme';
            } else if ($form.find('#contact_Mr')[0].checked == true) {
                sexe = 'homme';
            }
            var url = $form.find('input[name="url-website"]').val();
            var montantResa = $form.find('#amount').val();
            var montantResaConstate = $form.find('#total-price').val();
            var montantEcart = montantResa - montantResaConstate;
            montantEcart = isNaN(montantEcart) ? '' : montantEcart;
            //var objet = $form.find('#toto').val();
            var typeChambre = $form.find('#concerned-bedroom').val();
            var nomHotel = $form.find('#hotel-name option:selected').data('hotel-id');
            var dateArrivee = $form.find('#arrived').val();
            var dateDepart = $form.find('#departure').val();
            var numeroResa = $form.find('#confirmation').val();

            var dateArriveeMoment = moment(dateArrivee, "DD/MM/YYYY");
            var dateDepartMoment = moment(dateDepart, "DD/MM/YYYY");
            var nuits = dateDepartMoment.diff(dateArriveeMoment, 'days');

            digitalData.meilleurprixgaranti.sexe = sexe;
            digitalData.meilleurprixgaranti.url = url;
            digitalData.meilleurprixgaranti.montant_resa = montantResa;
            digitalData.meilleurprixgaranti.montant_resa_constate = montantResaConstate;
            digitalData.meilleurprixgaranti.montant_ecart = montantEcart;
            digitalData.meilleurprixgaranti.objet = "";
            digitalData.meilleurprixgaranti.type_chambre = typeChambre;
            digitalData.meilleurprixgaranti.nom_hotel = nomHotel;
            digitalData.meilleurprixgaranti.date_arrivee = dateArrivee;
            digitalData.meilleurprixgaranti.date_depart = dateDepart;
            digitalData.meilleurprixgaranti.numero_resa = numeroResa;
            digitalData.meilleurprixgaranti.nuits = nuits;

            _satellite.track('meilleurprixgaranti');
        },
        /* End tagging for MPG Form */
        /* Tagging for Filter Destinations, Comparator, Hotel Participants, and Module Hotels */
        reservationHotelClick: function (destinationId, hotelId) {
            onClickReservationHotel(destinationId, hotelId);
        },
        /* End tagging */
        /* Tagging for Reservation Hotel Service */
        reservationHotelServiceClick: function (hotelId) {
            digitalData.reservation_annexe.nom_hotel = hotelId;
            digitalData.reservation_annexe.restaurant = 'clic';
            digitalData.reservation_annexe.spa = '';

            _satellite.track('reservation_annexe');
        },
        /* End tagging for Reservation Hotel Service */
        /* Tagging for Reservation Event / Meeting, and Block Mice */
        reservationEventMeetingClick: function (event, hotelId, destinationId) {
            if (typeof destinationId === "undefined") {
                destinationId = getDestinations($(event.target).closest("form"));
            }

            digitalData.demande_cotations.nom_hotel = hotelId;
            digitalData.demande_cotations.reservation = 'clic';
            digitalData.demande_cotations.destination = destinationId;

            _satellite.track('demande_cotations');
        },
        /* End tagging */
        /* Tagging for Reservation Block Offre, Formulaire De Reservation Offers, Filtre Sejour Et Offres */
        reservationBlockOffreClick: function (hotelId, offerId) {
            if (typeof hotelId === "undefined" || hotelId.length == 0) {
                hotelId = $('.m35 .m19-3 .block-resa-details .col.col-1.line [class$="selection__rendered"]').attr('title') || "";
            }
            digitalData.acces_sejour_offres.nom_hotel = hotelId;
            digitalData.acces_sejour_offres.nom_offre = offerId;
            digitalData.acces_sejour_offres.reservation = 'clic';

            _satellite.track('reservation_sejours_offres');
        },
        /* End tagging */
        /* Tagging for Reservation Moteur Denvie */
        reservationMoteurDenvieClick: function (hotelId, offerId) {
            digitalData.reservation_coffrets_cadeaux.nom_hotel = hotelId;
            digitalData.reservation_coffrets_cadeaux.nom_coffret = offerId;
            digitalData.reservation_coffrets_cadeaux.reservation = 'clic';

            _satellite.track('reservation_coffrets_cadeaux');
        },
        /* End tagging for Reservation Moteur Denvie */
        /* Tagging for Reservation Newsletter */
        reservationNewsletterClick: function (event) {
            if (isFormValid($(event.target).closest("form"))) {
                digitalData.newsletter.type_inscription = 'inscription';

                _satellite.track('newsletter');
            }
        },
        /* End tagging for Reservation Newsletter */
        /* Tagging for Reservation Room */
        reservationRoomClick: function (destinationId, hotelId, typeChambre) {
            onClickReservationHotel(destinationId, hotelId, '', '', '', '', '', typeChambre);
        },
        /* End tagging for Reservation Room */
        /* Tagging for Reservation Moteur De Reservation */
        reservationEngineClick: function (event, destinationId, hotelId) {
            var $form = $(event.target).closest("form");
            if (!isFormValid($form)) {
                return;
            }

            if (typeof destinationId === "undefined" || destinationId.length == 0) {
                destinationId = $('.drm-city.JS_choose_resa.' + CSS_CLASS_RESA_ACTIVE).attr('data-id');
                if (typeof destinationId === "undefined" || destinationId.length == 0) {
                    destinationId = $('.drl-name.JS_choose_resa.' + CSS_CLASS_RESA_ACTIVE).attr('data-id');
                }

                hotelId = $('.drm-hotel.JS_choose_resa.' + CSS_CLASS_RESA_ACTIVE).attr('data-id');
                if (typeof hotelId === "undefined" || hotelId.length == 0) {
                    hotelId = $('.drl-hotels.JS_choose_resa.' + CSS_CLASS_RESA_ACTIVE).attr('data-id');
                }
            }

            var dateArriveeLabel = $form.find('input.JS_resa_input[name="f"]').val();
            var dateDebutLabel = $form.find('input.JS_resa_input[name="d"]').val();

            var dateArrivee = moment(dateArriveeLabel, "YYYYMMDD");
            var dateDebut = moment(dateDebutLabel, "YYYYMMDD");
            var dureeSejour = dateDebut.diff(dateArrivee, 'days');

            var nombreChambres = countRoom($form);
            var nombrePersonnes = countPeople($form);
            var codePromo = $form.find('input#resa_codepromo').val();

            onClickReservationHotel(destinationId, hotelId, dateDebutLabel, dateArriveeLabel, dureeSejour, nombreChambres, nombrePersonnes, '', codePromo);
        }
        /* End tagging for Reservation Room */
    };

    window.HotelsTagging = HotelsTagging;

})(document, $);
