<%if (request.data._build_) {%>
$include['../../node_modules/redux-thunk/dist/redux-thunk.min.js'];
<%} else { %>
$include['../../node_modules/redux-thunk/dist/redux-thunk.js'];
<%}%>