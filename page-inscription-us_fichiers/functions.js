$(document).ready(function () {

    if (null !== document.getElementById('fpointure')) {
        jQuery('#prix_plateforme').hide();
        jQuery('#economie').hide();
        jQuery('#prod_caracteristiques').hide();
        jQuery('#ean').hide();
    }

    // affichage / masquage prix sur le site
    jQuery(".affichage-prix").click(function () {
        jQuery.ajax({ // Mise àjour du prix en fonction de l'attribut
            type: "POST",
            url: '/js/ajax/displayHidePrice.php',
            success: function (msg) {
                window.location.reload();
            }

        });
    });

    // force l'impression de la page si le paramètre print est à 1
    var print = getParameterByName('print');
    if (print == 1) {
        window.print();
    }


    /* Header menu rollover */
    $("ul#header_menu > li").hover(function () {
        $(this).addClass("actif");
    }, function () {
        $(this).removeClass("actif");
    });

    loadAddNewsletter('#inscription_newsletter');

    $('select.select').each(function () {
        var title = $(this).attr('title');
        if ($('option:selected', this).val() != '') title = $('option:selected', this).text();
        var numClass = $(this).attr('class');
        var numId = numClass.split('_');
        $(this)
            .css({'z-index': 10, 'opacity': 0, '-khtml-appearance': 'none'})
            .after('<span class="select_' + numId[1] + '">' + title + '</span>')
            .change(function () {
                val = $('option:selected', this).text();
                $(this).next().text(val);
            })
    });
    jQuery('#slider_home ul').bxSlider({auto: true, pager: true, controls: false, speed: 600}); // Slider Accueil
    jQuery('.slider_promo ul').bxSlider({
        auto: false,
        pager: false,
        controls: true,
        minSlides: 3,
        maxSlides: 3,
        slideWidth: 200
    }); // Slider Promo
	
	
	//Button to make home slider fullscreen
	$('#fullscreen-bt').click(function(e){
    $('#home_presentation').toggleClass('fullscreen'); 
	});
	//Fin Button to make home slider fullscreen
	
	
    jQuery('.slider_topvente ul').bxSlider({
        auto: false,
        pager: false,
        controls: true,
        minSlides: 3,
        maxSlides: 3,
        slideWidth: 200
    }); // Slider top ventes
    jQuery('.slider_nouveaute ul').bxSlider({
        auto: false,
        pager: false,
        controls: true,
        minSlides: 3,
        maxSlides: 3,
        slideWidth: 200
    }); // Slider nouveautes
    jQuery('.slider_produits_simg_big ul').bxSlider({
        auto: false,
        pager: false,
        controls: true,
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 236,
        infiniteLoop: true
    }); // Slider produits similaires big
    jQuery('.slider_produits_comp_big ul').bxSlider({
        auto: false,
        pager: false,
        controls: true,
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 236
    }); // Slider produits completmentaires big
    jQuery('#slider_produits_compte_accueil ul').bxSlider({
        auto: false,
        pager: false,
        controls: true,
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 236
    }); // Slider produits compte accueil
    jQuery('#produit_slider').bxSlider({
        video: true,
        useCSS: false,
        pagerCustom: '#bx-pager',
        infiniteLoop: false,
        controls: false,
        speed: 600
    }); // Slider Produit


    /* Prdouit Nav Onglet */
    $("#prod_details li.niv1").click(function () {
        $("#prod_details h2").removeClass('actif');
        $(".roll_details").css('display', 'none');
        $(this).children('h2').addClass('actif');
        $(this).children('div.roll_details').css('display', 'block');
    });

    jQuery("#avis_action p.btn_new_avis").click(function () { // panier promo deroulant
        if (jQuery(".new_avis").is(':visible')) {
            jQuery(".new_avis").slideUp();
        } else {
            jQuery(".new_avis").slideDown();
        }
    });

    if (jQuery('#adresse_identique2')) {
        jQuery('#adresse_identique2').click(function () {
            if (jQuery('#adr_facturation').css('opacity') == 0.4) {
                jQuery('#adresse_identique2').attr('value', 0);
                jQuery('#adr_facturation').fadeTo('0', 1);
            } else {
                jQuery('#adresse_identique2').attr('value', 1);
                jQuery('#adr_facturation').stop(true, true).fadeTo('0', 0.4);
                loadAdresse(jQuery('#adresse_identique2'));
            }
        });
    }
    if (jQuery('#adresse_identique2').attr('value') == 1) {
        jQuery('#adresse_identique2').click();
        jQuery('#adresse_identique2').click();
        jQuery('#adresse_identique2').attr('checked', true);
    }


    /* Roll over panier */

    jQuery("#maj_panier").mouseenter(function (event) {
        if (jQuery('#rollover_panier').css('display') == 'none') {
            jQuery("#maj_panier").css('cursor', 'pointer');

            jQuery.ajax({
                type: "POST",
                url: '/js/ajax/show_panier.php',
                success: function (html) {
                    // création de la div
                    if (!jQuery("#rollover_panier").attr('id')) {
                        jQuery("<div></div>").hide().attr("id", "rollover_panier").css({
                            'left': (pos.left - 255) + 'px',
                            'position': 'absolute',
                            'top': (pos.top + 80) + 'px',
                            'z-index': '3000'
                        }).html(html).appendTo("body").show();
                    } else {
                        jQuery("#rollover_panier").html(html);
                    }

                    jQuery("#rollover_panier").mouseenter(function (event) {
                        jQuery("#rollover_panier").css('display', 'block');
                    });
                    jQuery("#rollover_panier").mouseleave(function (event) {
                        jQuery("#rollover_panier").css('display', 'none');
                    });
                    jQuery("#maj_panier").mouseleave(function (event) {
                        jQuery("#rollover_panier").css('display', 'none');
                    });
                }
            });
            jQuery("#rollover_panier").show();
        }
    });

    jQuery("#maj_panier").mouseleave(function (event) {
        jQuery("#rollover_panier").css('display', 'none');
    });

    jQuery('body').prepend('<a href="#top" class="top_link" title="Revenir en haut de page"></a>');
    jQuery('.top_link').css({
        'position': 'fixed',
        'width': '52px',
        'height': '65px',
        'right': '0px',
        'bottom': '30px',
        'display': 'none',
        'z-index': '2000'
    });

    /*jQuery('body').prepend('<a href="#top" class="top_link" title="Revenir en haut de page">Haut de page &uarr;</a>');
     jQuery('.top_link').css({
     'position': 'fixed',
     'right': '20px',
     'bottom': '50px',
     'display': 'none',
     'padding': '20px',
     'background': '#fff',
     'color': '#474343',
     '-moz-border-radius': '40px',
     '-webkit-border-radius': '40px',
     'border-radius': '40px',
     'opacity': '0.9',
     'z-index': '2000'
     });*/

    jQuery(window).scroll(function () {
        posScroll = jQuery(document).scrollTop();
        if (posScroll >= 550)
            $('.top_link').fadeIn(600);
        else
            $('.top_link').fadeOut(600);
    });
    jQuery('.top_link').click(function () {
        jQuery('html').animate({scrollTop: 0}, 'slow');
    });

    // Price filter range slider
    (function ($) {
        $('.slider_prix').each(function () {
            var $sliderContainer = $(this);
            var minPrice = parseInt($sliderContainer.data('min'), 10);
            var maxPrice = parseInt($sliderContainer.data('max'), 10);
            var startPrice = parseInt($sliderContainer.data('start'), 10);
            var endPrice = parseInt($sliderContainer.data('end'), 10);

            $sliderContainer.slider({
                range: true,
                min: minPrice,
                max: maxPrice,
                values: [startPrice, endPrice],
                slide: function (event, ui) {
                    $('.filtre_prix_label').text("de " + ui.values[0] + " € à " + ui.values[1] + " €");
                    $("input.filtre_prix.prix1").val(ui.values[0]);
                    $("input.filtre_prix.prix2").val(ui.values[1]);
                }
            });
            $('.filtre_prix_label').text("de " + $sliderContainer.slider("values", 0) + " € à " + $sliderContainer.slider("values", 1) + " €");
        });
    })(jQuery);
});


