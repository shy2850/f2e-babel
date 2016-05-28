<%if (request.data._build_) {%>
$include['../../node_modules/react-dom/dist/react-dom.min.js'];
<%} else { %>
$include['../../node_modules/react-dom/dist/react-dom.js'];
<%}%>