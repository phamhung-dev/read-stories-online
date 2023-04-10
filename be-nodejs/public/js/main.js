(function ($) {
  "use strict"

  //>>>>>>> Preloader >>>>>>>
  $(window).on('load', function () {
    $('#preloader-active').delay(450).fadeOut('slow');
    $('body').delay(450).css({
      'overflow': 'visible'
    });
  });


  //>>>>>>> acmeticker >>>>>>>
  jQuery(document).ready(function ($) {
    $('.my-news-ticker').AcmeTicker({
      type: 'marquee',
      /*horizontal/horizontal/Marquee/type*/
      direction: 'left',
      /*up/down/left/right*/
      speed: 0.09,
      /*true/false/number*/ /*For vertical/horizontal 600*/ /*For marquee 0.05*/ /*For typewriter 50*/
      controls: {
        toggle: $('.acme-news-ticker-pause'),
        /*Can be used for horizontal/horizontal/typewriter*/ /*not work for marquee*/
      }
    });
  })


  //>>>>>>> slick Nav >>>>>>>
  // mobile_menu
  var menu = $('ul#navigation');
  if (menu.length) {
    menu.slicknav({
      prependTo: ".mobile_menu",
      closedSymbol: '+',
      openedSymbol: '-'
    });
  };
  
  //>>>>>>> Slick Slider >>>>>>>

  // trending-top
  $('.trending-top').slick({
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    loop: true,
    fade: true,

  });

  // trending-bottom
  $('.trending-bottom-slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    initialSlide: 3,
    loop: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]

  });

//>>>>>>> Show Modal >>>>>>>
  $('.js-show-modal1').on('click', function (e) {
    e.preventDefault();
    $('.js-modal1').addClass('show-modal1');
  });

  $('.js-hide-modal1').on('click', function () {
    $('.js-modal1').removeClass('show-modal1');
  });

  $('.js-addwish-b2').on('click', function (e) {
    e.preventDefault();
  });

  $('.js-addwish-b2').each(function () {
    var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
    $(this).on('click', function () {
      swal(nameProduct, "is added to wishlist !", "success");

      $(this).addClass('js-addedwish-b2');
      $(this).off('click');
    });
  });

  $('.js-addwish-detail').each(function () {
    var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();

    $(this).on('click', function () {
      swal(nameProduct, "is added to wishlist !", "success");

      $(this).addClass('js-addedwish-detail');
      $(this).off('click');
    });
  });


//>>>>>>> Custom Sticky Menu >>>>>>>

  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 245) {
      $(".header-sticky ").removeClass("sticky-bar");
    } else {
      $(".header-sticky").addClass("sticky-bar");
    }
  });

// Show img flex
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 245) {
      $(".header-flex").removeClass("sticky-flex");
    } else {
      $(".header-flex").addClass("sticky-flex");
    }
  });

  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 245) {
      $(".header-sticky").removeClass("sticky");
    } else {
      $(".header-sticky").addClass("sticky");
    }
  });


  //>>>>>>> Show / hide modal search >>>>>>>
  $('.js-show-modal-search').on('click', function () {
    $('.modal-search-header').addClass('show-modal-search');
    $(this).css('opacity', '0');
  });

  $('.js-hide-modal-search').on('click', function () {
    $('.modal-search-header').removeClass('show-modal-search');
    $('.js-show-modal-search').css('opacity', '1');
  });

  $('.container-search-header').on('click', function (e) {
    e.stopPropagation();
  });

  //>>>>>>> scrollUp >>>>>>>
  $.scrollUp({
    scrollName: 'scrollUp', // Element ID
    topDistance: '300', // Distance from top before showing element (px)
    topSpeed: 300, // Speed back to top (ms)
    animationInSpeed: 200, // Animation in speed (ms)
    animationOutSpeed: 200, // Animation out speed (ms)
    scrollText: '<i class="fa-solid  fa-circle-arrow-up fa-bounce"  style=" --fa-bounce-start-scale-x: 1; --fa-bounce-start-scale-y: 1; --fa-bounce-jump-scale-x: 1; --fa-bounce-jump-scale-y: 1; --fa-bounce-land-scale-x: 1; --fa-bounce-land-scale-y: 1; "></i>', // Text for element
    activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
  });

  
  //>>>>>>> data-background >>>>>>>
  $("[data-background]").each(function () {
    $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
  });


  //>>>>>>> magnificPopup >>>>>>>
  var popUp = $('.single_gallery_part, .img-pop-up');
  if (popUp.length) {
    popUp.magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  }