/* Popup quand arrive sur site avant création compte client */
//Pour lancer PopUp pour les non-inscrits
// Shadowbox.init({
//     skipSetup: true,
//     players: ["html"]
// });
//
// Shadowbox.init({
//     skipSetup: true,
//     players: ["html"]
// });
//
// window.onload = function () {
//
//     // au chargement de la page
//     Shadowbox.open({
//         content: '<div id="welcome-msg">Bienvenue</div>',
//         player: "html",
//         title: "",
//         height: 350,
//         width: 350
//     });
//
// };
/*Pop Up*/

function toggle(div_id) {
    var el = document.getElementById(div_id);
    if (el.style.display == 'none') {
        el.style.display = 'block';
    } else {
        el.style.display = 'none';
    }
}

function blanket_size(popUpDivVar) {
    if (typeof window.innerWidth != 'undefined') {
        viewportheight = window.innerHeight;
    } else {
        viewportheight = document.documentElement.clientHeight;
    }
    if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
        blanket_height = viewportheight;
    } else {
        if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
            blanket_height = document.body.parentNode.clientHeight;
        } else {
            blanket_height = document.body.parentNode.scrollHeight;
        }
    }
    var blanket = document.getElementById('blanket');
    blanket.style.height = blanket_height + 'px';
    var popUpDiv = document.getElementById(popUpDivVar);
    popUpDiv_height = blanket_height / 2 - 200;//200 is half popup's height
    popUpDiv.style.top = '15px';
}

function window_pos(popUpDivVar) {
    if (typeof window.innerWidth != 'undefined') {
        viewportwidth = window.innerHeight;
    } else {
        viewportwidth = document.documentElement.clientHeight;
    }
    if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
        window_width = viewportwidth;
    } else {
        if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
            window_width = document.body.parentNode.clientWidth;
        } else {
            window_width = document.body.parentNode.scrollWidth;
        }
    }
    var popUpDiv = document.getElementById(popUpDivVar);
    window_width = window_width / 2 - 200;//200 is half popup's width
    popUpDiv.style.left = window_width + 'px';
}

function popup(windowname) {
    blanket_size(windowname);
    window_pos(windowname);
    toggle('blanket');
    toggle(windowname);
}

// When the user clicks anywhere outside of the pop up, close it
window.onclick = function (event) {
    var elementExists = document.getElementById("popUpDiv");
    if (elementExists && event.target == popUpDiv) {
        popUpDiv.style.display = "none";
    }
}

/*Fin Pop Up*/

/*Afficher/Cacher Mot de passe*/
function displayPass() {
  var passShow = document.getElementById("co_psw");
  if (passShow.type === "password") {
    passShow.type = "text";
  } else {
    passShow.type = "password";
  }
}

