var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(37.50818732108973, 127.05713330636544),
    level: 3
};

var map = new kakao.maps.Map(container, options);

 // 마커가 표시될 위치
var markerPosition  = new kakao.maps.LatLng(37.50818732108973, 127.05713330636544); 

// 마커 생성
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정
marker.setMap(map);

// 아래 코드는 지도 위의 마커를 제거하는 코드
// marker.setMap(null);

// 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
function setMapType(maptype) { 
    var roadmapControl = document.getElementById('btnRoadmap');
    var skyviewControl = document.getElementById('btnSkyview'); 
    if (maptype === 'roadmap') {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);    
        roadmapControl.className = 'selected_btn';
        skyviewControl.className = 'btn';
    } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);    
        skyviewControl.className = 'selected_btn';
        roadmapControl.className = 'btn';
    }
}

// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}



// 커스텀 오버레이에 표시할 내용입니다
// HTML 문자열 또는 Dom Element 입니다
var content = '<div class="overlay_info">';
content += '    <a href="https://place.map.kakao.com/2040986441" target="_blank"><strong>컨티뉴</strong></a>';
content += '    <div class="desc">';
content += '        <img src="https://103.219.124.244/backoffice/img/logo/logo.svg" alt=""  style="width: 56px;">';
content += '        <span class="address">강남구 테헤란로 81길 16 화성빌딩 401호</span>';
content += '    </div>';
content += '</div>';

// 커스텀 오버레이가 표시될 위치입니다 
var position = new kakao.maps.LatLng(37.50818732108973, 127.05713330636544);

// 커스텀 오버레이를 생성합니다
var mapCustomOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
    xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
    yAnchor: 1.1 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
});

// 커스텀 오버레이를 지도에 표시합니다
mapCustomOverlay.setMap(map);

var rvContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
var rv = new kakao.maps.Roadview(rvContainer); //로드뷰 객체
var rvClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

//지도의 중심좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
rvClient.getNearestPanoId(mapCenter, 50, function(panoId) {
    rv.setPanoId(panoId, mapCenter); //panoId와 중심좌표를 통해 로드뷰 실행
});

kakao.maps.event.addListener(rv, 'init', function() {

    // 커스텀 오버레이를 생성합니다
    var rvCustomOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
        yAnchor: 0.5 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
    });


    //rvCustomOverlay.setAltitude(2); //커스텀 오버레이의 고도값을 설정합니다.(로드뷰 화면 중앙이 0입니다)
    rvCustomOverlay.setMap(rv);

    var projection = rv.getProjection(); // viewpoint(화면좌표)값을 추출할 수 있는 projection 객체를 가져옵니다.
    
    // 커스텀오버레이의 position과 altitude값을 통해 viewpoint값(화면좌표)를 추출합니다.
    var viewpoint = projection.viewpointFromCoords(rvCustomOverlay.getPosition(), rvCustomOverlay.getAltitude());

    rv.setViewpoint(viewpoint); //커스텀 오버레이를 로드뷰의 가운데에 오도록 로드뷰의 시점을 변화 시킵니다.
});