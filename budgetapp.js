let showText = true;
let activitydata = [];
let user = JSON.parse(localStorage.getItem(localStorage.getItem('authedUser')));

localStorage.setItem("admin", 123456);
function ManagementUser() {
    document.getElementById("hello").innerHTML = '';
    var account = Object.keys(localStorage);
    for (let i = 0; i < account.length; i++) {
        if(account[i] =='authedUser'){
        var prinfManage = `<button type="button" class="btn btn-info" >Hello  ${localStorage.getItem("authedUser")} </button>
        <button id="logout" type="button" class="btn btn-primary">Log out</button>`;
        document.getElementById("hello").innerHTML += prinfManage;
        }
    }
}
ManagementUser();


const DOM = (() => {
    var time = new Date();
    var month = time.getMonth(); //0-11
    var monthParagraphDOM = document.getElementById('monthpara');

    putmonthtoParagraph(month, monthParagraphDOM);

    function putmonthtoParagraph(month, monthParagraphDOM) {
        switch (month) {
            case 0:
                monthParagraphDOM.innerHTML = "January";
                break;
            case 1:
                monthParagraphDOM.innerHTML = "February";
                break;
            case 2:
                monthParagraphDOM.innerHTML = "March";
                break;
            case 3:
                monthParagraphDOM.innerHTML = "April";
                break;
            case 4:
                monthParagraphDOM.innerHTML = "May";
                break;
            case 5:
                monthParagraphDOM.innerHTML = "June";
                break;
            case 6:
                monthParagraphDOM.innerHTML = "July";
                break;
            case 7:
                monthParagraphDOM.innerHTML = "August";
                break;
            case 8:
                monthParagraphDOM.innerHTML = "September";
                break;
            case 9:
                monthParagraphDOM.innerHTML = "October";
                break;
            case 10:
                monthParagraphDOM.innerHTML = "November";
                break;
            case 11:
                monthParagraphDOM.innerHTML = "December";
                break;
            default:
                monthParagraphDOM.innerHTML = "Month";
        }
    }

    return {
        TotalBalance: document.getElementById('totalbalance'),
        Income: document.getElementById('income'),
        Expense: document.getElementById('expense'),
        ActionType: document.getElementById('selecttype'),
        Categories: document.getElementById('selectcategory'),
        Description: document.getElementById('description'),
        Amount: document.getElementById('amount'),
        saveButton: document.getElementById('savebtn'),
        activitylist: document.getElementById('activitylist')
    }
})();

const UIController = (() => {
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('authedUser');
        alert('Đăng xuất thành công!');
        location.href = 'login.html';
    });

    document.getElementById('floatingbtn').addEventListener('click', () => {
        document.getElementById('addnewform').style.display = "block";
        document.getElementById('actions').style.backgroundColor = "white";
        document.getElementById('actions').style.top = "70vh";
        document.getElementById('actions').style.display = "flex";
        document.getElementById('actions').style.justifyContent = "space-around";
        document.getElementById('actions').style.alignItems = "center";
        document.getElementById('actions').style.boxShadow = "0 2px 48px 0 rgba(0,0,0,0.2)";
        document.getElementById('floatingbtn').style.visibility = "hidden";
    });

    document.getElementById('closeform').addEventListener('click', () => {
        document.getElementById('addnewform').style.display = "none";
        document.getElementById('actions').style.display = "block";
        document.getElementById('actions').style.background = "transparent";
        document.getElementById('floatingbtn').style.visibility = "visible";
        document.getElementById('actions').style.boxShadow = "none";
        document.getElementById('actions').style.top = "87vh";
        DOM.Description.value = "";
        DOM.Amount.value = "";
    });

    document.getElementById('selecttype').addEventListener('click', (e) => {
        document.getElementById('selectcategory').innerHTML = (e.target.value == "Expense") ? `
        <option value="cutlery">Food</option>
        <option value="home">Rent</option>
        <option value="bus">Transport</option>` : ` <option value="money">Salary</option>
        <option value="building">Real Estate</option>`;
    });

    document.getElementById('eyeopener').addEventListener('click', (event) => {
        if (showText) {
            DOM.TotalBalance.innerHTML = "XXX";
            DOM.TotalBalance.classList.add('hidetext');
            DOM.Income.innerHTML = "XXX";
            DOM.Income.classList.add('hidetext');
            DOM.Expense.innerHTML = "XXX";
            DOM.Expense.classList.add('hidetext');
            showText = !showText;
        } else {
            changeDOMHeaderAmount();
            DOM.TotalBalance.classList.remove('hidetext');

            DOM.Income.classList.remove('hidetext');

            DOM.Expense.classList.remove('hidetext');
            showText = !showText;
        }
    });
})();

const BudgetController = (() => {
    DOM.saveButton.addEventListener('click', () => {
        if (DOM.Description.value == "" || DOM.Amount.value == "") {
            alert("Please Enter All data");
            return;
        }

        user['ActivityList'].push({
            ActivityCategory: DOM.Categories.value,
            ActivityType: DOM.ActionType.value,
            Description: DOM.Description.value,
            ActivityAmount: DOM.Amount.value
        });
        localStorage.setItem(localStorage.getItem('authedUser'), JSON.stringify(user));

        createActivityList();
    })
})();

function getLocalStorageData() {
    activitydata = [];


    if (user['ActivityList'].length == 0) {
        return [];
    }
    activitydata = user['ActivityList'];
    return activitydata;
}

/**Create Activity List */
function createActivityList() {

    let data = getLocalStorageData();
    DOM.activitylist.innerHTML = "";

    data.forEach((element, i) => {
        if (element == null) {
            return;
        }
        DOM.activitylist.innerHTML += ` <li id="list-${i}" class="${element.ActivityType}list  activitylist"><i  class="fa fa-${element.ActivityCategory}"></i> <p id="edit"> ${element.Description}</p> <strong> $ ${element.ActivityAmount} </strong><i onclick="deleteData(${i})" id="edit" class="fa fa-times-circle"></li>`;
    });

    changeDOMHeaderAmount()
}

function changeDOMHeaderAmount() {
    let totalincome = 0;
    let totalexpense = 0;

    activitydata.reverse().forEach(e => {
        if (e == null) {
            return [];
        }
        if (e.ActivityType == "Income") {
            totalincome += Number(e.ActivityAmount);
        } else if (e.ActivityType == "Expense") {
            totalexpense += Number(e.ActivityAmount);
        } else {
            return [];
        }
    });
    let totalbalance = Number(totalincome - totalexpense);

    DOM.TotalBalance.innerHTML = "$" + totalbalance;
    DOM.Income.innerHTML = "$" + totalincome;
    DOM.Expense.innerHTML = "$" + totalexpense;
}

if (localStorage.length > 0) {
    createActivityList();
    changeDOMHeaderAmount()
}

function deleteData(key) {
    if (confirm("Are you sure to delete?")) {
        user.ActivityList = user.ActivityList.filter((entry, i) => i != key);
        localStorage.setItem(localStorage.getItem('authedUser'), JSON.stringify(user));
        location.reload();
    } else {
        return;
    }
}