function displayPassLogin() {
  var passShowLogin = document.getElementById("fco_pswd");
  if (passShowLogin.type === "password") {
    passShowLogin.type = "text";
  } else {
    passShowLogin.type = "password";
  }
}
/*Fin Afficher/cacher Mot de passe*/



/************** FIN CHARGEMENT PAGE *****************************/

function ajaxPrix(produitId, attributId) {
    jQuery.ajax({ // Mise àjour du prix en fonction de l'attribut
        type: "POST",
        url: '/js/ajax/ajaxPrix.php',
        data: 'produit_id=' + produitId + '&produit_attribut_id=' + attributId + '&qte=' + document.getElementById('value-qte-' + produitId).value + '',
        success: function (msg) {
            if (msg !== 'no-update') {
                jQuery('#btn_add_to_basket input').show();
                jQuery('.select-option').hide();
                var prices = msg.split('----');
                jQuery('#prix_produit').html(prices[0]);
                jQuery('#maj_prix').html(prices[1]);
                if (prices[4] != 0) {
                    jQuery('#tarif_standard').html(prices[2]);
                    jQuery('#economie_prix').html(prices[3]);
                    jQuery('#prix_plateforme').show();
                    jQuery('#economie').show();
                } else {
                    jQuery('#prix_plateforme').hide();
                    jQuery('#economie').hide();
                }
                jQuery('#prod_caracteristiques').show();
                jQuery('#ean').show();

            }
        }

    });
}

function ajaxStock(produitId) {
    if (!produitId) {
        var produitId = jQuery('#produit_id').attr('value');
    }
    if (jQuery('#fpointure').length) {
        var attributId = document.getElementById('fpointure').options[fpointure.selectedIndex].value;
    } else {
        var attributId = -1;
    }
    jQuery.ajax({ // Mise àjour du stock en fonction de l'attribut
        type: "POST",
        url: '/js/ajax/ajaxStock.php',
        data: 'produit_id=' + produitId + '&produit_attribut_id=' + attributId + '&qte=' + document.getElementById('value-qte-' + produitId).value + '',
        success: function (msg) {
            var stocks = msg.split('----');
            jQuery('#maj_dispo').html(stocks[0]);
            jQuery('#btn_add_to_basket').html(stocks[1]);
        }
    });
}

function ajaxStockListing(produitId) {
    if (!produitId) {
        var produitId = jQuery('#produit_id').attr('value');
    }
    jQuery.ajax({ // Mise àjour du stock en fonction de l'attribut
        type: "POST",
        url: '/js/ajax/ajaxStockListing.php',
        data: 'produit_id=' + produitId + '&qte=' + document.getElementById('value-qte-' + produitId).value + '',
        success: function (msg) {
            var stocks = msg.split('----');
            jQuery('#maj_dispo-' + produitId).html(stocks[0]);
            jQuery('#btn_add_to_basket-' + produitId).html(stocks[1]);
        }
    });
}

function majCouleur(produit_option_valeur_id, produit_id) {
    jQuery.ajax({
        url: '/js/ajax/majCouleur.php',
        type: 'POST',
        data: 'produit_option_valeur_id=' + produit_option_valeur_id + '&produit_id=' + produit_id,
        success: function (req) {
            jQuery('#maj_couleur').html(req);
        }
    });
}

function majQuantite() {
    produit_attribut_element = document.getElementById('fpointure');
    if (null !== produit_attribut_element) {
        produit_attribut_id = produit_attribut_element.options[fpointure.selectedIndex].value;
    } else {
        produit_attribut_id = -1;
    }
    produit_id = jQuery('#produit_id').attr('value');

    ajaxPrix(produit_id, produit_attribut_id);
    ajaxStock(produit_id, produit_attribut_id);
}

function majAttribut() {
    produit_attribut_element = document.getElementById('fpointure');
    if (null !== produit_attribut_element) {
        produit_attribut_id = produit_attribut_element.options[fpointure.selectedIndex].value;
    } else {
        produit_attribut_id = -1;
    }
    produit_id = jQuery('#produit_id').attr('value');
    jQuery('#patt-prod-1').attr('value', produit_attribut_id);
    jQuery.ajax({ // Mise à jour de la ref en fonction de l'attribut
        type: "POST",
        url: '/js/ajax/ajaxMajAttribut.php',
        data: 'produit_id=' + produit_id + '&produit_attribut_id=' + produit_attribut_id + '',
        success: function (msg) {
            var refs = msg.split('----');
            jQuery('#maj_ref').html(refs[0]);
            jQuery('#maj_ean').html(refs[1]);
            if (refs[4] == 0 || refs[3] == 'PHN') {
                jQuery('.code_lpp').hide();
            } else {
                jQuery('#maj_lppr').html(refs[2]);
                jQuery('#maj_br').html(refs[4]);
                jQuery('.code_lpp').show();
            }
            if (refs[5] > 1) {
                jQuery('.min-qte').removeClass('hide_btn');
            } else {
                jQuery('.min-qte').addClass('hide_btn');
            }
            jQuery('#maj_qte_min').html(refs[5]);
            jQuery('#value-qte-' + produit_id).val(refs[5]);
            jQuery('#value-qte-' + produit_id).attr('min', refs[5]);


        }
    });
    ajaxPrix(produit_id, produit_attribut_id);
    ajaxStock(produit_id, produit_attribut_id);
}

