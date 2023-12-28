/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}

$(document).ready(function() {

  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function() {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.css("visibility", "visible");
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function() {
      if (menu.css("visibility") === "hidden") {
        menu.css("visibility", "visible");
        nav.show();
        menuIcon.addClass("active");
      } else {
        menu.css("visibility", "hidden");
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function() {
        / * var topDistance = menu.offset().top; * /
        var topDistance = $(window).scrollTop();

        // hide only the navigation links on desktop
        if (!nav.is(":visible") && topDistance < 100) {
          nav.show();
        } else if (nav.is(":visible") && topDistance > 100) {
          nav.hide();
        }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if ( ! $( "#menu-icon" ).is(":visible") && topDistance < 50 ) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (! $( "#menu-icon" ).is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($( "#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function() {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop){
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }
});

// img overlay
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[src^="/img/"]');

  images.forEach(img => {
    // 创建一个新的 <a> 元素
    const link = document.createElement('a');
    link.href = img.src;
    link.className = 'enlarge-image';
    link.style.cursor = 'pointer'; // 可选，使鼠标悬浮在图片上时显示指针光标

    // 将 <img> 插入到 <a> 内，并替换原来的 <img> 位置
    img.parentNode.insertBefore(link, img);
    link.appendChild(img);

    // 为新创建的 <a> 元素添加点击事件监听器
    link.addEventListener('click', function(event) {
      event.preventDefault();

      const overlay = document.createElement('div');
      overlay.className = 'overlay';

      const overlayImage = document.createElement('img');
      overlayImage.src = this.href;
      overlayImage.style.transform = 'scale(1)'
      overlay.appendChild(overlayImage);

      document.body.appendChild(overlay);

      // 添加鼠标滚轮事件监听器
      overlayImage.addEventListener('wheel', function(event) {
        event.preventDefault();
        let scale = event.deltaY < 0 ? 1.1 : 0.9;
        let currentScale = parseFloat(this.style.transform.match(/scale\(([^)]+)\)/)[1]);
        overlayImage.style.transform = `scale(${scale * (parseFloat(overlayImage.style.transform.match(/scale\((.*)\)/)[1]) || 1)})`;
        this.style.transform = `scale(${currentScale * scale})`;
      });

      // 点击覆盖层关闭
      overlay.addEventListener('click', function() {
        this.remove();
      });
    });
  });
});

