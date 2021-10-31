$(document).ready(function () {
    //------------------------------------------------
    // dropdown menu toggle
    //------------------------------------------------

    $(function () {
        $('.minimized').click(function (event) {
            var i_path = $(this).attr('src');
            $('body').append('<div id="overlay"></div><div id="magnify"><img src="' + i_path + '"></div>');
            $('#magnify').css({
                left: ($(document).width() - $('#magnify').outerWidth()) / 2,
                // top: ($(document).height() - $('#magnify').outerHeight())/2 upd: 24.10.2016
                top: ($(window).height() - $('#magnify').outerHeight()) / 2
            });
            $('#overlay, #magnify').fadeIn('fast');
        });

        $('body').on('click', '#overlay', function (event) {
            event.preventDefault();
            $('#overlay, #magnify').fadeOut('fast', function () {
                $('#close-popup, #magnify, #overlay').remove();
            });
        });
    });

    $(".diagonal-descript").each(function (element) {
        var prodWrapper = $(this).closest(".product-wrapper");
        var displayOptions = prodWrapper.find(".button-action-gray.active .p4").text();
        var trimText = displayOptions.substr(displayOptions.length - 3);
        console.log(trimText);
        $(this).text(trimText);
    });


    $('#button-filter').on('click', function () {
        filter = [];
        var curUrl = window.location.href;

        $('input[name^=\'filter\']:checked').each(function (element) {
            filter.push(this.value);
        });
        var splited = curUrl.split("/{");
        location = splited[0] + '/{{ action }}&filter=' + filter.join(',');
    });

    $('.offer-thing').each(function (i, elem) {
        var distance = document.getElementById("first-prod-decript").getBoundingClientRect();
        $('.offer-thing').css({"padding-left": distance.left});
    });


    $('.close-mega-menu').click(function (e) {
        e.preventDefault();
        $('.mega-menu-toggle').addClass("hide");
    });
    $('.close-mega-menu').hover(function () {
        $('.mega-menu-toggle').removeClass("hide");
    });

    var parentCategory = $('.parent-category-name')
    parentCategory.hover(function () {
        $('.child-categories').removeClass("default");
        $('.parent-category-name').removeClass("default");
        $('.child-categories').removeClass("active");
        $('.parent-category-name').removeClass("active");
        var currentId = $(this).attr('id');
        $('#' + currentId).addClass("active");
        $(('.' + currentId)).addClass("active");
    });

    //
    // смена блоков с изображениями для меню. Категории продукты
    //
    $('.child-categories li').hover(function () {
        var cat_id = $(this).data('category_id');
        $('.offer-menu-product').removeClass('current_cat_block');
        $('#offer-menu-prod_block-' + cat_id).addClass('current_cat_block');
    })


    //
    //owl carousel for main page
    //
    $('.banners-wrapper.owl-carousel').owlCarousel({
        loop: true,
        items: 1,

        autoplay: true,
        autoplayTimeout: 8000,
        responsive: {
            1000: {
                dots: true,
            },

            0: {
                dots: false,
            }
        }
    });

    //
    //Progress bar for slider on main page
    //
    var progressDot = $('.banners-wrapper .owl-dot.active span');
    window.setInterval(function () {
        progressDot = $('.banners-wrapper .owl-dot.active span');
    }, 1000);
    $('.slide-main-banner').click(function () {
        progressDot = $('.banners-wrapper .owl-dot.active span')
        progressDot.css({'width': '2px'});
    });
    window.setInterval(function () {
        while (progressDot.width() <= 2) {
            progressDot.css({'width': '3px'});
            progressDot.animate({width: "100%"}, 7000);
        }
        progressDot.css({'width': '2px'});
    }, 1000);

    //
    //Setting background image to to element with class .with-bg
    //
    $('.with-bg').each(function (i, elem) {
        let wrapper = $(elem);
        let backImage = wrapper.attr('data-image');
        let wrapperWidth = wrapper.width();
        return wrapper.css({"background-image": "url\(\"" + backImage + "\"\)", "height": wrapperWidth + "px"});
    });
    if (window.matchMedia('(max-width: 992px)').matches) {
        let moreWidth = $('.our-cases-area .col-lg-4').width();
        // $('.with-color').css({"height": $('.load-more-wrapper').width() + "px"});
        $('.with-color').css({"height": moreWidth + "px"});
    }


    //
    //fix header on scroll to top
    //
    let enabled = 1;
    var lastScrollTop = 0;
    let headerToFix = $('header');
    let headerHeight = headerToFix.height();
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            headerToFix.removeClass('fix');
            $('.wrapper').css({"padding-top": "0px"});
        } else if (st === 0) {
            headerToFix.removeClass('fix');
            $('.wrapper').css({"padding-top": "0px"});
        } else {
            headerToFix.addClass('fix');
            $('.wrapper').css({"padding-top": headerHeight + "px"});
        }
        lastScrollTop = st;
    });

    $('.mega-menu-toggle').each(function (i, elem) {
        let distanceMega = document.getElementById("product-menu-item").getBoundingClientRect();

        let marCont = $('#cont-mar').css("margin-left");
        let marNav = $('.nav-item-menu').css("margin-left");
        let distanceMega2 = parseInt(distanceMega.left, 10) - parseInt(marCont, 10) + parseInt(marNav, 10);
        let paddingLeftBtn = $('header .contact-button').css("padding-left");
        let widthBtn = $('header .contact-button').width();
        let navTopPadding = $('.nav-top').css("padding-right");
        let switcherMargin = $('form#form-language').css("margin-right");

        let allWidth = parseInt(paddingLeftBtn) * 2 + parseInt(widthBtn, 10) + parseInt(navTopPadding, 10) + 10;
        return $('.mega-menu-toggle .row').css({"margin-left": distanceMega2 + "px", "margin-right": allWidth + "px"});
    });


    //
    //Photo changing on single product page
    //
    let miniImage = $('.mini-gallery-images');
    let mainImage = $('.main-image');
    miniImage.click(function (e) {
        e.preventDefault();
        let imageLink = $(this).attr('data-switch');
        mainImage.attr('src', imageLink);
    });

    //
    //owl for main sliders prods on media
    //
    if (window.matchMedia('(max-width: 1000px)').matches) {
        // $('.current-products-list .container .row').owlCarousel({
        //     // onTranslated: function(me) {
        //     //     if($('.current-products-list.business-solution .owl-stage .owl-item:nth-child(1)').hasClass('active')){
        //     //        $('.current-products-list.business-solution .owl-stage .owl-item:nth-child(1)').css('margin-left', '0');
        //     //     };
        //     //     if($('.current-products-list.business-solution .owl-stage .owl-item:nth-child(2)').hasClass('active')){
        //     //         $('.current-products-list.business-solution .owl-stage .owl-item:nth-child(1)').css('margin-left', 'calc(84px + (100vw - 320px))');
        //     //     };
        //     //     if($('.current-products-list.business-solution .owl-stage .owl-item:nth-child(3)').hasClass('active')){
        //     //         $('.current-products-list.business-solution .owl-stage .owl-item:nth-child(1)').css('margin-left', 'calc((84px + ((100vw - 320px) * 0.975)) * 2)');
        //     //     };
        //     //     if($('.current-products-list.business-solution .owl-stage .owl-item:nth-child(4)').hasClass('active')){
        //     //         $('.current-products-list.business-solution .owl-stage .owl-item:nth-child(1)').css('margin-left', 'calc((84px + ((100vw - 320px) * 0.967)) * 3)');
        //     //     };
        //     // },
        //     loop: false,
        //     stagePadding: 0,
        //     nav: false,
        //     dots: false,
        //     responsive: {
        //         768: {
        //             items: 3,
        //             margin: 10,
        //         },
        //         0: {
        //             items: 1,
        //             margin: 20,
        //         },
        //     }
        // });
        // console.log('new class');


        var $carousel = $('.current-products-list .container .row');

        // $carousel.slick("slickPrev");
        var settings = {
            dots: false,
            arrows: false,
            infinite: false,
            slide: '.current-products-list .col-xl-3',
            // slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: '645px',
            centerMode: true,
            // centerPadding: '120px',
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        // slidesToScroll: 1,
                        centerPadding: '560px',
                    }
                },

                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        // slidesToScroll: 1,
                        centerPadding: '460px',
                    }
                },

                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        // slidesToScroll: 1,
                        centerPadding: '340px',
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 2,
                        centerPadding: '260px',
                    }
                },

                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        // slidesToScroll: 1,
                        centerPadding: '140px',
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 1,
                        // slidesToScroll: 1,
                        centerPadding: '80px',
                    }
                }


            ]

        };

        function setSlideVisibility() {
            //Find the visible slides i.e. where aria-hidden="false"
            var visibleSlides = $carousel.find('.current-products-list .col-xl-3[aria-hidden="false"]');
            //Make sure all of the visible slides have an opacity of 1
            $(visibleSlides).each(function () {
                $(this).css('opacity', 1);
            });

            //Set the opacity of the first and last partial slides.
            $(visibleSlides).first().prev().css('opacity', 0);
        }

        $carousel.slick(settings);
        $carousel.slick('slickGoTo', 0);
        setSlideVisibility();

        $carousel.on('afterChange', function () {
            setSlideVisibility();
        });
    }


    //
    //owl for news slider on media
    //
    if (window.matchMedia('(max-width: 992px)').matches) {
        $('.news-media .container .row').owlCarousel({
            loop: false,
            nav: false,
            dots: false,
            margin: 20,
            items: 1,
            responsive: {
                992: {
                    items: 3,
                },
                768: {
                    items: 3,
                },
                0: {
                    items: 1,
                    stagePadding: 40,
                },
            }


        });
    }

    if (window.matchMedia('(max-width: 768px)').matches) {


        $('.gallery-mobile-image').owlCarousel({
            loop: false,
            nav: false,
            dots: true,
            items: 1,
            margin: 0,

        });

        $('.other-models .container .row').owlCarousel({
            loop: false,

            nav: false,
            dots: false,
            responsive: {
                768: {
                    items: 3,
                    margin: 20,
                },

                0: {
                    items: 1,
                    margin: 20,
                },

            }
        });

        $('.news-tags').owlCarousel({
            loop: false,
            nav: false,
            dots: false,
            items: 2,
            margin: 0,
            stagePadding: 10

        });
        $('.news-years').owlCarousel({
            loop: false,
            nav: false,
            dots: false,
            items: 3,
            margin: 0,
            stagePadding: 10

        });
    }

    // $('.current-products-list.business-solution .owl-stage .owl-item').on('change', function() {
    //     console.log('new class');
    // });

    //
    //Mobile Menu
    //
    let menuBurgerButton = $('.click-to-action');
    let menuBurgerOverlay = $('.overlay-mobile-menu');
    let menuBurgerWrapper = $('.menu-mobile-burger');
    menuBurgerButton.click(function (e) {
        e.preventDefault();
        $('.mobile-menu-wrapper').css({"top": headerHeight + "px"});
        menuBurgerWrapper.toggleClass("open");
        headerToFix.toggleClass(("fix-mobile"));
    });
    menuBurgerOverlay.click(function (e) {
        e.preventDefault();
        menuBurgerWrapper.removeClass("open");
        headerToFix.removeClass(("fix-mobile"));
    });

    //
    //open filter checkboxes
    //
    $('.filter-property-list').click(function () {
        $(this).toggleClass("hide");
    });
    //
    //toggled filter
    //
    $(".toggle-mobile-filter").click(function () {
        $(".filter-left-side").toggleClass("show");
    })

    $('#form-language .language-select').on('click', function (e) {
        e.preventDefault();

        $('#form-language input[name=\'code\']').val($(this).attr('name'));

        $('#form-language').submit();
    });
    $('.display-options .test:not(:last-child)').remove();
    $('.option-rash-wrapper .option-rash:not(:last-child)').remove();
    $('.option-size-wrapper .option-size:not(:first-child)').remove();


    $('.display-options .test a').click(function (e) {
        e.preventDefault();
        // let parentWrapper = $this.closest('.product-wrapper')
        let textButton = $(this).text();
        let prodId = $(this).attr('data-prod');
        let idToShow = $(this).attr('id');
        $('.product-wrapper.' + prodId + ' .display-options .test a').removeClass('active');
        $(this).addClass("active");

        $('.product-wrapper.' + prodId + ' .option-rash-wrapper .single-char').removeClass('show');
        $('.product-wrapper.' + prodId + ' .single-char.diagonal .p3').text(textButton + '');
        $('.product-wrapper.' + prodId + ' .option-rash-wrapper .single-char').removeClass('hide');
        $('.product-wrapper.' + prodId + ' .option-rash-wrapper .single-char.' + idToShow).addClass('show');
        $('.product-wrapper.' + prodId + ' .option-rash-wrapper .single-char').addClass('hide');

        $('.product-wrapper.' + prodId + ' .option-size-wrapper .single-char').removeClass('show');
        $('.product-wrapper.' + prodId + ' .option-size-wrapper .single-char').removeClass('hide');
        $('.product-wrapper.' + prodId + ' .option-size-wrapper .single-char.' + idToShow).addClass('show');
        $('.product-wrapper.' + prodId + ' .option-size-wrapper .single-char').addClass('hide');
    });

    $('.character-options a').click(function (e) {
        e.preventDefault();
        let optionName = $(this).attr('data-option');
        let optionChangeText = $(this).text();
        $('.character-options.' + optionName + ' a').removeClass("active");
        $(this).addClass("active");
        $('.single-tech-char .p3.' + optionName).text(optionChangeText);
        $(".form-group.hidden #chosen-diag").val($('.character-options.Диагональ .button-action-gray.active p').text());
        $(".form-group.hidden #chosen-side").val($('.character-options.Стороны .button-action-gray.active p').text());

    });

    $('.clients-logo .button-action-yellow').click(function (e) {
        e.preventDefault();
        $('.clients-logo.toggle-on-click').toggleClass('show');
        $('.clients-logo.opened .button-action-yellow').toggleClass('hide');
        $('.clients-logo .button_connect_toggle').toggleClass('hide');
    })
    $('.clients-thanks .button-action-yellow').click(function (e) {
        e.preventDefault();
        $('.clients-thanks.toggle-on-click').toggleClass('show');
        $('.clients-thanks.opened .button-action-yellow').toggleClass('hide');
        $('.clients-thanks .button_connect_toggle').toggleClass('hide');

    })

    $('header .contact-button, .leave-request, .all-cases-btn .button-action-yellow').click(function (e) {
        // e.preventDefault();
        var curUrl = window.location.href;
        if (curUrl.includes('footer')) {
            var urlFoot = curUrl;
        } else {
            var urlFoot = curUrl + '#footer';
        }
        $(this).attr('href', urlFoot);

    });

    $('.prod-cat-mob').click(function (e) {
        e.preventDefault();
        $('.prod-child').toggleClass('show');
    });

    $('.checkbox-click').on('click', function () {
        filter = [];
        var curUrl = window.location.href;

        $('input[name^=\'filter\']:checked').each(function (element) {
            filter.push(this.value);
        });
        var splited = curUrl.split("/{");
        location = splited[0] + '/{{ action }}&filter=' + filter.join(',');

    });

    $(".phantom-validation").click(function (e) {
        e.preventDefault();
        var formHold = $(".contact-validation-active");
        var inputHold = $(".form-control");
        var counter = 0;
        var enquiry = $("#input-enquiry");
        var enquiryText = enquiry.val();
        if (enquiryText.length >= 10) {
            enquiry.removeClass("wrong");
            counter++;
        }
        else {
            enquiry.addClass("wrong");
            $(".contact-about-project").addClass("wrong");

        }
        formHold.find(".form-control").each(function () {

            value = $(this).val();

            if (value.length != 0) {
                // $("#place_order").click();
                // console.log("usss")
                $(this).removeClass("wrong");
                counter++;
                if ($("#input-email").val().indexOf('@') > -1) {
                    $(this).removeClass("wrong");
                    counter++;
                }
                // var phonIn = $("#input-phone").val().replace(/\s+/g, ' ').trim()
                var phonIn = $("#input-phone").val();
                phonIn = phonIn.replace(/\s/g, '');


                if (phonIn.length == 10 && phonIn.match(/^\d+$/)) {
                    $(this).removeClass("wrong");
                    counter++;
                }
                else {
                    $(this).addClass("wrong");
                }
            }

            else {
                $(this).addClass("wrong");
            }


        });
        if (counter == 16) {
            $(".submit-area .button-action-yellow").click();
        }
        console.log(counter);
    });
    $(function () {
        $(".form-group.hidden #page-name").val($('title').text());
        $(".form-group.hidden #chosen-lang").val($('.nav-item-menu.language-select.current').text().substring(0, 2));
        if ($(".breadcrumbs-area").hasClass("product-page")) {
            $(".form-group.hidden #prod-name").val($('.header-single-product h1').text());
            $(".form-group.hidden #prod-size").val($('.p3.Размер').first().text());
            $(".form-group.hidden #chosen-diag").val($('.character-options.Диагональ .button-action-gray.active p').text());
            $(".form-group.hidden #chosen-side").val($('.character-options.Стороны .button-action-gray.active p').text());
        }
    });


    // let imageUrl = $('.banner-single-case').attr('data-image');
    // let stripImageUrl = imageUrl.replace('cache/', '');
    // let secstripImageUrl = stripImageUrl.replace('-74x74', '');
    // $('.banner-single-case').attr('data-image', secstripImageUrl);
    // return $('.banner-single-case').css({"background-image": "url\(\"" + secstripImageUrl + "\"\)",});


});