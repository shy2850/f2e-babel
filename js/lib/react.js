<%if (request.data._build_) {%>
$include['../../node_modules/react/dist/react.min.js'];
<%} else { 
%>
$include['../../node_modules/react/dist/react.js'];
<%}%>