//Affichage du sous menu au rollover
function initMenu() {

    jQuery("#menu a.lien_menu_principal").each(function (i) {

        jQuery(this).mouseenter(function (event) {
            jQuery("#sous-" + jQuery(this).attr("id")).css('visibility', 'visible');
        });

        jQuery(this).mouseleave(function (event) {
            jQuery("#sous-" + jQuery(this).attr("id")).css('visibility', 'hidden');
            jQuery(".sous-" + jQuery(this).attr("id")).css('visibility', 'hidden');
        });
    });

    jQuery(".sous-categorie").each(function (i) {
        jQuery(this).mouseenter(function (event) {
            jQuery("#" + jQuery(this).attr("id").substr(5)).addClass('onrollover');
            jQuery(this).css('visibility', 'visible');
        });

        jQuery(this).mouseleave(function (event) {
            jQuery(this).removeClass('hover');
            jQuery("#" + jQuery(this).attr("id").substr(5)).removeClass('onrollover');
            jQuery(this).css('visibility', 'hidden');
        });
    });
}

/*
 function loadChangeImage(){
 jQuery("#liste-mini-visuel .mini-visuel").each(function(i){
 jQuery(this).css('cursor', 'pointer').click(function(){
 var idVisu = jQuery(this).attr('id');
 jQuery("#grand-visuel img:first").attr('src', jQuery("#grand-"+idVisu+" img").attr('src'));
 jQuery("#grand-visuel img:first").parents('a.jqzoom').attr('href', jQuery("#popup-"+idVisu+" img").attr('src'));     // pour le zoom produit
 jQuery("#loupe-visuel").unbind('click');
 jQuery("#loupe-visuel").click(function(){
 jQuery("body").popup({
 popup:{
 css:{
 'width':'700px',
 'height':'320px',
 'border':'1px solid #C6C6C6'
 },
 removeOnClick:{
 0:'#popup'
 }
 },
 content: jQuery("#popup-"+idVisu).html()
 });
 });
 });
 });

 jQuery("#loupe-visuel").css('cursor', 'pointer').click(function(){
 jQuery("body").popup({
 popup:{
 removeOnClick:{
 0:'#popup'
 },
 css:{
 'width':'700px',
 'height':'320px',
 'border':'1px solid #C6C6C6'
 }
 },
 content: jQuery("#popup-"+jQuery("#liste-mini-visuel .mini-visuel:first").attr('id')).html()
 });
 });
 }
 */
function loadPopupAttr() {
    jQuery(".liste-opts .img-attr").each(function (i) {
        if (jQuery("#popup-" + this.id).attr('id')) {
            jQuery(this).css('cursor', 'pointer').click(function () {
                jQuery("body").popup({
                    popup: {
                        css: {
                            'width': '700px',
                            'height': '320px',
                            'border': '1px solid #C6C6C6'
                        },
                        removeOnClick: {
                            0: '#popup'
                        }
                    },
                    content: jQuery("#popup-" + this.id).html()
                });
            });
        }
    });
}

function loadAddNewsletter(node) {
    alterneText("#newsletter_email", 'Votre email ici');
    jQuery(node).submit(function () {
        jQuery("body").popup({
            popup: {
                removeOnClick: {
                    0: '#btn-close-popup',
                    1: '#close'
                }
            },
            ajax: '/js/ajax/addNewsletter.php',
            data: jQuery(node).serialize()
        });
        return false;
    });
}

function loadAjoutPanier() {

    jQuery(".plus").css('cursor', 'pointer').click(function () {
        jQuery("#case-" + this.id).attr('value', (parseInt(jQuery("#case-" + this.id).attr('value')) + 1));
        jQuery("#qte-" + jQuery(this).attr('id')).attr('value', parseInt(jQuery("#case-" + jQuery(this).attr('id')).attr('value')));
    });

    jQuery(".moin").css('cursor', 'pointer').click(function () {
        if ((parseInt(jQuery("#case-" + this.id).attr('value')) - 1) > 0) {
            jQuery("#case-" + this.id).attr('value', (parseInt(jQuery("#case-" + this.id).attr('value')) - 1));
            jQuery("#qte-" + jQuery(this).attr('id')).attr('value', parseInt(jQuery("#case-" + jQuery(this).attr('id')).attr('value')));
        }
    });

    jQuery("#btn-ajout-fprod").css('cursor', 'pointer').click(function () {
        jQuery("body").popup({
            popup: {
                removeOnClick: {
                    0: '#close',
                    1: '#continuer'
                }
            },
            ajax: '/js/ajax/update-panier.php',
            data: jQuery("#add-panier").serialize(),
            callback: 'updateProdPanier();'
        });
    });
}

function addFastPanier(idForm) {
    jQuery("body").popup({
        popup: {
            removeOnClick: {
                0: '#btn-close-popup',
                1: '#btn-continue-achat',
                2: '#closebutton',
                3: '#continuer'
            }
        },
        ajax: '/js/ajax/update-panier.php',
        data: jQuery("#" + idForm).serialize(),
        callback: 'updateProdPanier();'
    });
}

function addFastListe(idForm) {
    jQuery("body").popup({
        popup: {
            css: {
                'width': '664px',
                'height': '396px',
                'background': '#FFFFFF'
            },
            removeOnClick: {
                0: '#btn-close-popup',
                1: '#btn-continue-achat',
                2: '#close',
                3: '#continuer'
            }
        },
        ajax: '/js/ajax/update-liste.php',
        data: jQuery("#" + idForm).serialize()
    });
}

