$(document).ready(function () {
  $('.slider').slick({
    autoplay: true
  })

  $('.testimonials__slider').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    autoplaySpeed: 30000,
    slidesToShow: 1,
    autoplay: true,
    adaptiveHeight: true
  })
})
