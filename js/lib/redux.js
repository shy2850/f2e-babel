<%if (request.data._build_) {%>
$include['../../node_modules/redux/dist/redux.min.js'];
<%} else { %>
$include['../../node_modules/redux/dist/redux.js'];
<%}%>