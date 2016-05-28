<%if (request.data._build_) {%>
$include['../../node_modules/react-redux/dist/react-redux.min.js'];
<%} else { %>
$include['../../node_modules/react-redux/dist/react-redux.js'];
<%}%>