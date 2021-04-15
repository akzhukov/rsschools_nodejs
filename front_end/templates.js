export const tablePaginationTemplate = `
<ul class="pagination">
    <% items.forEach(item => { %>
        <li class="page-item">
            <button id="<%= item.id %>" data-action="<%= item.action%>" class="page-link click-handled" <%= item.options %>>
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
              <button id="update" data-action="updateUser" data-id=<%= record.id %> type="button" class="btn btn-warning click-handled">
                edit
              </button>
              <button id="delete" data-action="deleteUser" data-id=<%= record.id %> type="button" class="btn btn-danger click-handled">
                delete
              </button>
            </td>
        </tr>
    <% }); %>
</tbody>
`;

export const actionsTemplate = `
<div class="actions">
    <button id="update" data-action="updateUser" type="button" class="btn btn-warning click-handled">
        edit
    </button>
    <button id="delete" data-action="deleteUser" type="button" class="btn btn-danger click-handled">
        delete
    </button>
</div>`;


export const createUserFormTemplate = `
    <div id="prompt-form-container">
        <form id="prompt-form">
            <label for="form-name"><b>Fill User Data</b></label>
            <hr>
            <div class="form-row">
                <div class="col-md-12">
                    <label for="input-name">Name</label>
                    <input type="text" class="form-control" id="create-name" placeholder="Name">
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-12">
                    <label for="input-login">Login</label>
                    <input type="text" class="form-control" id="create-login" placeholder="Login">
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-12">
                    <label for="input-password">Password</label>
                    <input type="text" class="form-control" id="create-password" placeholder="Password">
                </div>
            </div>
            <div class="form-buttons">
                <button class="btn btn-primary" type="submit">Submit user</button>
                <button class="btn btn-primary" name="cancel" type="button">Cancel</button>
            </div>
        </form>
    </div>
`;