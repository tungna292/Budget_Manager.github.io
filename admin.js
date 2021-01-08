
function CloseUser() {
    document.getElementById('input_user').style.display = 'none';
    document.getElementById('input_change_user').style.display = 'none';
    document.getElementById('scroll_height').style.height = '450px';
}

function showAddUser() {
    document.getElementById('scroll_height').style.height = '280px';
    document.getElementById('addUser').style.display = 'block';
    document.getElementById('updateUser').style.display = 'none';
    document.getElementById('input_user').style.display = 'block';
    document.getElementById('input_change_user').style.display = 'none';
    document.getElementById('watchAddNameInput').value = '';
    document.getElementById('watchAddNoteInput').value = '';
    document.getElementById('watchAddPriceInput').value = '';
    document.getElementById('watchAddImageInput').value = '';
}

function AddUser() {
    var username = document.getElementById('userNameAddInput').value;
    var user = localStorage.getItem(username);
    var password = document.getElementById('passwordAddInput').value;
    var vpassword = document.getElementById('rePasswordAddInput').value;

    if (password != vpassword) {
        alert('Mật khẩu không khớp!');
        return;
    }
    if (user) {
        alert('Tài khoản đã tồn tại trên hệ thống!');
        return;
    }

    var userinfo = {
        password: password,
        cash: 0,
        admin: 0,
        ActivityList: []
    };
    localStorage.setItem(username, JSON.stringify(userinfo));
    localStorage.setItem('authedUser', username);
    alert('Đăng kí tài khoản thành công');
    ManagementUser();
}

function ManagementUser() {
    document.getElementById("prinfManagementUser").innerHTML = '';
    var account = Object.keys(localStorage);
    for (let i = 0; i < account.length; i++) {
        if(account[i] !='authedUser'){
        var prinfManage = `<div class="col-4" style="height: 100px;padding:10px; padding-right:50px;">
  <div class="user_info_admin float-left" style="width: 60%">
    <p class="font-weight-bold" style="font-size: 120%">` + account[i] + ` ${i}</p>
  </div>
  <div class="user_function_admin float-right" style="width: 40%;display: flex;">
  <div class="btn btn-warning mr-1 text-white" onclick="editUserAdmin(` + account[i] + `)" style="width: 40%;border-radius: 10px;"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
    <div class="btn btn-danger text-white ${account[i]}"  onclick="deleteUserAdmin(${account[i]})" style="width: 40%;border-radius: 10px;"><i class="fa fa-trash" aria-hidden="true"></i></div>


</div></div>`;
        document.getElementById("prinfManagementUser").innerHTML += prinfManage;
        }
    }
}


function deleteUserAdmin(id) {
    console.log("ok");
    var account = Object.keys(localStorage);
    for (var i = 0; i < account.length; i++) {
        if (id == account[i].id) {
            localStorage.removeItem(id);
            ManagementUser();
            break;
        }
    }
    
}

var idChangeUser = 0;

function editUserAdmin(id) {
    var account_info = JSON.parse(localStorage.getItem('account_info'));
    document.getElementById('input_user').style.display = 'none';
    document.getElementById('input_change_user').style.display = 'block';

    for (var i = 1; i < account_info.length; i++) {
        if (id == account_info[i].accountPayment) {
            idChangeUser = account_info[i].accountPayment;
            document.getElementById("txtId").value = i;
            document.getElementById("userNameChangeInput").value = account_info[i].name_customer;
            document.getElementById("addressChangeInput").value = account_info[i].address_customer;
            document.getElementById("phoneChangeInput").value = account_info[i].phone_customer;
            document.getElementById("bankChangeInput").value = account_info[i].bank;

            break;
        }
    }
}

function SaveUserAdmin() {
    var account_info = JSON.parse(localStorage.getItem('account_info'));
    for (var i = 0; i < account_info.length; i++) {
        if (idChangeUser == account_info[i].accountPayment) {
            account_info[i].name_customer = document.getElementById("userNameChangeInput").value;
            account_info[i].address_customer = document.getElementById("addressChangeInput").value;
            account_info[i].phone_customer = document.getElementById("phoneChangeInput").value;
            account_info[i].bank = document.getElementById("bankChangeInput").value;
            localStorage.setItem("account_info", JSON.stringify(account_info));

            ManagementUser();

            break;
        }
    }

    document.getElementById('userNameChangeInput').value = '';
    document.getElementById('addressChangeInput').value = '';
    document.getElementById('phoneChangeInput').value = '';
    document.getElementById('bankChangeInput').value = '';
}





function onloadAll1() {
    
    ManagementUser();
}

$(document).ready(function() {
    $('#add_watch3').click(function() {
        $('#management_watch').css('font-weight', 'bold');
        $('#dashboard_text').css('font-weight', '400');
        $('#management_order').css('font-weight', '400');
        $('#management_user').css('font-weight', '400');

        $('#management_watch_box').css('display', 'block');
        $('#dashboard_box').css('display', 'none');
        $('#management_watch_order').css('display', 'none');
        $('#management_user_box').css('display', 'none');

    });
});

$(document).ready(function() {
    $('#management_watch').click(function() {
        $('#management_watch').css('font-weight', 'bold');
        $('#dashboard_text').css('font-weight', '400');
        $('#management_order').css('font-weight', '400');
        $('#management_user').css('font-weight', '400');

        $('#management_watch_box').css('display', 'block');
        $('#dashboard_box').css('display', 'none');
        $('#management_watch_order').css('display', 'none');
        $('#management_user_box').css('display', 'none');

    });
});
$(document).ready(function() {
    $('#dashboard_text').click(function() {
        $('#dashboard_text').css('font-weight', 'bold');
        $('#management_order').css('font-weight', '400');
        $('#management_user').css('font-weight', '400');
        $('#management_watch').css('font-weight', '400');

        $('#management_watch_box').css('display', 'none');
        $('#dashboard_box').css('display', 'block');
        $('#management_watch_order').css('display', 'none');
        $('#management_user_box').css('display', 'none');
    });
});
$(document).ready(function() {
    $('#management_order').click(function() {
        $('#management_order').css('font-weight', 'bold');
        $('#management_user').css('font-weight', '400');
        $('#management_watch').css('font-weight', '400');
        $('#dashboard_text').css('font-weight', '400');

        $('#management_watch_box').css('display', 'none');
        $('#dashboard_box').css('display', 'none');
        $('#management_watch_order').css('display', 'block');
        $('#management_user_box').css('display', 'none');
    });
});
$(document).ready(function() {
    $('#management_user').click(function() {
        $('#management_user').css('font-weight', 'bold');
        $('#management_watch').css('font-weight', '400');
        $('#dashboard_text').css('font-weight', '400');
        $('#management_order').css('font-weight', '400');

        $('#management_watch_box').css('display', 'none');
        $('#dashboard_box').css('display', 'none');
        $('#management_watch_order').css('display', 'none');
        $('#management_user_box').css('display', 'block');
    });
});