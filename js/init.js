/***********
GENERALS
***********/
$(window).resize(function()
{
	windows_(); 
	font_();
	menu_top();
});

$(window).scroll(function()
{
	menu_top();
});

function font_()
{
	var width_ = $(window).width();

	i = 17;

	if(width_ > 450)
	{
		i = 13;
	}

	if(width_ > 500)
	{
		i = 12;
	}

	if(width_ > 600)
	{
		i = 10;
	}

	if(width_ > 700)
	{
		i = 9;
	}

	if (width_ > 992 && type == "landscape")
	{
		var i = 5.5;
	}

	var font_ = width_ * i / 400;
	$("body").css("font-size", font_+"px"); 
}

var type = "";

function windows_()
{
	var windows_w = $(window).width();
	var windows_h = $(window).height();

	var n_windows_w = (windows_w * 0.1) + windows_w;
	if (n_windows_w < windows_h)
	{
		$("body").removeClass('landscape');
		$("body").addClass('portrait');
		type = 'portrait';
	}
	else
	{
		$("body").removeClass('portrait');
		$("body").addClass('landscape');
		type = 'landscape';
	}
}

setTimeout(function(){ windows_(); }, 50);
setTimeout(function(){ font_(); }, 100);

/**************
MENU 
**************/
$(document).on('click', '.hamburguer img, .cross img', function()
{
	var container = $('.menu .container');

	container.toggle();
});

$('.page-scroll').bind('click', function(e) 
{
	e.preventDefault();
	
	var t 		 = $(this);
	var width_ = $(window).width();
	var menu   = $('.menu .container');
	
	$("body, html").animate({ scrollTop: $(t.attr('href')).offset().top }, 1000);

	if(width_ < 993)
	{
		menu.hide();
	}
});

$(document).on('click', '.selector-language .option', function(e) 
{
	e.preventDefault();

	url = $(this).data("value");
	window.location.href = url;
});

$('select').niceSelect();

function menu_top()
{
	var scrollTop = $(window).scrollTop();
	var menu 			= $('.menu');

	if(scrollTop <= 0)
	{
		menu.removeClass('scrolling');
	}
	else
	{
		menu.addClass('scrolling');
	}
}

/*******************
 MODAL VIDEO
*******************/
var video_proportion = 1.76900;
var tag_area_video   = ".modal-video .modal-container";

function redimention_video()
{
	var width_  = $(tag_area_video).width();
	var height_ = width_ / video_proportion;

	$(tag_area_video).height(height_);
}

$(document).on('click', '.open-modal-video', function(e)
{
	e.preventDefault();

	var video 		= $(this).attr('data-video');
	var container = $('.modal-video .modal-container');
	var modal     = $('.modal-video');
	var body  		= $('body');

	if(video)
	{
		body.addClass('overflow-hidden');
		modal.addClass('active');
		container.append('<iframe id="video_iframe" src="'+video+'" allowfullscreen></iframe>');

		redimention_video();
	} 
});

$(document).on('click', '.close-modal-video', function(e)
{
	e.preventDefault();

	var modal  = $('.modal-video');
	var iframe = modal.find('iframe');
	var body   = $('body');

	iframe.remove();
	modal.removeClass('active');
	body.removeClass('overflow-hidden');
});

/*******************
 VERSION
*******************/
setTimeout(() => 
{
	var urlVersion = "/version.php";
	
	function version()
	{
		var myUlr = urlVersion+'?v='+getRandomArbitrary(100, 10000);
		$.ajax({
			url: myUlr,
			success: function(res) 
			{
				try
				{
					res =  JSON.parse(res);
					if (res.version != version_ && res != "" && res != undefined)
						location.reload(true);
				}
				catch(e)
				{
					console.log("version  failed");
				}
			},
			error: function() 
			{
				console.log("No se ha podido obtener la información");
			}
		});
	}

	function getRandomArbitrary(min, max) 
	{
		return Math.random() * (max - min) + min;
	}

	version();
}, 1000);


/*******************
 VALIDACION
*******************/
$(document).on('click', '.send-form', function(e)
{
	e.preventDefault();

	var email = $('#email input').val();

	if(!object_exist(email))
	{
		$('#error .error-name').css({ display: 'block' });
	}
	else 
	{
		$('#error .error-name').hide();
	}

	if(object_exist(email))
	{
		$.ajax({
			// url: '/mailchip.php',
			url: 'http://devweb.elreyjesus.org/rmnt-yth/mailchip.php',
			type: 'post',
			data: { email: email, lang: 'en' },
			beforeSend: function()
			{
				$('.error').hide();
			},
			success: function(response)
			{
				try 
				{
					var resp = JSON.parse(response);
	
					if(object_exist(resp))
					{
						if(resp.status == 'subscribed')
						{
							$('#error .error.success').css({ display: 'block' });
						} 
						else if (resp.title == 'Member Exists')
						{
							$('#error .error-exist').css({ display: 'block' });
						}
						else 
						{
							$('#error .error-register').css({ display: 'block' });
						}
					}
				} 
				catch (error) 
				{
					$('#error .error-register').css({ display: 'block' });
				}
			},
			error: function()
			{
				$('#error .error-register').css({ display: 'block' });
			}
		});
	}
});

function object_exist(value)
{
	if (value != undefined && value != "" && value != "null")
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*****************
	MODAL IMAGE
****************/
$(document).on('click', '#gallery .images .image-container', function()
{
	var modal = $('.modal-preview');
	var image = $(this).attr('data-image');
	var img   = $('.modal-preview .modal-container .modal-content img');

	modal.addClass('active');
	img.attr('src', image);
});

$(document).on('click', '.close-modal-img, .modal-preview .modal-layer', function()
{
	var modal = $('.modal-preview');

	modal.removeClass('active')
});


/*****************
  SLICK
****************/
$(document).ready(function()
{
	$('#gallery .images').slick(
	{
		slidesToShow: 1,
		slidesToScroll:1,
		adaptiveHeight: true,
		prevArrow: '<span class="arrow prev"><img src="assets/svg/arrow-back.svg"></span>',
		nextArrow: '<span class="arrow next"><img src="assets/svg/arrow-back.svg"></span>',
		autoplay: true,
		autoplaySpeed: 5000,
		responsive: 
		[
			{
				breakpoint: 992,
				settings: 
				{
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 600,
				settings: 
				{
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
});