function displayAvis() {
    jQuery("#img_note li").each(function (element) {
        element.addEvents({
            'mouseenter': function () {
                var chaine = element.id;
                var pos = chaine.length - 1;
                var num = chaine.substr(pos, 1);
                for (i = 1; i <= num; i++) {
                    $('img_note_' + i).addClass('active');
                }
                $('notation_defaut').setStyle('display', 'none');
                $('notation_nom').setStyle('display', 'block');
                $('notation_nom').innerHTML = $('txt_note_' + num).value;
            },
            'click': function () {
                for (i = 1; i <= 5; i++) {
                    $('img_note_' + i).removeClass('active_click');
                }

                var chaine = element.id;
                var pos = chaine.length - 1;
                var num = chaine.substr(pos, 1);
                for (i = 1; i <= num; i++) {
                    $('img_note_' + i).addClass('active_click');
                }
                $('notation_id').value = num;
                $('notation_nom_nom').value = $('notation_nom').innerHTML;
            },
            'mouseleave': function () {
                for (i = 1; i <= 5; i++) {
                    $('img_note_' + i).removeClass('active');
                }
                if ($('notation_id').value == 0) {
                    $('notation_nom').setStyle('display', 'none');
                    $('notation_defaut').setStyle('display', 'block');
                } else {
                    $('notation_nom').innerHTML = $('notation_nom_nom').value;
                }
            }
        });
    });
}

function initAvis(id) {

    for (i = 1; i <= id; i++) {
        if ($('img_note_' + i)) $('img_note_' + i).addClass('active');
    }
    if ($('notation_defaut')) $('notation_defaut').setStyle('display', 'none');
    if ($('notation_nom')) $('notation_nom').setStyle('display', 'block');
    if ($('notation_nom')) $('notation_nom').innerHTML = $('txt_note_' + id).value;
}

/*
 function AllTemoignage(){

 jQuery(".temoignage").css('cursor', 'pointer').click(function(){
 jQuery("body").popup({
 type: "POST",
 popup:{
 removeOnClick:{
 0:'#close'
 }
 },
 ajax:'/js/ajax/temoignage.php',
 data: 'id='+jQuery(this).attr('id')
 });
 });

 jQuery("#ajouter_un_temoignage").css('cursor', 'pointer').click(function(){
 jQuery("body").popup({
 popup:{
 removeOnClick:{
 0:'#close'
 }
 },
 ajax:'/js/ajax/ajout-temoignage.php'
 });
 });
 }
 */
function updateProdPanier() {
    jQuery.ajax({
        type: "POST",
        url: "/js/ajax/update_prod_panier.php",
        success: function (msg) {
            jQuery('#maj_panier').html(msg);
        }
    });
}

//fonction pour la gestion du bouton moins de la fiche produit
function qteprodmoinsList(produit_Id) {

    if (jQuery('#value-qte-' + produit_Id).val() - 1 < jQuery('#value-qte-' + produit_Id).attr('min')) {
        return;
    }
    if (document.getElementById('value-qte-' + produit_Id).value > 1) {
        document.getElementById('value-qte-' + produit_Id).value = parseInt(document.getElementById('value-qte-' + produit_Id).value) - 1;
    }
}

//fonction pour la gestion du bouton plus de la fiche produit
function qteprodplusList(produit_Id) {
    if (document.getElementById('value-qte-' + produit_Id).value < 99) {
        document.getElementById('value-qte-' + produit_Id).value = parseInt(document.getElementById('value-qte-' + produit_Id).value) + 1;
    }
}

//fonction pour la gestion du bouton moins du panier
function qteprodmoinsPanier(prod_line) {

    if (jQuery('#value-qte-' + prod_line).val() - 1 < jQuery('#value-qte-' + prod_line).attr('min')) {
        alert('Ce produit doit être commandé en quantité ' + jQuery('#value-qte-' + prod_line).attr('min') + ' au minimum');
        return;
    }
    jQuery('#value-qte-' + prod_line).attr('value', jQuery('#value-qte-' + prod_line).attr('value') - 1);
    jQuery('#new-qte-' + prod_line).attr('value', jQuery('#new-qte-' + prod_line).attr('value') - 1);
    jQuery('#form-qte-' + prod_line).submit();
}


function loadPagePanier() {
    jQuery(".btn-qte-plus").css('cursor', 'pointer').click(function () {
        jQuery("#new-" + jQuery(this).attr('id')).attr('value', parseInt(jQuery("#value-" + jQuery(this).attr('id')).attr('value')) + 1);
        jQuery("#form-" + jQuery(this).attr('id')).submit();
    });

    jQuery(".btn-qte-moins").css('cursor', 'pointer').click(function () {
        jQuery("#new-" + jQuery(this).attr('id')).attr('value', parseInt(jQuery("#value-" + jQuery(this).attr('id')).attr('value')) - 1);
        jQuery("#form-" + jQuery(this).attr('id')).submit();
    });

    jQuery(".delete-produit").css('cursor', 'pointer').click(function () {
        jQuery("#form-" + jQuery(this).attr('id')).submit();
    });

    jQuery("#port select").each(function () {
        jQuery(this).change(function () {
            jQuery("#port").submit();
        });
    });

    toolTipLivraison();
}

function loadPageCoord() {

    // jQuery("#new_adresse_livraison_id").change(function(){
    //    jQuery("#flag").attr('value', '4');
    //     jQuery('#coordonnees').submit();
    //  });

    jQuery("#pays_id").change(function () {
        jQuery("#flag").attr('value', '3');
        jQuery('#coordonnees').submit();
    });

    toolTipLivraison();
}