//>>>>>>> Sakura Flower >>>>>>>
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback, element) {
        window.setTimeout(callback, 10 / 10);
      };
  })();

  function random(n) {
    return Math.floor(Math.random() * n) + 1;
  }

  function Canvas(elm) {
    this.elm = elm;
    this.canvasCtx = this.elm.getContext('2d');
    this.width = this.elm.width;
    this.height = this.elm.height;
    this.children = new Array();

    this.init();
  }
  Canvas.prototype = {
    resize: function (booleam) {
      this.width = this.elm.width = booleam ? this.elm.parentNode.clientWidth * 2 : window.innerWidth * 2;
      this.height = this.elm.height = booleam ? this.elm.parentNode.clientHeight * 2 : window.innerHeight * 2;
    },
    clear: function () {
      this.canvasCtx.clearRect(0, 0, this.width, this.height);
    },
    addChild: function (child) {
      this.children.push(child);
    },
    removeChild: function (num) {
      this.children.splice(num, 1);
    },
    rendering: function () {
      this.clear();

      var limit = this.children.length;
      for (var i = limit - 1; i >= 0; i--) {
        var child = this.children[i];
        if (child.draw(this.canvasCtx)) {
          this.removeChild(i);
        }
      }
    },
    createSakura: function (num, x1, y1, x2, y2) {
      for (var i = 0; i < num; i++) {
        var x_pos = Math.floor(Math.random() * (x2 - x1)) + x1;
        var y_pos = Math.floor(Math.random() * (y2 - y1)) + y1;
        this.addChild(new Sakura(
          this,
          x_pos,
          y_pos,
          Math.random() + 0.5, {
            x: random(360),
            y: random(360),
            z: random(360)
          }, {
            x: random(10),
            y: random(10),
            z: random(10)
          },
          random(5)
        ));
      }
    },
    animate: function () {
      var _this = this;

      if (Math.random() > 0.15 && this.children.length < 30) {
        this.createSakura(1, 1, 1, this.width, 0);
      }

      this.rendering();

      window.requestAnimationFrame(function () {
        _this.animate();
      });
    },
    init: function () {
      this.resize(true);
      this.animate();
    }
  }

  function Sakura(parent, x, y, scale, direction, rotate, wind) {
    this.parent = parent;
    this.x_pos = x;
    this.y_pos = y;
    this.scale = scale;
    this.direction = direction;
    this.rotate = rotate;
    this.wind = wind;
    this.gr = 5;
    this.phase = 0;
  }
  Sakura.prototype = {
    draw: function (ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(this.x_pos, this.y_pos);

      ctx.rotate(this.direction.y / 100 * Math.PI);
      ctx.scale(this.scale, this.scale);

      var grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 10);
      grad.addColorStop(0, '#fbe0ef');
      grad.addColorStop(0.1, '#f8c1d5');
      grad.addColorStop(1, '#f3d3e2');
      ctx.fillStyle = grad;

      var x_rad = Math.cos(this.direction.x * Math.PI / 100);
      var z_rad = Math.cos(this.direction.z * Math.PI / 100);
      ctx.moveTo(-6 * z_rad, -10 * x_rad);
      ctx.bezierCurveTo(-10 * z_rad, 0 * x_rad, -5 * z_rad, 10 * x_rad, 0 * z_rad, 10 * x_rad);
      ctx.bezierCurveTo(5 * z_rad, 10 * x_rad, 10 * z_rad, 0 * x_rad, 6 * z_rad, -10 * x_rad);
      ctx.bezierCurveTo(0 * z_rad, -10 * x_rad, 0 * z_rad, -7 * x_rad, 0 * z_rad, -5 * x_rad);
      ctx.bezierCurveTo(0 * z_rad, -7 * x_rad, 0 * z_rad, -10 * x_rad, -6 * z_rad, -10 * x_rad);
      ctx.fill();
      ctx.restore();

      return this.moveSakura();
    },
    moveSakura: function () {
      var move_y;
      if (this.phase === 0) {
        var ground = 1 + (this.scale / 10);
        if (this.y_pos > this.parent.height * ground) {
          this.gr = 0;
          this.wind = 0;
          this.rotate.x = 0;
          this.rotate.y = 0;
          this.rotate.z = 0;
          this.phase = 1;
          this.parent.fallenSakura++;
        }
      } else if (this.phase === 2) {
        if (this.gr > -3) this.gr += this.gr / 10;
        move_y = (this.gr * this.scale);
      }

      this.y_pos = this.y_pos + (this.gr * this.scale) / 2;
      this.x_pos = this.x_pos + this.wind / 2;
      this.direction.x += this.rotate.x / 2;
      this.direction.y += this.rotate.y / 2;
      this.direction.z += this.rotate.z / 2;

      if (this.x_pos > this.parent.width) return true;
      return this.y_pos > this.parent.height ? true : false;
    }
  }

  var canvas = document.getElementById("sakura");
  var SakuraCanvas = new Canvas(canvas);



  //>>>>>>> star-rating >>>>>>>
  var starrating = new StarRating('.star-rating', {
    stars: function (el, item, index) {
      el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect class="gl-star-full" width="19" height="19" x="2.5" y="2.5"/><polygon fill="#FFF" points="12 5.375 13.646 10.417 19 10.417 14.665 13.556 16.313 18.625 11.995 15.476 7.688 18.583 9.333 13.542 5 10.417 10.354 10.417"/></svg>';
    },
  });









})(jQuery);

