window.onload = function () {
    const lat = 35.149468;
    const lng = 126.916115;
    const placeName = "투썸플레이스 금남로케이엔타워점";
    const placeId = "815850982";

    const mapContainer = document.getElementById('map');
    const mapOption = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const markerPosition = new kakao.maps.LatLng(lat, lng);
    const marker = new kakao.maps.Marker({
        position: markerPosition,
        map: map
    });

    const iwContent = `
        <div style="padding:8px 12px; font-size:13px; color:#333;">
            <strong style="color:#00ADAD;">${placeName}</strong><br/>
            <a href="https://place.map.kakao.com/${placeId}" target="_blank" style="
                display:inline-block;
                margin-top:5px;
                padding:6px 10px;
                background-color:#00ADAD;
                color:white;
                border-radius:4px;
                text-decoration:none;
                font-size:12px;
            ">카카오 플레이스로 이동</a>
        </div>
    `;

    const infowindow = new kakao.maps.InfoWindow({
        position: markerPosition,
        content: iwContent,
        removable: true // X 버튼 표시
    });

    // 초기 상태에서 인포윈도우 열기
    infowindow.open(map, marker);

    // 마커 클릭 시 인포윈도우 다시 열기
    kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
};