function loadPageRecap() {
    jQuery("#liste-paiement .paiement").css('cursor', 'pointer').click(function () {
        jQuery("#" + jQuery(this).attr('id') + " input:radio").attr('checked', 'checked');
    });

    toolTipLivraison();
}

function toolTipLivraison() {
    jQuery(".infos-livraison").each(function () {
        jQuery(this).css('cursor', 'help');
        jQuery(this).mouseenter(function (event) {

            if (jQuery("#popup-" + jQuery(this).attr('id')).attr('id')) {
                jQuery("#popup-" + jQuery(this).attr('id')).css({
                    'display': 'block',
                    'top': event.pageY + 10,
                    'left': event.pageX + 10
                });
            } else {
                jQuery("<div></div>")
                    .html(jQuery("#" + jQuery(this).attr('id') + "-contenu").html())
                    .attr('id', "popup-" + jQuery(this).attr('id'))
                    .addClass('tool-tip-livraison')
                    .css({
                        'top': event.pageY + 10,
                        'left': event.pageX + 10,
                        'position': 'absolute'
                    })
                    .appendTo("body");
            }
        });

        jQuery(this).mouseleave(function () {
            jQuery("#popup-" + jQuery(this).attr('id')).css('display', 'none');
        });

    });
}

function loadSendMail() {
    event.preventDefault(); // prevent default submit behaviour
    grecaptcha.ready(function () {
        grecaptcha.execute('6Lde6MoZAAAAAPGReidkp2dmMkj2rsPAZRazk3Az', {action: 'submit_contact'}).then(function (token) {
            $('#contact').prepend('<input type="hidden" name="token" value="' + token + '">');
            $('#contact').prepend('<input type="hidden" name="action" value="submit_contact">');
        });
        ;
    });
    jQuery("#contact").submit(function () {
        jQuery.ajax({
            type: "POST",
            url: "/js/ajax/contact.php",
            data: jQuery(this).serialize(),
            success: function (msg) {
                jQuery("#conteneur_contact").html(msg);
            }
        });
        return false;
    });
}

function loadInscNewsletter() {
    jQuery("#newsletter").submit(function () {
        jQuery.ajax({
            type: "POST",
            url: "/js/ajax/addNewsletter.php",
            data: jQuery(this).serialize(),
            success: function (msg) {
                jQuery("#contenu-contact").html(msg);
            }
        });
        return false;
    });
}

/*
 function loadFicheProduit(){
 loadChangeImage();
 loadPopupAttr();

 jQuery(".jqzoom").jqzoom({
 zoomType: 'reverse',
 title: false,
 showPreload: false,
 zoomWidth: 360,
 zoomHeight: 150,
 position: 'right',
 xOffset : 20,
 yOffset : 5
 });
 }
 */
function alterneText(id, text) {
    jQuery(id).focus(function () {
        if (jQuery(this).attr('value') == text) {
            jQuery(this).attr('value', '');
        }
    });
    jQuery(id).blur(function () {
        if (jQuery(this).attr('value') == '') {
            jQuery(this).attr('value', text);
        }
    });
}

function loadMenu() {
    jQuery(".lien_menu_rayon").css('cursor', 'pointer').click(function () {
        jQuery(".lien_menu_rayon").removeClass('lien_menu_rayon_select');
        jQuery(this).addClass('lien_menu_rayon_select');
        jQuery(".sous_menu_rayon").removeClass('sous_menu_rayon_hidden');
        jQuery(".sous_menu_rayon").addClass('sous_menu_rayon_hidden');
        jQuery("#sous-" + jQuery(this).attr('id')).removeClass('sous_menu_rayon_hidden');
    });
}


function loadSlideShow() {

    jQuery("#promo").showcase({
        animation: {
            type: "horizontal-slider",
            stopOnHover: true,
            speed: 600
        },
        navigator: {
            position: "bottom-left",
            css: {
                top: "190px",
                height: "40px",
                "z-index": 1100

            },
            showNumber: true,
            item: {
                css: {
                    height: "30px",
                    "line-height": "28px",
                    width: "50px",
                    color: "#ffffff",
                    "font-weight": "bold",
                    "font-size": "18px",
                    backgroundColor: "transparent",
                    border: "none",
                    background: "url(/styles/images/conteneur/left/btn_slideshow.png) no-repeat",
                    margin: "0px 15px 0px 0px",
                    "text-align": "center",
                    "vertical-align": "middle"
                },
                cssHover: {
                    color: "#333333",
                    backgroundColor: "transparent",
                    border: "none",
                    background: "url(/styles/images/conteneur/left/btn_slideshow_select.png) no-repeat"
                },
                cssSelected: {
                    color: "#333333",
                    backgroundColor: "transparent",
                    border: "none",
                    background: "url(/styles/images/conteneur/left/btn_slideshow_select.png) no-repeat"
                }
            }
        },
        titleBar: {
            enabled: false
        }
    });
}


/***********************/
function in_array(value, tableau) {
    var a = false;
    for (var i = 0; i < tableau.length; i++) {
        if (value == tableau[i]) {
            a = true;
            break;
        }
    }
    return a;
}

/***********************/


function envoyerAmi(produit_id) {
    $("body").popup({
        popup: {
            removeOnClick: {
                0: '#ami_retour',
                1: '#popup_valider',
                2: '#close'
            },

            css: {
                'width': '309px',
                'height': '370px'
            }
        },
        ajax: '/js/ajax/popupEnvoyerAmi.php',
        data: "produit_id=" + produit_id
    });
}

