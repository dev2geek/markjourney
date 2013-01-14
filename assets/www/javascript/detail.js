/**
 * @fileOverview 旅途的"详细"页
 *               
 * @author qinian<qinian.wmq@taobao.com>
 *
 */

(function () {
    var detail = (function () {
    	
    	var options,
	    map,
	    inited = false,
	    infoWindow,
	    markers = [],
	    route = [];
	    /* route = [
             new google.maps.LatLng(22.028, 113.121),
             new google.maps.LatLng(22.008, 113.111),
             new google.maps.LatLng(21.991, 113.079),
             new google.maps.LatLng(21.981, 113.119)
         ];*/
    	
    	function init() {
    		$("#detail-refresh").click(function() {
    			$.mobile.changePage(
				    "index.html#tour-detail",
				    {
				      allowSamePageTransition : true,
				      transition              : 'none',
				      showLoadMsg             : false,
				      reloadPage              : true
				    }
				);
    		});
    	}
        
    	function initTrip(data) {
    		var givenRoute = data.point,
    			listNode = $("#path_list");
    		$.each(givenRoute, function(index, info) {
    			var _ele = info.position;
    			
    			var _position = new google.maps.LatLng(_ele.Ya, _ele.Za),
    				_id = "moment_" + _ele.Ya + "_" + _ele.Za;
    			
    			route.push(_position);
    			
    			if (info.imgs) {
    				var obj = {};
    				obj.position = _position;
    				obj.text = info.text;
    				obj.img = info.imgs;
    				obj.id = _id;
    				markers.push(obj);
    				
    			}
    			
    			if (info.imgs) {
    				listNode.append("<li class='clearfix'><div class='list_timeslot' >" + info.timestamp 
        					+ "</div><div class='list_time_dot'></div><div class='list_moment_wrapper'>"
        					+ "<span class='arrow'>◆</span><div class='list_moment'><div class='list_moment_detail'>" + info.text
        					+ "</div><hr><div class='list_moment_info'><div class='list_image'><img src='"
        					+ info.imgs + "' class='thumb' /></div></div></div></div></li>");
    			} else {
    				if (info.text) {
    					listNode.append("<li class='clearfix' id='" + _id + "'><div class='list_timeslot'>" + info.timestamp
    							+ "</div><div class='list_time_dot'></div><div class='list_moment_wrapper'><span class='arrow'>◆</span><div class='list_moment'>"
    							+ "<div class='list_moment_detail'>" + info.text + "</div></div></div></li>");
    				}
    			}
    		});
    		
    		options = {
		      zoom: 12,
		      center: new google.maps.LatLng(20, 30),
		      mapTypeId:google.maps.MapTypeId.ROADMAP,
		      panControl:false,
		      zoomControl:true,
		      mapTypeControl:false,
		      scaleControl:false,
		      streetViewControl:false,
		      overviewMapControl:false
		    };
    		
    		map = new google.maps.Map(document.getElementById('detail-map'), options);
    		for (var i = 0; i < markers.length; i++) {
    	        
    			if (markers.length) {
    				var markerData = markers[i];
    				
    				var marker = new google.maps.Marker({
	    	          position: markers[i].position, 
	    	          map: map,
	    	          title: 'Place number ' + i
	    	        });
	    	        
    				
	    	        
    				(function(i, marker, markerData) {
	    	          
	    	          google.maps.event.addListener(marker, 'click', function() {
	    	            
	    	            if (!infoWindow) {
	    	            	infoWindow = new google.maps.InfoWindow();
	    	            }
	    	            
	    	            if (markerData.text) {
	    	            	infoWindow.setContent(
	    	                        "<a data-ajax='false' href='#" + markerData.id + "'><img src='image/goto.png' />" + "</a><span>" + markerData.text
	    	                        + "</span>" );
	    	            }
	    	            
	    	            
	    	            /*
	    	            if (i < 3) {
	    	            	infoWindow.setContent(
	    	                        '<img src="img/squirrel.jpg" alt="" />' + 
	    	                        '<span>No ' + (i+1) + '</span>' );
	    	            } else {
	    	            	var video = document.createElement('video');
	    	                video.setAttribute('src',
	    	                    'http://upload.wikimedia.org/wikipedia/commons/3/3f/ACA_Allertor_125_video.ogv');
	    	                video.setAttribute('width', '300');
	    	                video.setAttribute('height', '200');
	    	                video.setAttribute('controls', 'controls');
	    	                video.setAttribute('autoplay', 'autoplay');
	    	                infoWindow.setContent(video);
	    	            }
	    	            */
	    	            
	    	            
	    	            // Tying the InfoWindow to the marker 
	    	            infoWindow.open(map, marker);
	    	            
	    	          });
	    	          
	    	        })(i, marker, markerData); 
    			} else {
    				
    			}
    			
    	             
    	      }
    	    
    	    // Creating the polyline object
    	    var polyline = new google.maps.Polyline({
    	      path: route,
    	      strokeColor: "#ff0000",
    	      strokeOpacity: 0.6,
    	      strokeWeight: 5
    	    });
    	    
    	    // Adding the polyline to the map
    	    polyline.setMap(map);
    	    inited = true;
    	}

        return {
            render:function (obj) {
            	var x = obj.id,
            		data;
            	
            	var storage = localStorage.getItem("jourlist"),
            		storageArr = $.parseJSON(storage);
            	
            	$.each(storageArr, function(index, value) {
            		if (value.id === x) {
            			data = value;
            			return false;
            		}
            	});
                
            	if (!inited) {
                	init();
                    initTrip(data);
                }
            }
        }
    })();

    window.MJ = window.MJ || {};
    window.MJ.detail = detail;

})();