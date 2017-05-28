$("document").ready(function(){
  
  var body = $('body');
  var button = $('#get-another-quote-button');
  var buttons = $('button');
  var main = $('.main');
  var twitterLink = $('#twitterLink');
  var twitterHref;
  var quoteContent = $('#quote-content');
  var quoteSource = $('#quote-source');
  var quoteTitle = $('#quote-title');
  
  var colorScheme = function(){
    var colors = [
      ["#4ABDAC", "#FC4A1A", "#F7B733"],
      ["#C0B283", "#DCD0D0", "#F4F4F4"],
      ["#E37222", "#07889B", "#66B9BF"],
      ["#0E0B16", "#A239CA", "#4717F6"],
      ["#E27D60", "#85DCB1", "#E8A87C"],
      ["#3F2860", "#90CFA9", "#7A9A95"],
      ["#8D8741", "#659DBD", "#DAAD86"],
      ["#FF7148", "#93B1C6", "#C7D0D5"],
      ["#393939", "#FF5A09", "#F3843E"],
      ["#05386B", "#379683", "#5CDB95"],
      ["#5D5C61", "#379683", "#7395AE"],
      ["#4B4D52", "#DE8642", "#B9B1A8"],
      ["#202020", "#B81D18", "#004687"],
      ["#9B539C", "#EB65A0", "#73C5E1"],
    ];

    var array = colors[Math.floor(Math.random()*colors.length)];
    
    body.css('background-color', array[0]);
    main.css('background-color', array[1]);
    buttons.css('background-color', array[2]);
  } 
  
  colorScheme();
  
  main.css('height', 100);
  
  button.on('click', function(e) {
    
    e.preventDefault();
    
    $.ajax( {
      
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        
        main.css('height', '');
        button.html("Get Another Quote");
        
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        quoteTitle.text(post.title);           
        quoteContent.html(post.content);
        
        var author = post.title;
        var content = post.content;
        
        content = content.replace(/<p>/g, "\"").replace(/<\/p>/g, "\"").replace(/&#8216/g, "\'").replace(/&#8217/g, "\'").replace(/;/g, "");
        
        twitterHref = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + content + " by " + author;
        
        twitterLink.attr("href", (encodeURI(twitterhref)));
        
        colorScheme();
        
        // If the Source is available, use it. Otherwise hide it.
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          
          quoteSource.html('Source:' + post.custom_meta.Source);
          
        } else {        
          quoteSource.text('');        
        }       
      },
      
      cache: false
      
    }); 
    
     
    colorScheme();
   });
});