function removePopup() {
    $("#popup").fadeOut(function () {
        $("#popup").remove();
        $("#bg-popup").remove();
        $("select").css('visibility', 'visible');
    });
}

function checkamis(on) {
    $.ajax({
        type: "POST",
        url: '/js/ajax/popupEnvoyerAmi.php',
        data: $('#formamis').serialize(),
        success: function (req) {
            if ($('#popup_ajout_newsletter')) $('#popup_ajout_newsletter').html(req);
        }
    });
}

function deposerAvis(action) {
    var fx = new Fx.Styles('deposer_avis', {duration: 400, wait: false});

    if (action == 'display') {
        fx.start({
            'margin-top': 20
        });
    } else {
        fx.start({
            'margin-top': -500
        });

        //on vide tous les champs du formulaire
        $$("#deposer_av input[class=input_texte]").each(function (inp) {
            inp.value = '';
        });

        $$("#deposer_av textarea").each(function (inp) {
            inp.value = '';
        });

        $$("#deposer_av select").each(function (inp) {
            inp.selectedIndex = 0;
        });

    }
}

function lireAvis(action) {
    var fx = new Fx.Styles('conteneur_lire_avis', {duration: 400, wait: false});

    var content1 = $('lire_avis');
    var c1Height = content1.getSize().scrollSize.y;
    c1Height += 30;


    if (action == 'display') {
        fx.start({
            'height': c1Height
        });
    } else {
        fx.start({
            'height': 0
        });
    }
}

function displayAvis() {
    jQuery("#img_note > li").each(function () {
        jQuery(this).bind('mouseenter', function (element) {
            var chaine = jQuery(this).attr('id');
            var pos = chaine.length - 1;
            var num = chaine.substr(pos, 1);
            for (i = 1; i <= num; i++) {
                jQuery('#img_note_' + i).addClass('active');
            }
            jQuery('#notation_defaut').css({'display': 'none'});
            jQuery('#notation_nom').css({'display': 'inline'});
            jQuery('#notation_nom').html(jQuery('#txt_note_' + num).attr('value'));
        });
        jQuery(this).bind('click', function (element) {
            for (i = 1; i <= 5; i++) {
                jQuery('#img_note_' + i).removeClass('active_click');
            }

            var chaine = jQuery(this).attr('id');
            var pos = chaine.length - 1;
            var num = chaine.substr(pos, 1);

            for (i = 1; i <= num; i++) {
                jQuery('#img_note_' + i).addClass('active_click');
            }
            jQuery('#temoignage_etoile_id').attr('value', num);
            jQuery('#temoignage_etoile_nom_nom').attr('value', jQuery('#notation_nom').html());
        });
        jQuery(this).bind('mouseleave', function (element) {
            for (i = 1; i <= 5; i++) {
                jQuery('#img_note_' + i).removeClass('active');
            }
            if (jQuery('#notation_id').attr('value') == 0) {
                jQuery('#notation_nom').css({'display': 'none'});
                jQuery('#notation_defaut').css({'display': 'block'});
            } else {
                jQuery('#notation_nom').innerHTML = jQuery('#notation_nom_nom').value;
            }
        });
    });
}

function initAvis(id) {

    for (i = 1; i <= id; i++) {
        if ($('img_note_' + i)) $('img_note_' + i).addClass('active');
    }
    if ($('notation_defaut')) $('notation_defaut').setStyle('display', 'none');
    if ($('notation_nom')) $('notation_nom').setStyle('display', 'block');
    if ($('notation_nom')) $('notation_nom').innerHTML = $('txt_note_' + id).value;
}

function sendAvis(idForm) {
    jQuery.ajax(
        {
            url: '/js/ajax/validAvis.php',
            type: 'POST',
            data: jQuery('#' + idForm).serialize(),
            success: function (req) {
                jQuery('#reload_avis').html(req);

            }
        });
}

function loadAdresse(obj) {
    if (obj.checked == true) {
        jQuery('#' + jQuery('.input_radio_civilite:checked').attr('id') + '2').trigger('click');
        jQuery('#' + jQuery('.input_radio_civilite:checked').attr('id') + '2').attr('checked', true);
        jQuery('#adresse_societe2').attr('value', jQuery('#adresse_societe').attr('value'));
        jQuery('#client_nom2').attr('value', jQuery('#client_nom').attr('value'));
        jQuery('#client_prenom2').attr('value', jQuery('#client_prenom').attr('value'));
        jQuery('#adresse_societe2').attr('value', jQuery('#adresse_societe').attr('value'));
        jQuery('#adresse_rue21').attr('value', jQuery('#adresse_rue').attr('value'));
        jQuery('#adresse_rue22').attr('value', jQuery('#adresse_rue2').attr('value'));
        jQuery('#adresse_cp2').attr('value', jQuery('#adresse_cp').attr('value'));
        jQuery('#adresse_ville2').attr('value', jQuery('#adresse_ville').attr('value'));
        jQuery('#pays_id2').attr('value', jQuery('#pays_id').attr('value'));
        jQuery('#adresse_telephone2').attr('value', jQuery('#adresse_telephone').attr('value'));
    }
}

