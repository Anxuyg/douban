 //榜单页面
 var top250 = {
     init: function() {
         this.$element = $('#top250')
         this.isLoading = false
         this.bind.index = 0
         this.isFinish = false //判断数据是否完成
         this.bind()
         this.start()
     },
     bind: function() {
         var _this = this
         this.$element.scroll(function() {
             _this.start()
         })
     },
     start: function() { //start是用来获取数据再渲染
         var _this = this
         this.getDate(function(data) {
             _this.render(data) //异步？
         })
     },
     getDate: function(callback) {
         var _this = this
         if (_this.isLoading) return;
         _this.isLoading = true
         _this.$element.find('.loading').show()
         $.ajax({
             url: 'https://api.douban.com/v2/movie/top250',
             data: {
                 start: _this.index || 0
             },
             dataType: 'jsonp'
         }).done(function(ret) {
             console.log(ret)
             _this.index += 20
             if (_this.index >= ret.total) {
                 _this.isFinish = true
             }
             callback && callback(ret)
         }).fail(function() {
             console.log('数据异常')
         }).always(function() {
             _this.isLoading = false
             _this.$element.find('.loading').hide()
         })
     },
     render: function(data) {
         var _this = this
         data.subjects.forEach(function(movie) {
             var tpl = `<div class="item ling">
            <a href="#">
                <div class="cover">
                    <img src="https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg" alt="">
                </div>
                <div class="detail">
                    <h2>霸王别姬</h2>
                    <div class="extra"><span class="score">9.3分 </span>/ 1000收藏 </div>
                    <div class="extra">1994 / 剧情、爱情</div>
                    <div class="extra">导演：张艺谋</div>
                    <div class="extra">主演：张艺谋、张艺谋、张艺谋</div>
                </div>
            </a>
        </div>`
             var $node = $(tpl)
                 /*匹配ajax跨域的数据中的信息，与html中的类相对应。*/
             $node.find('a').attr('href', movie.alt)
             $node.find('.cover img').attr('src', movie.images.medium)
             $node.find('.detail h2').text(movie.title)
             $node.find('.score').text(movie.rating.average)
             $node.find('.collect').text(movie.collect_count)
             $node.find('.year').text(movie.year)
             $node.find('.type').text(movie.genres.join('/'))
             $node.find('.director').text(function() {
                 var directorsAll = []
                     /*directors是数据中的参数*/
                 movie.directors.forEach(function(item) {
                     directorsAll.push(item.name)
                 })
                 return directorsAll.join('、')
             })
             $node.find('.actor').text(function() {
                 var actorAll = []
                 movie.casts.forEach(function(item) {
                     actorAll.push(item.name)
                 })
                 return actorAll.join('、')
             })
             _this.$element.find('.container').append($node)
         })
     },
     isToBottom: function() {
         return this.$element.find('.container') <= this.$element.height() + this.$element.scrollTop() + 10
     }
 }

 //北美页面
 var usbox = {
     init: function() {
         this.$element = $('#beimei')
         this.start()
     },
     start: function() {
         var _this = this
         this.getDate(function(data) {
             _this.render(data) //异步？
         })
     },
     getDate: function(callback) {
         var _this = this
         if (_this.isLoading) return;
         _this.isLoading = true
         _this.$element.find('.loading').show()
         $.ajax({
             url: 'https://api.douban.com/v2/movie/us_box',
             dataType: 'jsonp'
         }).done(function(ret) {
             callback && callback(ret)
         }).fail(function() {
             console.log('数据异常')
         }).always(function() {
             _this.$element.find('.loading').hide()
         })
     },
     render: function(data) {
         var _this = this
         console.log(data)
         data.subjects.forEach(function(movie) {
             movie = movie.subject
             var tpl = `<div class="item ling">
           <a href="#">
               <div class="cover">
                   <img src="https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg" alt="">
               </div>
               <div class="detail">
                   <h2>霸王别姬</h2>
                   <div class="extra"><span class="score">9.3分 </span>/ 1000收藏 </div>
                   <div class="extra">1994 / 剧情、爱情</div>
                   <div class="extra">导演：张艺谋</div>
                   <div class="extra">主演：张艺谋、张艺谋、张艺谋</div>
               </div>
           </a>
       </div>`
             var $node = $(tpl)
                 /*匹配ajax跨域的数据中的信息，与html中的类相对应。*/
             $node.find('a').attr('href', movie.alt)
             $node.find('.cover img').attr('src', movie.images.medium)
             $node.find('.detail h2').text(movie.title)
             $node.find('.score').text(movie.rating.average)
             $node.find('.collect').text(movie.collect_count)
             $node.find('.year').text(movie.year)
             $node.find('.type').text(movie.genres.join('/'))
             $node.find('.director').text(function() {
                 var directorsAll = []
                     /*directors是数据中的参数*/
                 movie.directors.forEach(function(item) {
                     directorsAll.push(item.name)
                 })
                 return directorsAll.join('、')
             })
             $node.find('.actor').text(function() {
                 var actorAll = []
                 movie.casts.forEach(function(item) {
                     actorAll.push(item.name)
                 })
                 return actorAll.join('、')
             })
             _this.$element.find('.container').append($node)
         })
     },
 }



 //搜索页面
 var search = {
     init: function() {
         this.$element = $('#search')
         this.keyword = '' //关键字
         this.bind()
         this.start()
     },
     bind: function() {
         var _this = this
         this.$element.find('.btn').click(function() {
             _this.keyword = _this.$element.find('input').val()
             _this.start()
         })
     },
     start: function() {
         var _this = this
         this.getDate(function(data) {
             _this.render(data) //异步？
         })
     },
     getDate: function(callback) {
         var _this = this
         _this.$element.find('.loading').show()
         $.ajax({
             url: 'https://api.douban.com/v2/movie/search',
             data: {
                 q: _this.keyword
             },
             dataType: 'jsonp'
         }).done(function(ret) {
             callback && callback(ret)
         }).fail(function() {
             console.log('数据异常')
         }).always(function() {
             _this.$element.find('.loading').hide()
         })
     },
     render: function(data) {
         var _this = this
         console.log(data)
         data.subjects.forEach(function(movie) {
             var tpl = `<div class="item ling">
          <a href="#">
              <div class="cover">
                  <img src="https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg" alt="">
              </div>
              <div class="detail">
                  <h2>霸王别姬</h2>
                  <div class="extra"><span class="score">9.3分 </span>/ 1000收藏 </div>
                  <div class="extra">1994 / 剧情、爱情</div>
                  <div class="extra">导演：张艺谋</div>
                  <div class="extra">主演：张艺谋、张艺谋、张艺谋</div>
              </div>
          </a>
      </div>`
             var $node = $(tpl)
                 /*匹配ajax跨域的数据中的信息，与html中的类相对应。*/
             $node.find('a').attr('href', movie.alt)
             $node.find('.cover img').attr('src', movie.images.medium)
             $node.find('.detail h2').text(movie.title)
             $node.find('.score').text(movie.rating.average)
             $node.find('.collect').text(movie.collect_count)
             $node.find('.year').text(movie.year)
             $node.find('.type').text(movie.genres.join('/'))
             $node.find('.director').text(function() {
                 var directorsAll = []
                     /*directors是数据中的参数*/
                 movie.directors.forEach(function(item) {
                     directorsAll.push(item.name)
                 })
                 return directorsAll.join('、')
             })
             $node.find('.actor').text(function() {
                 var actorAll = []
                 movie.casts.forEach(function(item) {
                     actorAll.push(item.name)
                 })
                 return actorAll.join('、')
             })
             _this.$element.find('.search-result').append($node)
         })
     },
 }


 //app是整个页面的管理部门
 var app = {
     //app init是页面的功能
     init: function() {
         this.$tabs = $('footer>div')
         this.$panels = $('section')
         this.bind()

         top250.init() //调用它
         usbox.init()
         search.init()
     },
     bind: function() {
         var _this = this //_this = app
         this.$tabs.on('click', function() {
             //切换页面
             $(this).addClass('acver').siblings().removeClass('acver')
             _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
         })
     },
     start: function() {

     },
     render: function() {

     },
     setData: function() {

     },
     getDate: function() {

     }
 }
 app.init()