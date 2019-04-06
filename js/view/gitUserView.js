$(document).ready(function() {
  loadInputController();
  loadClickMoreInfoController();
  loadBtnVoltarController();
  loadOrderByController();
});

Data = {
  userList: [],
  userInfo: {},
  repoList: []
};

var timeout = null;

function loadInputController() {
  $(document).on("keyup", "#inputUser", function() {
    let inputVal = $(this).val();
    clearTimeout(timeout);
    Loading.show("#divUserResult");
    console.log(inputVal.length);
    if (inputVal.length < 1) {
      Loading.hide();
    }
    timeout = setTimeout(function() {
      Service.searchUsers(inputVal).then(response => {
        response.json().then(json => {
          Data.userList = json;
          renderSearchUserResult(json);
          Loading.hide();
        });
      });
    }, 800);
  });
}

function loadClickMoreInfoController() {
  $(document).on("click", ".clickMoreInfo", function() {
    var user = $(this).attr("user");
    $("#divUserResult").fadeOut(500, findAndRenderUserInfo(user));
  });
}

function findAndRenderUserInfo(user) {
  Loading.show("#divMoreInfo");
  Service.getUserByLogin(user).then(response => {
    response
      .json()
      .then(json => {
        Data.userInfo = json;
        renderUserInfo(json);
        Loading.hide();
      })
      .then(() => {
        Service.listRepoFromUser(user).then(response => {
          response.json().then(json => {
            var repos = Utils.arraySort(json, "stargazers_count", "DSC");
            Data.repoList = repos;
            renderListRepo(repos);
          });
        });
      });
  });
}

function loadBtnVoltarController() {
  $(document).on("click", ".btnVoltar", function() {
    $("#divUserResult").fadeOut(500, () => {
      $("#divMoreInfo").html("");
      $("#divUserResult").fadeIn(500);
    });
  });
}

function renderUserInfo(user) {
  var html =
    "<button class='btn btn-info btnVoltar pull-right'>VOLTAR</button>";
  html += "<h3>Informações do Usuário</h3>";
  html += `<table class="table">`;
  html += "<tr>";
  html += `<th scope="col" >Nome</th>`;
  html += "<th>Seguindo / Seguidores</th>";
  html += "<th>Email</th>";
  html += "</tr>";

  html += "<tr>";
  html += `<td> ${user.name} <figure>
    <img class="img-style" src="${user.avatar_url}" alt="Avatar">	
    </figure></td>`;
  html += `<td> ${user.following} / ${user.followers}</td>`;
  html += `<td> ${Utils.checaCampo(user.email)}</td>`;
  html += "</tr>";
  html += "</table>";
  html += "<div id='divRepoList'></div>";
  $("#divMoreInfo").html(html);
}

function renderListRepo(repos) {
  var html = "<h3>Repositórios</h3>";
  html += `<table class="table">`;
  html += "<tr>";
  html += `<th scope="col" >Nome</th>`;
  html += `<th scope="col" >Linguagem</th>`;
  html += `<th scope="col" >Estrelas ${renderOrder()}</th>`;
  html += `<th scope="col" >Descrição</th>`;
  html += `<th scope="col" >GIT</th>`;
  html += "</tr>";
  repos.forEach(repo => {
    html += "<tr>";
    html += `<td> ${Utils.checaCampo(repo.name)}</td>`;
    html += `<td> ${Utils.checaCampo(repo.language)}</td>`;
    html += `<td title="${Utils.checaCampo(repo.description)}"> ${Utils.encurtaCampo(repo.description,20)}</td>`;
    html += `<td> ${repo.stargazers_count}</td>`;
    html += `<td> <a href="${
      repo.html_url
    }" target="_blank"><i class="fas fa-external-link-alt"></i></a></td>`;
    html += "</tr>";
  });
  html += "</table>";
  $("#divRepoList").html(html);
}

function renderOrder() {
  return `
    <span class="orderByDsc"><i class="fas fa-sort-up sort arrow-up"></i></span>
    <span class="orderByAsc"><i class="fas fa-sort-down sort"></i></span>
    `;
}
function loadOrderByController() {
  $(document).on("click", ".orderByDsc", function() {
    var repos = Utils.arraySort(Data.repoList, "stargazers_count", "DSC");
    renderListRepo(repos);
  });
  $(document).on("click", ".orderByAsc", function() {
    var repos = Utils.arraySort(Data.repoList, "stargazers_count", "ASC");
    renderListRepo(repos);
  });
}

function renderSearchUserResult(data) {
  var users = data.items;
  var html = "";
  html += `<table class="table">`;
  html += "<tr>";
  html += `<th scope="col" >Usuário</th>`;
  html += "<th>Ação</th>";
  html += "</tr>";
  users.forEach(user => {
    html += "<tr>";
    html += `<td> ${user.login} <figure>
    <img class="img-style" src="${user.avatar_url}" alt="Avatar">	
</figure></td>`;
    html += `<td title="Mostrar Mais Informação" class="more-info clickMoreInfo" user="${
      user.login
    }"><i class="fas fa-info-circle"></i></td>`;
    html += "</tr>";
  });
  html += "</table>";
  $("#divUserResult").html(html);
}