function etre_alerte(produit_id) {
    jQuery("body").popup({
        popup: {
            removeOnClick: {
                0: '#close',
                1: '#popup_valider',
                2: '.close_popup'
            },
            css: {
                'width': '359px',
                'height': '194px'
            }
        },
        ajax: '/js/ajax/popupAlerte.php',
        data: "produit_id=" + produit_id,
        success: function (req) {
            jQuery(popup).fadeIn();
        }
    });
}

function checkAlerte(on) {
    jQuery.ajax({
        type: "POST",
        url: '/js/ajax/popupAlerte.php',
        data: jQuery('#formamis').serialize(),
        success: function (req) {
            if (jQuery('#popup')) jQuery('#popup').html(req);
        }
    });
}

function loadMarque(xy) {
    window.location.href = "/nos-marques/" + xy.value + ".html";
}

function loadPanierWish() {
    jQuery('#save-panier').bind('click', function () {
        jQuery("body").popup({
            popup: {
                css: {
                    'width': '359px',
                    'height': '194px'
                },
                removeOnClick: {
                    0: '#close'
                }
            },
            ajax: '/js/ajax/save-panier.php',
            callback: 'loadActionSavePanier()'
        });
    });
}

function loadActionSavePanier() {
    jQuery('#form-save-panier').submit(function () {
        jQuery(this).fadeOut('fast');
        jQuery.ajax({
            type: "POST",
            url: '/js/ajax/save-panier.php',
            data: jQuery(this).serialize(),
            success: function (rep) {
                var data = JSON.parse(rep);
                if (data.status == 'error') {
                    if (jQuery('.message-erreur-popup').length > 0) {
                        jQuery('.message-erreur-popup').html(data.message);
                    } else {
                        jQuery('<div></div>').hide().addClass('message-erreur-popup').html(data.message).insertBefore('#form-save-panier');
                    }
                    jQuery('.spinner-rupture-prod').hide();
                    jQuery('.message-erreur-popup').fadeIn('fast');
                    jQuery('#form-save-panier').fadeIn('fast');
                } else if (data.status == 'ok') {
                    if (jQuery('.message-erreur-popup').length > 0) {
                        jQuery('.message-erreur-popup').remove();
                    }
                    jQuery('#form-save-panier').remove();
                    jQuery('<div></div>').hide().addClass('message-ok-popup').html(data.message).insertBefore('#form_ami');
                    jQuery('.message-ok-popup').fadeIn('fast');
                }
            }
        });
    });
}


function loadPointMondialRelay() {
    var cp = jQuery('#cp_mondial_relay').attr('value');
    var pays = jQuery('#pays_mondial_relay').attr('value');

    var html = '<div class="wrap-mr"><h3>Lieu de livraison</h3><div id="loader-mr" class="wrap-loader"><img src="/styles/images/ajax-loader.gif"></div></div>';
    jQuery('#col_lieu').html(html);
    jQuery('#col_lieu').css('display', 'block');

    jQuery("body").popup({

        popup: {
            css: {
                'width': '600px',
                'height': '615px'
            },
            removeOnClick: {
                0: '#close',
                1: '#continuer'
            }
        },
        ajax: '/js/ajax/loadPointMondialRelay.php',
        type: "POST",
        data: jQuery('#coordonnees').serialize()
    });

}

function reloadPointMondialRelay() {
    var cp = jQuery('#cp_relay').attr('value');
    var pays = jQuery('#pays_relay').attr('value');

    jQuery.ajax({
        type: "POST",
        url: '/js/ajax/reloadPointMondialRelay.php',
        data: "code_postal=" + cp + "&pays=" + pays,
        success: function (req) {
            jQuery('#list-point-mr').html(req);
        }
    });
}

function popupRelais() {
    jQuery("body").popup({
        popup: {
            css: {
                'width': '600px',
                'height': '615px'
            },
            removeOnClick: {
                0: '#close',
                1: '#continuer'
            }
        },
        ajax: '/js/ajax/popupRelais.php',
        type: "POST",
        data: jQuery('#coordonnees').serialize()
    });
}

function updatePointRelais(addr1, addr2, cp, ville, relay, pays, zename) {
    jQuery('#mondial_relay_addr1').attr('value', addr1);
    jQuery('#mondial_relay_addr2').attr('value', addr2);
    jQuery('#mondial_relay_cp').attr('value', cp);
    jQuery('#mondial_relay_ville').attr('value', ville);

    jQuery('#relais_mondial_relay').attr('value', relay);
    jQuery('#pays_mondial_relay').attr('value', pays);
    if (pays == 'BE') {
        pays = "Belgique";
    } else if (pays == 'ES') {
        pays = "Espagne";
    } else {
        pays = "France";
    }
    jQuery('#adresse_facturation').show();
    var adr = '<dl><dt>Adresse de livraison</dt><dt>' + zename + '</dt><dd>' + addr1 + '</dd><dd>' + addr2 + '</dd><dd>' + cp + ' ' + ville + ' - ' + pays + '</dd><dd class="modifier"><a onclick="loadPointMondialRelay();" href="#null">Modifier cette adresse</a></dd></dl>';
    jQuery('#maj_adresse').html(adr);
}

function colCatAffiner() {
    $('div#col_cat_affiner p.titre_cat a').on('click', function () {
        $(this).next().slideToggle(400);
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function showHideBALines(mode) {
    if (mode == 'show') {
        jQuery('.tr_ba').show();
        jQuery('#link_see_more').hide();
        jQuery('#link_see_less').show();
    } else if (mode == 'hide') {
        jQuery('.tr_ba').hide();
        jQuery('#link_see_more').show();
        jQuery('#link_see_less').hide();
    }
}