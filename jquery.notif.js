/**
 * jQuery.notif JavaScript Library v1.0
 * http://aliozkan.com/notif
 *
 * Copyright 2012, Ali Ozkan
 * Licensed under the MIT license.
 * 
 * @author Ali Özkan
 * @version 1.0
 *
 */

(function( $ ){
	var notifCounter = 0;
	var defaultMargin = 15;
	
    $.extend({
    	notif: function (options) {
    		notifCounter++;
    		var settings = $.extend( {
    		      'message'         : '',
    		      'title' 			: '',
    		      'duration'		: 10000,
    		      'type'			: 'info',
    		      'link'			: '',
    		      'vertical'		: 'left',
    		      'horizontal'		: 'bottom',
    		      'clear'			: false 
		    }, options);
    		
    		var types = ['info','success','error','warning'];
    		var verticals = ['left','right'];
    		var horizontals = ['bottom','top'];
    		
    		if ($.inArray(settings.type,types)==-1)
    		{
    			settings.type = 'info';
    		}
    		if ($.inArray(settings.vertical,verticals)==-1)
    		{
    			settings.vertical = 'left';
    		}
    		if ($.inArray(settings.horizontal,horizontals)==-1)
    		{
    			settings.horizontal = 'bottom';
    		}
    		
    		if(settings.clear)
			{
    			$.clearNotif({'vertical': settings.vertical,'horizontal': settings.horizontal });
			}
    		
    		settings.vertical = 'notif-'+settings.vertical;
    		settings.horizontal = 'notif-'+settings.horizontal;
    		settings.type = 'notif-'+settings.type;
    		
    		var length = defaultMargin;
			$('.notif_container.'+settings.vertical+'.'+settings.horizontal).each(function(){
				length+=$(this).height()+40;
			});
			
			if(settings.link=='')
			{
				var onclick = '$.removeNotif('+notifCounter+');';
			}
			else
			{
				var onclick = "window.location.href='"+settings.link+"';";
			}
			
			if(settings.horizontal == 'notif-top')
			{
				var css = 'top: '+length+'px;';
			}
			else
			{
				var css = 'bottom: '+length+'px;';
			}
			
    		$('body').append('<div onclick="'+onclick+'" id="notif_container_'+(notifCounter)+'" class="notif_container '+settings.type+' '+settings.vertical+' '+settings.horizontal+'" style="'+css+'"> <h3>'+settings.title+'</h3> <p>'+settings.message+'</p> </div>');
    		
    		if(settings.duration != 0)
    		{
    			t = setTimeout('$.removeNotif('+notifCounter+');',settings.duration);
    		}
    		
    		return notifCounter;
        },
        removeNotif: function (elm) {
        	$('#notif_container_'+elm).addClass('notif-removing').fadeOut(function(){$(this).remove();$.adjustPopups();});
        },
        
        clearNotif: function (options) {
        	var settings = $.extend( {
  		      'vertical'         	: '', // left,bottom
  		      'horizontal' 			: '' // bottom, top
		    }, options);
        	
        	var selector = '';
        	if (settings.vertical=='' && settings.horizontal=='') // clear all
        	{
        		selector ='.notif_container';
        	}
        	else if (settings.vertical=='')
    		{
        		selector ='.notif_container.notif-'+settings.horizontal;
    		}
        	else if(settings.horizontal=='')
        	{
        		selector ='.notif_container.notif-'+settings.vertical;
        	}
        	else
        	{
        		selector ='.notif_container.notif-'+settings.horizontal+'.notif-'+settings.vertical;
        	}
        	
        	$(selector).addClass('notif-removing').fadeOut(function(){$(this).remove();$.adjustPopups();});
        },
        
        adjustPopups: function () {
        	var length = defaultMargin;
        	
        	var lengthNew=length;
        	$(".notif_container.notif-left.notif-bottom:not(.notif-removing)").each(function(){
        		$(this).animate({bottom:lengthNew},1000);
        		lengthNew=lengthNew+$(this).height()+40;
        	});
        	
        	var lengthNew=length;
        	$(".notif_container.notif-right.notif-bottom:not(.notif-removing)").each(function(){
        		$(this).animate({bottom:lengthNew},1000);
        		lengthNew=lengthNew+$(this).height()+40;
        	});
        	
        	var lengthNew=length;
        	$(".notif_container.notif-left.notif-top:not(.notif-removing)").each(function(){
        		$(this).animate({top:lengthNew},1000);
        		lengthNew=lengthNew+$(this).height()+40;
        	});
        	
        	var lengthNew=length;
        	$(".notif_container.notif-right.notif-top:not(.notif-removing)").each(function(){
        		$(this).animate({top:lengthNew},1000);
        		lengthNew=lengthNew+$(this).height()+40;
        	});
        }
    });
})( jQuery );