$('#btn_login').click(function(){
  var email = $('#email').val();
  var password = $('#password').val();
  var remember = $('#remember').val();
  $.ajax({
      url: '/api/authenticate/login',
      type: 'POST',
      data: {
          email: email,
          password: password
      },
      success: function(response) {
          if(remember == 'on'){
              localStorage.setItem('email', email);
              localStorage.setItem('password', password);
          }
          else{
              localStorage.removeItem('email');
              localStorage.removeItem('password');
          }
          document.cookie = `token=${response.data.token}`;
          swal("Success!", "Login successfully", "success");
          setTimeout(function(){
              window.location.href = '/';
          }, 2000);
      },
      error: function(response) {
          swal("Error!", response.responseJSON.data.content, "error");
      }
  });
});

$(document).ready(async function(){
  var email = localStorage.getItem('email');
  var password = localStorage.getItem('password');
  if(email && password){
      $('#email').val(email);
      $('#password').val(password);
      $('#remember').attr('checked', true);
  }
  if(readCookie('token')){
      await fetch('/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': readCookie('token')
          }
      }).then(response => {
          if(response.ok){
            return response.json();
          }
          else{
            throw new Error('User not logged in');
          }
      }).then(response => {
        $('#nav_login').remove();
        $('#nav_profile').append(`<a class="nav-link" href="/user/profile">${response.data.name}</a>`);          
      }).catch(error => {
        $('#nav_logout').remove();
        console.log(error);
      });
  }
  else{
      $('#nav_logout').remove();
      $('#nav_profile').remove();
  }
});
$('#btn_logout').click(async function(){
  await fetch('/api/authenticate/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': readCookie('token')
        }
    }).then(response => {
      if(response.ok){
        return response.json();
      }
      else{
        throw new Error(response.statusText);
      }
    })
    .then(response => {
      eraseCookie('token');
      swal("Success!", response.data.content, "success");
      setTimeout(function(){
          window.location.href = '/';
      }, 2000);
    }).catch(error => {
      swal("Error!", error.toString(), "error");
    });
});
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = `${name}=null`;
}
