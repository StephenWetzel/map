var popuptext;

function clickMarker(e, type) {
	if (type == "ListSummit") selectListSummit(e);
	if (type == "Summit") selectSummit(e);
	if (type == "Tent") selectTent(e);
	if (type == "Leanto") selectLeanto(e);
	if (type == "Trailhead") selectTrailhead(e);
}

function selectListSummit(e) {
	i=e.target.options.id;
	popuptext = 
		lstListSummits[i][3] + "; " + 
		lstListSummits[i][4].toString() + " ft; " +
		lstListSummits[i][0].toString() + ", " + lstListSummits[i][1].toString() + " ";
		
	document.getElementById('divRightBody').innerHTML += 
		"<br>" + e.target.options.id+" "+popuptext;		
		
	e.target.setIcon(iconListSummitRed)
}

function selectSummit(e) {
	i=e.target.options.id;
	popuptext = 
		lstSummits[i][3] + "; " + 
		lstSummits[i][4].toString() + " ft; " +
		lstSummits[i][0].toString() + ", " + lstSummits[i][1].toString() + " ";
		
	document.getElementById('divRightBody').innerHTML += 
		"<br>" + e.target.options.id+" "+popuptext;		
		
	e.target.setIcon(iconSummitRed)
}

function selectTent(e) {
	i=e.target.options.id;
	popuptext = 
		lstTents[i][3] + "; " + 
		lstTents[i][4].toString() + " ft; " +
		lstTents[i][0].toString() + ", " + lstTents[i][1].toString() + " ";
		
	document.getElementById('divRightBody').innerHTML += 
		"<br>" + e.target.options.id+" "+popuptext;		
		
	e.target.setIcon(iconTentRed)
}

function selectLeanto(e) {
	i=e.target.options.id;
	popuptext = 
		lstLeantos[i][3] + "; " + 
		lstLeantos[i][4].toString() + " ft; " +
		lstLeantos[i][0].toString() + ", " + lstLeantos[i][1].toString() + " ";
		
	document.getElementById('divRightBody').innerHTML += 
		"<br>" + e.target.options.id+" "+popuptext;		
		
	e.target.setIcon(iconLeantoRed)
}

function selectTrailhead(e) {
	i=e.target.options.id;
	popuptext = 
		lstTrailheads[i][3] + "; " + 
		lstTrailheads[i][4].toString() + " ft; " +
		lstTrailheads[i][0].toString() + ", " + lstTrailheads[i][1].toString() + " ";
		
	document.getElementById('divRightBody').innerHTML += 
		"<br>" + e.target.options.id+" "+popuptext;		
		
	e.target.setIcon(iconTrailheadRed)
}

function clearRoute() {
	document.getElementById('divRightBody').innerHTML = "";	
	
	for (i = 0; i <= lstListSummits.length-1; i++) {
		markerListSummits[i].setIcon(iconListSummit);
	}	
	for (i = 0; i <= lstSummits.length-1; i++) {
		markerSummits[i].setIcon(iconSummit);
	}	
	for (i = 0; i <= lstTrailheads.length-1; i++) {
		markerTrailheads[i].setIcon(iconTrailhead);
	}	
	for (i = 0; i <= lstTents.length-1; i++) {
		markerTents[i].setIcon(iconTent);
	}	
	for (i = 0; i <= lstLeantos.length-1; i++) {
		markerLeantos[i].setIcon(iconLeanto);
	}	
}
