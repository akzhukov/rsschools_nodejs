export const tablePaginationTemplate = `
<ul class="pagination">
    <% items.forEach(item => { %>
        <li class="page-item">
            <button id="<%= item.id %>" class="page-link" <%= item.options %>>
                <%= item.title %>
            </button>
        </li>
    <% }); %>
</ul>`;

export const tableHeaderTemplate = `
<thead>
    <tr class="table-danger">
        <% items.forEach(function(item) { %>
            <th scope="col">
                <%- item %>
            </th>
        <% }); %>
    </tr>
</thead>
`;

export const tableBodyTemplate = `
<tbody id="table-body">
    <% records.forEach(function(record) { %>
        <tr>
            <td>
                <%= record.index %>
            </td>
            <td>
                <%= record.id %>
            </td>
            <td>
                <%= record.name %>
            </td>
            <td>
                <%= record.login %>
            </td>
            <td>
                изменить/удалить
            </td>
        </tr>
    <% }); %>
</tbody>
`;